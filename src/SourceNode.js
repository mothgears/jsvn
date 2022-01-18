import styleParsers     from './styleParsers.js';
import symbols          from './symbols.js';
import Pointer          from './Pointer.js';
import $$               from './$$.js'
import { installStyle } from './installCSS';
import { cutByFilter }  from './exparr';
import { NODE_MODIFIER, RULE_MODIFIER, VIEW_MODIFIER } from './nameModifiers';
import VirtualNode from './VirtualNode';
import {CUSTOMIZATOR_KEY} from "./customize";

let classNamesIndex = 0;

const ERROR_TOP_PROPS    = className=> `[JSVN] Node "${className}" has a render operator or env modifier, main node must not have "__IF", "__EACH" or '__env' properties.`;

const childrenTypes = {
	SIMPLE : Symbol(),
	SYMBOL : Symbol(),
};

export class SourceNode extends VirtualNode {
	#classId  = classNamesIndex++;
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

	get tagName   () { return this.#tagName; }
	get className () { return this.#rootName ? NODE_MODIFIER + this.#nodeName : VIEW_MODIFIER + this.#nodeName; }
	get viewName  () { return this.#rootName || this.#nodeName; }

	constructor (dependencies = null, cssReceiver = null, content = null, base = null, name = null, parentSelector = null, rootName = null, parentData = null) {
		super();

		if (!dependencies) return;

		this.#rootName = rootName;
		if (this.#rootName) this.#nodeName = name || 'n' + this.#classId;
		else                this.#nodeName = name || 'V' + this.#classId;

		if (base) {
			const baseNode = this.#parseBases(base, dependencies, parentData);
			if (baseNode) this.#basedOn(baseNode);
		}

		let selector = '.' + this.className;
		if (parentSelector) selector = parentSelector + '>' + selector;

		let css;
		if (content) {
			css = this.#parseContent(dependencies, content, selector, !parentSelector/*, (baseNode||{}).viewName*/);
			if (css) css = selector + ' {\n'+css.styles+'}\n\n' + css.childs;
		}

		if (cssReceiver && typeof cssReceiver === 'function') cssReceiver(css, this.className);
	}

	//envs - list of environments
	render (renderEngine, ...envs) {
		if (this.#repeatFor) {
			let list   = this.#repeatFor(...envs);
			let invert = false;
			let envTransformer = null;
			if (list.isCustomized === CUSTOMIZATOR_KEY) {
				invert = list.options.reverse;
				if (list.options.env) envTransformer = list.options.env;
				list = list.value;
			}

			if (!list) return null;
			const renderedNodes = [];
			if (Array.isArray(list)) {
				let index = 0;
				for (const itemEnv of list) {
					let localEnv = [itemEnv, index++];
					if (envTransformer) localEnv = envTransformer(...localEnv);
					if (this.#condition && !this.#condition(...localEnv, ...envs)) continue;
					const renderedNode = this.#renderOnce(renderEngine, ...localEnv, ...envs);
					renderedNodes.push(renderedNode);
				}
			} else if (typeof list === 'number') {
				for (let i = 0; i < list; i++) {
					let localEnv = [i];
					if (envTransformer) localEnv = envTransformer(...localEnv);
					if (this.#condition && !this.#condition(...localEnv, ...envs)) continue;
					const renderedNode = this.#renderOnce(renderEngine, ...localEnv, ...envs);
					renderedNodes.push(renderedNode);
				}
			} else if (typeof list === 'object') {
				let index = 0;
				for (const [key, value] of Object.entries(list)) {
					let localEnv = [key, value, index++];
					if (envTransformer) localEnv = envTransformer(...localEnv);
					if (this.#condition && !this.#condition(...localEnv, ...envs)) continue;
					const renderedNode = this.#renderOnce(renderEngine, ...localEnv, ...envs);
					renderedNodes.push(renderedNode);
				}
			} else throw new Error('[JSVN] __EACH argument must be "Array", "number" or iterable object.');

			if (invert) renderedNodes.reverse();

			return renderedNodes;
		} else {
			if (this.#condition && !this.#condition(...envs)) return null;
			return this.#renderOnce(renderEngine, ...envs);
		}
	}

	#renderOnce (renderEngine, ...envs) {
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
				//text
				let rendered = child;

				//node
				if (child instanceof SourceNode) rendered = child.render(renderEngine, ...envs);

				//lambda text
				else if (typeof child === 'function') rendered = child(...envs);

				//inclusion
				else if (Array.isArray(child)) {
					let [component, props] = child;

					/*composition component*/
					if (typeof component === 'function') component = component(...envs);

					/*JSVN View*/
					if (component instanceof View) rendered = component.render(renderEngine, props(...envs));

					/*external component*/
					else if (Array.isArray(component)) rendered = {
						JSVNContainer : true,
						component     : component[0],
						props         : props(...envs),
						renderEngine  : component[1],
					};

					else throw new Error(`[JSVN "${this.viewName}" / "${this.#nodeName}"] Unknown inclusion.`);
				}

				if (Array.isArray(rendered)) {
					for (const renderedNode of rendered) if (renderedNode) renderedChildren.push(renderedNode)
				} else {
					if (rendered) renderedChildren.push(rendered);
				}
			}
		}

		const props = { ...this.#preset };
		for (const [propName, lambda] of Object.entries(this.#params)) props[propName] = lambda(...envs);

		const events = {};
		for (const [propName, lambda] of Object.entries(this.#events)) events[propName] = lambda(...envs);

		const style = {};
		for (const [styleName, lambda] of Object.entries(this.#inline)) style[styleName] = lambda(...envs);

		const classes = [];
		for (const classSrc of this.#classes) {
			if (typeof classSrc === 'function') {
				let classProto = classSrc(...envs);
				let className = null;

				if (classProto instanceof Pointer) className = classProto.value;
				else if (typeof classProto === 'string') {
					if (classProto[0] === '.') {
						throw new Error(`[JSVN] Invalid class name "${classProto}", did you mean "${classProto.slice(1)}"? Or if you mean global class named "${classProto}" require it before using: "const myClass = requireGlobal(${classProto})".`);
					}
					className = RULE_MODIFIER + classProto;
				}

				if (className) classes.push(className);
			} else classes.push(classSrc);
		}

		classes.push(this.className);

		for (const mod of this.#mods) {
			if (typeof mod === 'function') {
				const classProto = mod(...envs);
				if (classProto) {
					if (typeof classProto !== 'string' || !classProto.startsWith('--')) {
						throw new Error(`[JSVN] Incorrect "__mods" value, must be array of functions returns strings starts with "--" or empty value.`);
					}
					classes.push(this.className + classProto);
				}
			} else throw new Error(`[JSVN] Incorrect "__mods" value, must be array of functions returns strings/globals.`);
		}

		let pureHTML = this.#pureHTML;
		if (pureHTML && typeof pureHTML === 'function') pureHTML = pureHTML(...envs);

		return renderEngine.render(this.#tagName, classes, props, style, events, renderedChildren, pureHTML);
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
				throw new Error(`[JSVN] Invalid base name "${baseItem}", did you mean "${baseItem.slice(1)}"? Or if you mean global class named "${baseItem}" require it before using: "const myClass = requireGlobal(${baseItem})".`);
			} else {
				this.#classes.forEach(cls=>{
					if (RULE_MODIFIER + baseItem === cls) throw new Error(`[JSVN] Duplicate base name "${baseItem}".`);
					if (NODE_MODIFIER + baseItem === cls) throw new Error(`[JSVN] Duplicate base name "${baseItem}".`);
				});
				if (parentData) {
					const base = parentData.hasGhostNode(baseItem);
					if (base) {
						if (base instanceof SourceNode) throw new Error(`[JSVN] Inheriting from a local real node "${baseItem}" is not allowed.`);
						this.#classes.push(RULE_MODIFIER + baseItem);
						this._bases.push(base);
					} else {
						throw new Error(`JSVN "${this.viewName}" [${parentData.nodeName} / ${this.#nodeName}] Impossible inheriting from a local virtual rule "${baseItem}" that does not exist in the parent node "${parentData.nodeName}".`);
					}
				} else throw new Error(`JSVN View "${this.viewName}" cannot be based on local virtual rules (local classes), if you mean global class named "${baseItem}" require it before using: "let myClass = requireGlobal(${baseItem})".`);
			}
			return true;
		}

		if (baseItem instanceof SourceNode || baseItem.isSubNode) {
			if (baseNode) throw new Error(`[JSVN] Node is based on multiple views: "${baseNode.className}", "${baseItem.className}". Multiple inheritance is not allowed.`);
			baseNode = baseItem.isSubNode && baseItem.value || baseItem;
			this.#tagName = baseNode.tagName;
			for (const baseViewClass of baseNode.#classes) this.#classes.push(baseViewClass);
			if (!this.#classes.includes(baseNode.className)) this.#classes.push(baseNode.className);
			this._bases.push(baseNode);
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

			if (!result) throw new Error('[JSVN] Base of node must be string, global, base-child or View.');
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

		//this._virtuals = { ...baseNode._virtuals };
		this.#childrenType = baseNode.#childrenType;

		if (this.#children && baseNode.#children) this.#children = [ ...baseNode.#children ];
	}

	#parseBodyItem (css, key, value, selector, isRootNode, /*inherited,*/ /*baseViewName,*/ typeMixing, dependencies, children) {
		if (key === '$' ) {
			key = { type: symbols.TEXT, isSimple: true };
			//console.warn(`JSVN "${this.viewName}" [${this.#nodeName} / ${key}] Simple text notation is not documented and may be removed in future. Use "[$$()]:'my text'" for text nodes.`);
		}

		//sys param
		if (typeof key === 'string') {
			if (key[0] === '_') {
				key = key.slice(1);

				if (key === 'IF') {
					if (isRootNode) throw new Error(ERROR_TOP_PROPS(this.className));
					if (typeof value !== 'function') throw new Error(`[JSVN] Incorrect value type for key '_IF' in node '${this.className}'. Must be function.`);
					this.#condition = value;
					return true;
				}
				if (key === 'EACH') {
					if (isRootNode) throw new Error(ERROR_TOP_PROPS(this.className));
					if (this.#repeatFor) throw new Error(`[JSVN] Duplicate '_EACH' key in node '${this.className}'.`);
					if (typeof value === 'object') {
						if (typeof value.list === 'function') {
							this.#repeatFor = value;
							return true;
						}
					} else if (typeof value === 'function') {
						this.#repeatFor = value;
						return true;
					}
					throw new Error(`[JSVN] Incorrect value type for key '_EACH' in node '${this.className}'. Must be function or object with 'list' function.`);
				}
				if (key === 'env') {
					if (isRootNode) throw new Error(ERROR_TOP_PROPS(this.className));
					if (this.#envGens.length || this.#envVals.length) throw new Error('[JSVN] Mixed use of _env and environment parameters (_*) is not allowed.');
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
				/*if (key === 'mods') {
					if (Array.isArray(value)) {
						this.#mods = [...this.#mods, ...value];
						return true;
					} else throw new Error(`[JSVN] Incorrect '__mods' value in node '${this.className}', must be array of functions returns strings/globals.`);
				}*/
				if (key === 'html') {
					console.warn(`JSVN "${this.viewName}" [${this.#nodeName} / ${key}] Warning! Including pure HTML is unsafe and is not recommended for use.`);
					this.#pureHTML = value;
					return true;
				}

				return false;

			//Environment mod
			} else if (key.startsWith('$$')) {
				if (this.#envMod) throw new Error('[JSVN] Mixed use of _env and environment parameters ($$*) is not allowed.');

				if (typeof value === 'function') {
					this.#envGens[key.slice(2)] = value;
					return true;
				} else {
					this.#envVals[key.slice(2)] = value;
					return true;
				}

			//Params
			} else if (key.startsWith('$')) {
				if (typeof value === 'function') {
					if (key.startsWith('$on')) {
						this.#events[key.slice(3)] = value;
						return true;
					}
					this.#params[key.slice(1)] = value;
					return true;
				} else {
					this.#preset[key.slice(1)] = value;
					return true;
				}
			}
		}

		//styleNodeParsers
		const { style, parser, override, asVirtualNode } = styleParsers(css, key, value, selector, this.viewName, this.#nodeName);

		if (style || parser) {
			if (typeof parser === 'string') {
				if (this.hasNode(parser, VirtualNode.nodeTypes.OWN)) {
					throw new Error(`[JSVN : "${this.viewName}" / "${this.#nodeName}" > "${key}"] Duplicate class name "${parser}". If you need to set common styles for multiple nodes, inherit nodes from a local class.`);
				}
				const ghostNode = this.hasNode(parser, VirtualNode.nodeTypes.GHOST);
				if (ghostNode && !override) {
					throw new Error(`[JSVN : "${this.viewName}" / "${this.#nodeName}" > "${key}"] Duplicate class name "${parser}". If you need override local virtual node, add " >>" at the end of its name.`);
				}
				if (asVirtualNode) {
					if (ghostNode) asVirtualNode._addBase(ghostNode);
					this._addNode(parser, asVirtualNode);
				}
			} else if (typeof parser === 'function') {
				this.#mods.push((...envs)=>parser(...envs) && key);
			}
			return true;
		}

		//inline style
		if (typeof key === 'string' && typeof value === 'function') {
			const rx = /^[a-zA-Z]+$/;
			if (!rx.test(key)) {
				throw new Error(`[JSVN] The css property name "${key}" is incorrect.`);
			}

			this.#inline[key] = value;
			return true;
		}

		//if array of arguments "[$$(...agrs)]:{}"
		if (Array.isArray(key)) {
			const base = key;

			//view / custom component
			if (base.length && typeof value === 'function') {
				if (base.length > 1) throw new Error(`[JSVN] Multiple elements in one include operator "[$$(...)]: env => ({})". In the include operator must be one component/view.`);
				if (base[0] instanceof SourceNode) dependencies.add(base[0]);
				children.push([base[0], value]);
				return true;
			}

			if (!base.length && (typeof value === 'function' || typeof value === 'string')) {
				//text node
				key = { type: symbols.TEXT, isSimple: false };
			} else {
				//unnamed node
				key = { type: symbols.SOURCE, base }
			}
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
					let basePointer = SourceNode.#getBaseIndex(key, this.#children);
					//console.log(`${this.className}/${key.name} : ${basePointer}`);

					if (key.name) {
						//Is unique child name
						if (this.hasNode(key.name, VirtualNode.nodeTypes.OWN) || basePointer < 0 && this.hasNode(key.name, VirtualNode.nodeTypes.GHOST)) {
							throw new Error(`[JSVN] Duplicate node name "${key.name}". If you need to set common styles for multiple nodes, inherit nodes from a local class.`);
						}
					}

					let childCSS;
					const getCSS = v => childCSS = v;
					if (basePointer >= 0) {
						const baseNode =  { value: this.#children[basePointer], isSubNode: true };
						if (key.base) key.base.push(baseNode);
						else key.base = [baseNode];
					}
					const childNode = new SourceNode(
						dependencies,
						getCSS, value, key.base, key.name,
						selector, this.viewName,
						{
							hasGhostNode: nodeName => this.hasNode(nodeName, VirtualNode.nodeTypes.ALL),
							nodeName: this.#nodeName /*baseViewName*/
						},
					);
					if (key.name) this._addNode(key.name, childNode);
					children.push(childNode);

					if (childCSS) css.childs += childCSS;
				} else throw new Error('[JSVN] Child node in self-closing tag. Self-closing tag must not have children.');
				return true;
			}
		}

		//ERROR
		return false;
	}

	#parseContent (dependencies, content, selector, isRootNode/*, baseViewName*/) {
		const css = { styles: '', childs: '' };
		//const inherited = { ...this._virtuals };
		const typeMixing = {
			haveSimple : this.#childrenType === childrenTypes.SIMPLE,
			haveSymbol : this.#childrenType === childrenTypes.SYMBOL,
		};

		let contentEntries;
		if (Array.isArray(content)) contentEntries = content;
		else contentEntries = Object.entries(content);

		const children = this.#children ? [] : null;

		for (let [key, value] of contentEntries) {
			if (!this.#parseBodyItem(css, key, value, selector, isRootNode, /*inherited,*/ /*baseViewName,*/ typeMixing, dependencies, children)) {
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

		if (typeMixing.haveSimple && typeMixing.haveSymbol) throw new Error(`[JSVN] Simple-key nodes ("$:", "$$ name":) and symbol-key nodes ("[$$()]:'text'", "[$$\`name\`]:") are mixed in node "${this.className}" of view "${this.viewName}". Do not mix different types of child nodes in same parent node.`);

		if      (typeMixing.haveSymbol) this.#childrenType = childrenTypes.SYMBOL;
		else if (typeMixing.haveSimple) this.#childrenType = childrenTypes.SIMPLE;

		return css;
	}

	//Utils
	static #getBaseIndex (key, children) {
		let baseName = null;

		if (key.name && key.name.endsWith(' >>')) {
			key.name = key.name.slice(0, -3);
			baseName = key.name;
			/*if (!key.base.length) baseName = key.name;
			else if (baseSubclasses[key.name]) {
				throw new Error(`[JSVN] The overriding node "${key.name}" must not have any other bases`);
			}*/
		}

		if (baseName) {
			return children.findIndex(child=>{
				if (child instanceof SourceNode) return child.#nodeName === baseName;
				return false;
			});
		} else return -1;
	}
}

const paramsByTests = (params, tests) => tests.map(test => params.length ? cutByFilter(params, test) : null);

export class View extends SourceNode {
	#css;
	#dependencies;

	get css          () { return this.#css; }
	get dependencies () { return this.#dependencies; }

	constructor(...params) {
		const [ name, base, content ] = paramsByTests(params, [p=>typeof p === 'string', p=>Array.isArray(p), ()=>true]);

		if (!content) throw new Error('[JSVN] The View must have at least an argument with jsvn-content.');
		if (name) console.warn(`[JSVN] "${name}" : The named view is not recommended for use in a production environment.`);

		let css;
		let dependencies = new Set();

		super(
			dependencies,
			val => css = val,
			$$.arrayFrom(content),
			base,
			name,
		);

		this.#css          = css;
		this.#dependencies = dependencies;

		if (typeof document === 'object' && document) installStyle(this);
	}

	getDependencyTree (list = new Set()) {
		for (let depView of this.#dependencies) {
			list.add(depView);
			depView.getDependencyTree(list);
		}

		return list;
	};
}