import styleParsers from './styleParsers.js';
import symbols from './symbols.js';
import Pointer from './Pointer.js';
import $$ from './$$.js'
import nameModificator from './nameModificator.js';

let classNamesIndex = 0;

const ERROR_TOP_PROPS    = className=> `[JSVN] Node "${className}" has a render operator or env modifier, main node must not have "__IF", "__EACH(_invert)" or '__env' properties.`;
const WARN_UNSAFE_GLOBAL = (className, baseItem) => `[JSVN] Warning! Node "${className}" is based on the global class "${baseItem}" without "$$.useGlobal()". The short style of inheriting global styles is unsafe and may change in the future.`;
const NOTBEM_MODE_NAME   = (className, modName) => `[JSVN] Warning! Name of modificator "${modName}" for node "${className}" is not BEM.`;

const childrenTypes = {
	SIMPLE : Symbol(),
	SYMBOL : Symbol(),
};

export default class SourceNode {
	#classId   = classNamesIndex++;
	#nodeName = null;

	#tagName   = 'div';
	#preset    = {};
	#params    = {};
	#inline    = {};
	#events    = {};
	#condition = null;
	#repeatFor = null;
	#envMod    = null;

	#envVals = {};
	#envGens = {};

	#classes  = [];
	#mods     = [];
	#children = [];
	#pureHTML = null;

	#rootName = null;

	#childrenType = null;
	#subclasses = {};

	get tagName   () { return this.#tagName;   }
	get className () { return nameModificator(this.#nodeName); }
	get viewName  () { return this.#rootName || this.#nodeName; }

	constructor (dependencies = null, cssReceiver = null, content = null, base = null, name = null, parentSelector = null, rootName = null, parentData = null) {
		if (!dependencies) return;

		this.#rootName = rootName;
		if (this.#rootName) this.#nodeName = name || 'node' + this.#classId;
		else                this.#nodeName = name || 'View' + this.#classId;

		const baseNode = base && this.#parseBases(base, dependencies, parentData);
		if (baseNode) this.#basedOn(baseNode);

		let selector = '.' + this.className;
		if (parentSelector) selector = parentSelector + '>' + selector;

		let css;
		if (content) {
			css = this.#parseContent(dependencies, content, selector, !parentSelector, (baseNode||{}).viewName);
			if (css) css = selector + ' {\n'+css.styles+'}\n\n' + css.childs;
		}

		if (cssReceiver && typeof cssReceiver === 'function') cssReceiver(css, this.className);
	}

	render (render, ...envs) {
		if (this.#repeatFor) {
			let list   = this.#repeatFor.list(...envs),
				invert = this.#repeatFor.invert;

			if (!list) return null;
			const renderedNodes = [];
			if (Array.isArray(list)) {
				let index = 0;
				for (const itemEnv of list) {
					if (this.#condition && !this.#condition(itemEnv, index++, ...envs)) continue;
					const renderedNode = this.#renderOnce(render, itemEnv, index++, ...envs);
					renderedNodes.push(renderedNode);
				}
			} else if (typeof list === 'number') {
				for (let i = 0; i < list; i++) {
					if (this.#condition && !this.#condition(i, ...envs)) continue;
					const renderedNode = this.#renderOnce(render, i, ...envs);
					renderedNodes.push(renderedNode);
				}
			} else if (typeof list === 'object') {
				let index = 0;
				for (const [key, value] of Object.entries(list)) {
					if (this.#condition && !this.#condition(key, value, index++, ...envs)) continue;
					const renderedNode = this.#renderOnce(render, key, value, index++, ...envs);
					renderedNodes.push(renderedNode);
				}
			} else throw new Error('[JSVN] __EACH(_invert) argument must be "Array", "number" or iterable object.');

			if (invert) renderedNodes.reverse();

			return renderedNodes;
		} else {
			if (this.#condition && !this.#condition(...envs)) return null;
			return this.#renderOnce(render, ...envs);
		}
	}

	#renderOnce (render, ...envs) {
		if (this.#envMod) {
			if (typeof this.#envMod === 'function') envs = [ this.#envMod(...envs), ...envs ];
			else if (Array.isArray(this.#envMod)) {
				const envsLoc = [];
				for (let env of this.#envMod) {
					if (typeof env === 'function') env = env(...envs);
					envsLoc.push(env);
				}
				envs = envsLoc;
			}
			else envs = [ this.#envMod, ...envs ];
		} else {
			let newEnv = null;
			for (const [key, value] of Object.entries(this.#envVals)) {
				if (!newEnv) newEnv = {};
				newEnv[key] = value;
			}
			for (const [key, lambda] of Object.entries(this.#envGens)) {
				if (!newEnv) newEnv = {};
				newEnv[key] = lambda(...envs);
			}
			if (newEnv) {
				if (typeof envs[0] === 'object') envs[0] = { ...envs[0], ...newEnv };
				else envs[0] = newEnv;
			}
		}

		let renderedChildren = null;
		if (this.#children) {
			renderedChildren = [];
			for (const child of this.#children) {
				let rendered = child; //text

				if      (child instanceof SourceNode) rendered = child.render(render, ...envs);
				else if (typeof child === 'function') rendered = child(...envs); //lambda text
				else if (Array.isArray(child)) { //component
					const [component, props] = child;
					if (component instanceof $$.View) rendered = component.render(render, props(...envs));
					else rendered = { JSVNContainer: true, component, props: props(...envs) }; //external component
				}

				if (Array.isArray(rendered)) {
					for (const renderedNode of rendered) renderedChildren.push(renderedNode)
				} else {
					renderedChildren.push(rendered);
				}
			}
		}

		const params = { ...this.#preset };
		for (const [paramName, lambda] of Object.entries(this.#params)) params[paramName] = lambda(...envs);

		const events = {};
		for (const [paramName, lambda] of Object.entries(this.#events)) events[paramName] = lambda(...envs);

		const style = {};
		for (const [styleName, lambda] of Object.entries(this.#inline)) style[styleName] = lambda(...envs);

		const classes = [];
		for (const classSrc of this.#classes) {
			if (typeof classSrc === 'function') {
				let classProto = classSrc(...envs);
				const className = SourceNode.#prepareClass(classProto);
				if (!className) throw new Error(`[JSVN] Incorrect dynamic class value, must be function returns string/global.`);
				classes.push(className);
			} else classes.push(classSrc);
		}

		classes.push(this.className);

		for (const mod of this.#mods) {
			if (typeof mod === 'function') {
				const classProto = mod(...envs);
				if (classProto) {
					const className = SourceNode.#prepareClass(classProto, this.className);
					if (!className) throw new Error(`[JSVN] Incorrect "__mods" value, must be array of functions returns strings/globals.`);
					classes.push(className);
				}
			} else throw new Error(`[JSVN] Incorrect "__mods" value, must be array of functions returns strings/globals.`);
		}

		let pureHTML = this.#pureHTML;
		if (pureHTML && typeof pureHTML === 'function') pureHTML = pureHTML(...envs);

		return render(this.#tagName, classes, params, style, events, renderedChildren, pureHTML);
	}

	#parseBaseItem (baseItem, baseNode, dependencies, parentData) {
		if (!baseItem) return false;

		if (typeof baseItem === 'string') {
			if (baseItem.startsWith('<>')) {
				this.#tagName = baseItem.slice(2);
			} else if (baseItem.startsWith('/')) {
				this.#tagName = baseItem.slice(1);
				this.#children = null;
			} else if (baseItem.startsWith('.')) {
				this.#classes.push(baseItem.slice(1));
				console.warn(WARN_UNSAFE_GLOBAL(this.className, baseItem));
			} else {
				this.#classes.push(nameModificator(baseItem));
				/*if (parentData) {
					if (parentData.subclasses.includes(baseItem)) {
						this.#classes.push((this.#rootName + '__' + baseItem));
					} else {
						this.#classes.push((parentData.baseViewName + '__' + baseItem));
					}
				} else throw new Error(`[JSVN] Root node of "${this.className}" cannot be based on local classes, import class "${baseItem}" before using.`);*/
			}
			return true;
		}

		if (baseItem instanceof SourceNode || baseItem.isSubNode) {
			if (baseNode) throw new Error(`[JSVN] Node is based on multiple views: "${baseNode.className}", "${baseItem.className}". Multiple inheritance is not allowed.`);
			baseNode = baseItem.isSubNode && baseItem.value || baseItem;
			this.#tagName = baseNode.tagName;
			for (const baseViewClass of baseNode.#classes) this.#classes.push(baseViewClass);
			if (!this.#classes.includes(baseNode.className)) this.#classes.push(baseNode.className);
			if (baseItem instanceof SourceNode) dependencies.add(baseNode);

			return baseNode;
		}

		if (baseItem instanceof Pointer) {
			if (baseItem.type === Pointer.types.BASE_NODE) throw new Error(`[JSVN] Base node named "${baseItem.value}" was not found in the base View.`);
			if (baseItem.type === Pointer.types.CLASS_IMPORT) this.#classes.push(baseItem.value);

			return true;
		}

		if (baseItem === $$.__) throw new Error(`[JSVN] Base node named "${this.#nodeName}" was not found in the parent node of the base View.`);

		if (typeof baseItem === 'function') {
			this.#classes.push(baseItem);
			return true;
		}

		return false;
	};

	#parseBases (bases, dependencies, parentData) {
		bases.reverse();

		let baseNode = null;
		for (let baseItem of bases) {
			const result = this.#parseBaseItem(baseItem, baseNode, dependencies, parentData);
			if (result instanceof SourceNode) baseNode = result;
			if (!result) throw new Error('[JSVN] Node base must be string, global, base child or View.');
		}

		return baseNode;
	}

	#basedOn (baseNode) {
		this.#preset  = { ...baseNode.#preset };
		this.#params  = { ...baseNode.#params };
		this.#inline  = { ...baseNode.#inline };
		this.#events  = { ...baseNode.#events };
		this.#envGens = { ...baseNode.#envGens };
		this.#envVals = { ...baseNode.#envVals };

		this.#condition = baseNode.#condition;
		this.#repeatFor = baseNode.#repeatFor && { ...baseNode.#repeatFor };
		this.#envMod    = baseNode.#envMod;
		this.#pureHTML  = baseNode.#pureHTML;

		this.#subclasses = { ...baseNode.#subclasses };
		this.#childrenType = baseNode.#childrenType;

		if (this.#children && baseNode.#children) this.#children = [ ...baseNode.#children ];
	}

	#parseBodyItem (css, key, value, selector, isRootNode, subclasses, baseViewName, typeMixing, dependencies, children) {
		if (key === '$' ) key = { type: symbols.TEXT, isSimple: true };
		if (key === '$$') {
			this.#pureHTML = value;
			return true;
		}

		//sys param
		if (typeof key === 'string') {
			if (key.startsWith('__')) {
				key = key.slice(2);

				if (key === 'IF') {
					if (isRootNode) throw new Error(ERROR_TOP_PROPS(this.className));
					if (typeof value !== 'function') throw new Error(`[JSVN] Incorrect value type for key '__IF' in node '${this.className}'. Must be function.`);
					this.#condition = value;
					return true;
				}
				if (key === 'EACH' || key === 'EACH_invert') {
					if (isRootNode) throw new Error(ERROR_TOP_PROPS(this.className));
					if (this.#repeatFor) throw new Error(`[JSVN] Duplicate '__EACH(_invert)' key in node '${this.className}'.`);
					if (typeof value === 'object') {
						if (typeof value.list === 'function') {
							this.#repeatFor = { list:value, invert: key.length === 11 };
							return true;
						}
					} else if (typeof value === 'function') {
						this.#repeatFor = { list:value, invert: key.length === 11 };
						return true;
					}
					throw new Error(`[JSVN] Incorrect value type for key '__EACH(_invert)' in node '${this.className}'. Must be function or object with 'list' function.`);
				}
				if (key === 'env') {
					if (isRootNode) throw new Error(ERROR_TOP_PROPS(this.className));
					if (this.#envGens.length || this.#envVals.length) throw new Error('[JSVN] Mixed use of __env and environment parameters (_*) is not allowed.');
					this.#envMod = value;
					return true;
				}
				if (key === 'bind') {
					if (Array.isArray(value)) {
						const [getValue, setValue] = value;

						this.#params['value']  = getValue;
						this.#events['change'] = env => e => setValue(env)(e.target.value);
						return true;
					}
					if (typeof value === 'string') {
						const setValue = 'set' + value[0].toUpperCase() + value.slice(1);

						this.#params['value']  = env => env[value] || '';
						this.#events['change'] = env => e => env[setValue](e.target.value);
						return true;
					}
				}
				if (key === 'mods') {
					if (Array.isArray(value)) {
						this.#mods = [...this.#mods, ...value];
						return true;
					} else throw new Error(`[JSVN] Incorrect '__mods' value in node '${this.className}', must be array of functions returns strings/globals.`);
				}
				if (key.startsWith('on') && typeof value === 'function') {
					this.#events[key.slice(2)] = value;
					return true;
				}

				return false;
			}

			if (key.startsWith('$')) {
				if (typeof value === 'function') {
					this.#params[key.slice(1)] = value;
					return true;
				} else {
					this.#preset[key.slice(1)] = value;
					return true;
				}
			}

			if (key.startsWith('_')) {
				if (this.#envMod) throw new Error('[JSVN] Mixed use of __env and environment parameters (_*) is not allowed.');

				if (typeof value === 'function') {
					this.#envGens[key.slice(1)] = value;
					return true;
				} else {
					this.#envVals[key.slice(1)] = value;
					return true;
				}
			}

			/*if (key.startsWith('--')) {
				key = { type: symbols.MOD, name: key, condition: null };
			} else */
			if (key.startsWith('#')) {
				key = { type: symbols.SOURCE, name: key.slice(1), isSimple: true };
			}
		}

		//styleNodeParsers
		const parser = styleParsers(css, key, value, selector, this.viewName);
		if (parser) {
			if (typeof parser === 'string') {
				if (subclasses[parser]) throw new Error(`[JSVN] Duplicate class name "${parser}". If you need to set common styles for multiple nodes, inherit nodes from a local class.`);
				subclasses[parser] = { isNode: false };
			} else if (typeof parser === 'function') {
				this.#mods.push((...envs)=>parser(...envs) && key);
			}
			return true;
		}

		//inline style
		if (typeof key === 'string' && typeof value === 'function') {
			this.#inline[key] = value;
			return true;
		}

		if (Array.isArray(key)) {
			//view / custom component
			if (typeof value === 'function') {
				if (key[0] instanceof SourceNode) dependencies.add(key[0]);
				children.push([key[0], value]);
				return true;
			}

			//base
			key = { type: symbols.SOURCE, base: key }
		}

		if (typeof key === 'object') {
			if (key.type === symbols.TEXT) {
				if (key.isSimple) typeMixing.haveSimple = true;
				else              typeMixing.haveSymbol = true;
				children.push(value);
				return true;
			}
			if (key.type === symbols.SOURCE) { //sourceNode
				if (children) {
					if (key.isSimple) typeMixing.haveSimple = true;
					else              typeMixing.haveSymbol = true;

					//It's override some node?
					let basePointer = SourceNode.#getBaseIndex(key, this.#children, this.#subclasses);
					//console.log(`${this.className}/${key.name} : ${basePointer}`);

					if (key.name) {
						//Is unique child name
						if (subclasses[key.name] || basePointer < 0 && this.#subclasses[key.name]) {
							throw new Error(`[JSVN] Duplicate node name "${key.name}". If you need to set common styles for multiple nodes, inherit nodes from a local class.`);
						}
						subclasses[key.name] = { isNode: true };
					}

					let childCSS;
					const getCSS = v => childCSS = v;
					if (basePointer >= 0) key.base.push({value: this.#children[basePointer], isSubNode: true});
					const childNode = new SourceNode(
						dependencies,
						getCSS, value, key.base, key.name,
						selector, this.viewName,
						{ subclasses: this.#subclasses, baseViewName },
					);
					children.push(childNode);

					if (childCSS) css.childs += childCSS;
				} else throw new Error('[JSVN] Child node in self-closing tag. Self-closing tag must not have children.');
				return true;
			}
			if (key.type === symbols.IF) {
				//...
			}
		}

		//ERROR
		return false;
	}

	#parseContent (dependencies, content, selector, isRootNode, baseViewName) {
		const css = { styles: '', childs: '' };
		const subclasses = {};
		const typeMixing = {
			haveSimple : this.#childrenType === childrenTypes.SIMPLE,
			haveSymbol : this.#childrenType === childrenTypes.SYMBOL,
		};

		let contentEntries;
		if (Array.isArray(content)) contentEntries = content;
		else contentEntries = Object.entries(content);

		const children = this.#children ? [] : null;

		for (let [key, value] of contentEntries) {
			if (!this.#parseBodyItem(css, key, value, selector, isRootNode, subclasses, baseViewName, typeMixing, dependencies, children)) {
				const keyType = typeof key;
				throw new Error(`[JSVN] Incorrect key (${keyType}) '${keyType === 'string' ? key : '*'}' of node '${this.className}'`);
			}
		}

		if (children) {
			children.reverse();
			const sortedChildren = [];
			for (let child of children) {
				const originIndex = this.#children.findIndex(c=>{
					if (c instanceof SourceNode && child instanceof SourceNode) {
						return c.#nodeName === child.#nodeName;
					}
					return false;
				});
				if (originIndex >= 0) {
					const block = this.#children.splice(originIndex);
					block[0] = child;
					sortedChildren.push(...block.reverse());
				} else sortedChildren.push(child);
			}
			this.#children.push(...sortedChildren.reverse());
		}

		if (typeMixing.haveSimple && typeMixing.haveSymbol) throw new Error(`[JSVN] Simple-key nodes ($:, '#name':) and symbol-key nodes ([$$.text]:, [$$\`name\`]:) are mixed in node "${this.className}" of view "${this.viewName}". Don not mix different types of child nodes in same parent node.`);

		for (let scName of Object.keys(subclasses)) {
			//if (this.#subclasses[scName]) throw new Error(`[JSVN] Duplicate node name "${scName}". If you need to set common styles for multiple nodes, inherit nodes from a local class.`);
			this.#subclasses[scName] = subclasses[scName];
		}

		if      (typeMixing.haveSymbol) this.#childrenType = childrenTypes.SYMBOL;
		else if (typeMixing.haveSimple) this.#childrenType = childrenTypes.SIMPLE;

		return css;
	}

	//Utils
	static #getBaseIndex (key, children, baseSubclasses) {
		let baseName = null;

		if (key.base) {
			if (!key.base.length) baseName = key.name;
			else if (baseSubclasses[key.name]) {
				throw new Error(`[JSVN] The overriding node "${key.name}" must not have any other bases`);
			}
		}

		if (baseName) {
			return children.findIndex(child=>{
				if (child instanceof SourceNode) return child.#nodeName === baseName;
				return false;
			});
		} else return -1;
	}

	static #prepareClass (classProto, modTarget = null) {
		if (classProto instanceof Pointer) return classProto.value;
		else if (typeof classProto === 'string') {
			if (classProto[0] === '.') {
				console.warn(WARN_UNSAFE_GLOBAL(modTarget, classProto));
				return classProto.slice(1);
			}
			if (modTarget) {
				if (!classProto.startsWith('--')) console.warn(NOTBEM_MODE_NAME(modTarget, classProto));
				return modTarget + classProto;
			}
			return nameModificator(classProto);
		} else return null;
	}
}