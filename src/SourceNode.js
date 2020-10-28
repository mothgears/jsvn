import styleParsers from './styleParsers.js';
import symbols from './symbols.js';
import Pointer from './Pointer.js';
import $$ from './$$.js'
import nameModificator from './nameModificator.js';

let classNamesIndex = 0;

const ERROR_TOP_PROPS = className=> `[JSVN] Node "${className}" has a render operator or env modifier, main node must not have "__IF", "__EACH" or '__env' properties.`;
const WARN_UNSAFE_GLOBAL = (className, baseItem) => `[JSVN] Warning: node "${className}" is based on the global class "${baseItem}" without "$$.import()". The concise style of inheriting global styles is unsafe and may change in the future.`;

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
	#children = [];

	#rootName = null;

	get tagName   () { return this.#tagName;   }
	get className () { return nameModificator(this.#nodeName); }
	get viewName  () { return this.#rootName || this.#nodeName; }

	constructor (cssReceiver = null, content = null, base = null, name = null, parentSelector = null, rootName = null, parentData = null) {
		if (!cssReceiver) return;

		this.#rootName = rootName;
		if (this.#rootName) this.#nodeName = name || 'node' + this.#classId;
		else                this.#nodeName = name || 'View' + this.#classId;

		const baseViewName = base && this.#parseBases(base, parentData);

		let selector = '.' + this.className;
		if (parentSelector) selector = parentSelector + '>' + selector;


		let css = { styles: '', childs: '' };

		if (content) this.#parseContent(css, content, selector, !parentSelector, baseViewName);

		css = selector + ' {\n'+css.styles+'}\n\n' + css.childs;
		if (cssReceiver && typeof cssReceiver === 'function') cssReceiver(css, this.className);
	}

	render (render, ...envs) {
		if (this.#condition && !this.#condition(...envs)) return null;

		if (this.#repeatFor) {
			const list = this.#repeatFor(...envs);
			const renderedNodes = [];
			if (Array.isArray(list)) {
				for (const itemEnv of list) {
					const renderedNode = this.#renderOnce(render, itemEnv, ...envs);
					renderedNodes.push(renderedNode);
				}
			}
			return renderedNodes;
		} else {
			return  this.#renderOnce(render, ...envs);
		}
	}

	#renderOnce (render, ...envs) {
		if (this.#envMod) {
			if (typeof this.#envMod === 'function') envs[0] = this.#envMod(...envs);
			else envs[0] = this.#envMod;
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
				let rendered = child;

				if      (child instanceof SourceNode) rendered = child.render(render, ...envs);
				else if (typeof child === 'function') rendered = child(...envs);
				else if (Array.isArray(child)) {
					const [component, props] = child;
					if (component instanceof $$.View) rendered = component.render(props(...envs));
					else if (typeof component === 'function') rendered = component(props(...envs));
					else throw new Error(`[JSVN] Unknown child type: "${typeof component}"`);
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
		for (const classProto of this.#classes) {
			if (typeof classProto === 'function') {
				let className = classProto(...envs);
				if (className instanceof Pointer) classes.push(className.value);
				else if (typeof className === 'string') {
					if (className[0] === '.') {
						classes.push(className.slice(1));
						console.warn(WARN_UNSAFE_GLOBAL(this.className, className));
					} else {
						classes.push(nameModificator(className));
					}
				}
			} else classes.push(classProto);
		}
		classes.push(this.className);

		return render(this.#tagName, classes, params, style, events, renderedChildren);
	}

	#parseBaseItem (baseItem, baseNode, parentData) {
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

		if (baseItem instanceof SourceNode) {
			if (baseNode) throw new Error(`[JSVN] Node is based on multiple views: "${baseNode.className}", "${baseItem.className}". Multiple inheritance is not allowed.`);
			baseNode = baseItem;
			this.#tagName = baseNode.tagName;
			for (const baseViewClass of baseNode.#classes) {
				this.#classes.push(baseViewClass);
			}
			this.#classes.push(baseNode.className);

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

	#parseBases (bases, parentData) {
		bases.reverse();

		let baseNode = null;
		for (let baseItem of bases) {
			const result = this.#parseBaseItem(baseItem, baseNode, parentData);
			if (result instanceof SourceNode) baseNode = result;
			if (!result) throw new Error('[JSVN] Node base must be string, import, base child or View.');
		}

		if (baseNode) {
			this.#basedOn(baseNode);
			return baseNode.viewName;
		}

		return false;
	}

	#basedOn (baseNode) {
		this.#preset  = { ...baseNode.#preset };
		this.#params  = { ...baseNode.#params };
		this.#inline  = { ...baseNode.#inline };
		this.#events  = { ...baseNode.#events };
		this.#envGens = { ...baseNode.#envGens };
		this.#envVals = { ...baseNode.#envVals };

		this.#condition = baseNode.#condition;
		this.#repeatFor = baseNode.#repeatFor;
		this.#envMod    = baseNode.#envMod;

		if (this.#children && baseNode.#children) this.#children  = [ ...baseNode.#children ];
	}

	#parseBodyItem (css, key, value, selector, isRootNode, subclasses, baseViewName) {
		//sys param
		if (typeof key === 'string') {
			if (key.startsWith('__')) {
				key = key.slice(2);
				if (typeof value === 'function') {
					if (key === 'IF')   {
						if (isRootNode) throw new Error(ERROR_TOP_PROPS(this.className));
						this.#condition = value;
						return true;
					}
					if (key === 'EACH') {
						if (isRootNode) throw new Error(ERROR_TOP_PROPS(this.className));
						this.#repeatFor = value;
						return true;
					}
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
				if (key.startsWith('on') && typeof value === 'function') {
					this.#events[key.slice(2)] = value;
				}
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
		}

		//styleNodeParsers
		const parser = styleParsers(css, key, value, selector, this.viewName);
		if (parser) {
			if (typeof parser === 'string') subclasses.push(parser);
			return true;
		}

		//inline style
		if (typeof key === 'string' && typeof value === 'function') {
			this.#inline[key] = value;
			return true;
		}

		if (Array.isArray(key)) {
			//view / custom component
			if(typeof value === 'function') {
				this.#children.push([key[0], value]);
				return true;
			}

			//base
			key = { type: symbols.SOURCE, base: key }
		}

		if (typeof key === 'object') {
			if (key.type === symbols.TEXT) {
				this.#children.push(value);
				return true;
			}
			if (key.type === symbols.SOURCE) { //sourceNode
				if (this.#children) {
					let basePointer = SourceNode.#getBaseIndex(key, this.#children);

					let childCSS;
					const getCSS = v => childCSS = v;
					if (basePointer >= 0) key.base.push(this.#children[basePointer]);
					const childNode = new SourceNode(
						getCSS, value, key.base, key.name,
						selector, this.viewName,
						{ subclasses, baseViewName },
					);
					if (basePointer >= 0) this.#children[basePointer] = childNode;
					else this.#children.push(childNode);

					if (childCSS) css.childs += childCSS;
				} else throw new Error('[JSVN] Child node in self-closing tag. Self-closing tag must not have children');
				return true;
			}
		}

		//ERROR
		return false;
	}

	#parseContent (css, content, selector, isRootNode, baseViewName) {
		const subclasses = [];
		for (let [key, value] of content) {
			if (!this.#parseBodyItem(css, key, value, selector, isRootNode, subclasses, baseViewName)) {
				const keyType = typeof key;
				throw new Error(`[JSVN] Incorrect key (${keyType}) '${keyType === 'string' ? key : '*'}' of node '${this.className}'`);
			}
		}
	}

	//Utils
	static #getBaseIndex (key, children) {
		let basePointer = null;
		if (key.base) {
			if (!key.base.length) basePointer = key.name;
			else {
				basePointer = key.base.indexOf($$.__);
				if (basePointer >= 0) {
					delete key.base[basePointer];
					basePointer = key.name;
				} else {
					basePointer = key.base.findIndex(b=>b instanceof Pointer && b.type === Pointer.types.BASE_NODE);
					if (basePointer >= 0) {
						delete key.base[basePointer];
						basePointer = key.name;
					} else basePointer = null;
				}
			}
		}

		if (basePointer) basePointer = children.findIndex(child=>{
			if (child instanceof SourceNode) return child.#nodeName === basePointer;
			return false;
		});
		else return -1;

		return basePointer;
	}
}