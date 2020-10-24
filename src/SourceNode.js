import styleParsers from './styleParsers.js';
import symbols from './symbols.js';

let classNamesIndex = 0;

const ERROR_TOP_PROPS = className=> `[JSVN] Node "${className}" has a render operator or env modifier, main node must not have "__IF", "__EACH" or '__env' properties.`;

export default class SourceNode {
	#render;

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

	#viewName = '';

	get tagName   () { return this.#tagName;   }
	get className () { return (this.#viewName?(this.#viewName+'__'):'') + this.#nodeName; }

	constructor(render = null, cssReceiver = null, content = null, base = null, name = null, parentSelector = null, viewName = null) {
		if (!render) return;

		this.#render   = render;
		this.#viewName = viewName;

		base && this.#parseBase(base);

		this.#nodeName = name || 'jsvn-' + this.#classId;
		let selector = '.' + this.className;
		if (parentSelector) selector = parentSelector + '>' + selector;


		let css = { styles: '', childs: '' };

		if (content) this.#parseContent(css, content, selector, !parentSelector);

		css = selector + ' {\n'+css.styles+'}\n\n' + css.childs;
		if (cssReceiver && typeof cssReceiver === 'function') cssReceiver(css, this.className);
	}

	render (...envs) {
		if (this.#condition && !this.#condition(...envs)) return null;

		if (this.#repeatFor) {
			const list = this.#repeatFor(...envs);
			const renderedNodes = [];
			if (Array.isArray(list)) {
				for (const itemEnv of list) {
					const renderedNode = this.#renderOnce(itemEnv, ...envs);
					renderedNodes.push(renderedNode);
				}
			}
			return renderedNodes;
		} else {
			return  this.#renderOnce(...envs);
		}
	}

	#renderOnce(...envs) {
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

				if      (child instanceof SourceNode) rendered = child.render(...envs);
				else if (typeof child === 'function') rendered = child(...envs);
				else if (Array.isArray(child)) {
					const [component, props] = child;
					if (component instanceof SourceNode) rendered = component.render(props(...envs));
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

		const classes = [...this.#classes, this.className];

		return this.#render(this.#tagName, classes, params, style, events, renderedChildren);
	}

	#parseBase(base) {
		base.reverse();

		let baseNode = null;
		for (let baseItem of base) {
			if (typeof baseItem === 'string') {
				if (baseItem.startsWith('<>')) {
					this.#tagName = baseItem.slice(2);
				} else if (baseItem.startsWith('/')) {
					this.#tagName = baseItem.slice(1);
					this.#children = null;
				} else if (baseItem.startsWith('.')) {
					this.#classes.push((this.#viewName?`${this.#viewName}__`:'') + baseItem.slice(1));
				} else {
					this.#classes.push(baseItem);
				}
			} else if (typeof baseItem === 'function') {
				//optional class
				throw new Error('[JSVN] Node base must be string or View.');
			} else {
				if (baseItem && baseItem instanceof SourceNode) {
					if (baseNode) throw new Error(`[JSVN] Node is based on multiple views: "${baseNode.className}", "${baseItem.className}". Multiple inheritance is not allowed.`);
					baseNode = baseItem;
					this.#tagName = baseNode.tagName;
					for (const baseViewClass of baseNode.#classes) {
						this.#classes.push(baseViewClass);
					}
					this.#classes.push(baseNode.className);
				} else throw new Error('[JSVN] Node base must be string or View.');
			}
		}

		if (baseNode) {
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
	}

	#parsers(css, key, value, selector, mainNode) {
		//sys param
		if (typeof key === 'string') {
			if (key.startsWith('__')) {
				key = key.slice(2);
				if (typeof value === 'function') {
					if (key === 'IF')   {
						if (mainNode) throw new Error(ERROR_TOP_PROPS(this.className));
						this.#condition = value;
						return true;
					}
					if (key === 'EACH') {
						if (mainNode) throw new Error(ERROR_TOP_PROPS(this.className));
						this.#repeatFor = value;
						return true;
					}
				}
				if (key === 'env') {
					if (mainNode) throw new Error(ERROR_TOP_PROPS(this.className));
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
		const parser = styleParsers(css, key, value, selector, this.#viewName);
		if (parser) return true;

		//inline style
		if (typeof key === 'string' && typeof value === 'function') {
			this.#inline[key] = value;
			return true;
		}

		if (Array.isArray(key)) {
			//view / custom component
			if(!value || typeof value === 'function') {
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
					const protoIdx = this.#children.findIndex(child=>{
						if (child instanceof SourceNode) return child.#nodeName === key.name;
						return false;
					});
					let childCSS;
					const getCSS = v => childCSS = v;
					if (protoIdx >= 0) {
						if (!key.base) key.base = [ this.#children[protoIdx] ];
						else           key.base.push(this.#children[protoIdx]);
						this.#children[protoIdx] = new SourceNode(
							this.#render, getCSS, value, key.base, key.name,
							selector, this.#viewName || this.className
						);
					} else {
						this.#children.push(new SourceNode(
							this.#render, getCSS, value, key.base, key.name,
							selector, this.#viewName || this.className
						));
					}
					if (childCSS) css.childs += childCSS;
				} else throw new Error('[JSVN] Child node in self-closing tag. Self-closing tag must not have children');
				return true;
			}
		}

		//ERROR
		return false;
	}

	#parseContent (css, content, selector, mainNode) {
		for (let [key, value] of content) {
			if (!this.#parsers(css, key, value, selector, mainNode)) {
				const keyType = typeof key;
				throw new Error(`[JSVN] Incorrect key (${keyType}) '${keyType === 'string' ? key : '*'}' of node '${this.className}'`);
			}
		}
	}
}