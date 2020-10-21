import $$ from './jsvn.es6';
import styleParsers from './styleParsers.mjs';
import symbols from './symbols.es6';

let classNamesIndex = 0;

class SourceNode {
	#render;

	#classId   = classNamesIndex++;
	#nodeName = null;
	#tagName   = 'div';
	#preset    = {};
	#params    = {};
	#inline    = {};
	#events    = {};
	#envMod    = null;

	#condition = null;
	#repeatFor = null;

	#classes  = [];
	#children = [];

	#viewName = '';

	get tagName   () { return this.#tagName;   }
	get className () { return (this.#viewName?(this.#viewName+'__'):'') + this.#nodeName; }

	constructor(render, cssReceiver, content, base, name = null, parentSelector = null, viewName = null) {
		this.#render   = render;
		this.#viewName = viewName;

		if (base) {
			const baseNodes = this.#parseBase(base);
			for (const baseNode of baseNodes) {
				this.#preset = {...this.#preset, ...baseNode.#preset};
				this.#params = {...this.#params, ...baseNode.#params};
				this.#inline = {...this.#inline, ...baseNode.#inline};
				this.#events = {...this.#events, ...baseNode.#events};
				if (baseNode.#condition) this.#condition = baseNode.#condition;
				if (baseNode.#repeatFor) this.#repeatFor = baseNode.#repeatFor;

				if (this.#children) this.#children = baseNode.#children; //Add fusion
			}
		}

		this.#nodeName = name || 'jsvn-' + this.#classId;
		let selector = '.' + this.className;
		if (parentSelector) selector = parentSelector + '>' + selector;


		let css = { styles: '', childs: '' };

		this.#parseContent(css, content, selector, !parentSelector);

		css = selector + ' {\n'+css.styles+'}\n\n' + css.childs;
		if (cssReceiver && typeof cssReceiver === 'function') {
			cssReceiver(css, this.className);
		}
	}

	#renderOnce(...envs) {
		if (this.#envMod) {
			if (this.#envMod.extend) {
				const props = {};
				for (const [key, value] of Object.entries(this.#envMod.props)) {
					props[key] = value(...envs);
				}
				envs[0] = { ...envs[0], ...this.#envMod.value, ...props };
			} else {
				if (typeof this.#envMod.value === 'function') envs[0] = this.#envMod.value(...envs);
				else envs[0] = this.#envMod.value;
			}
		}

		let renderedChildren = null;
		if (this.#children) {
			renderedChildren = [];
			for (const child of this.#children) {
				let rendered = child;

				if      (child instanceof SourceNode) rendered = child.render(...envs);
				else if (typeof child === 'function') rendered = child(...envs);
				else if (Array.isArray(child))        {
					const [component, props] = child;
					if      (component instanceof SourceNode) rendered = component.render(props(...envs));
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
		} else return this.#renderOnce(...envs);
	}

	#parsers(css, key, value, selector, mainNode) {
		//sys param
		if (typeof key === 'string') {
			if (key.startsWith('__')) {
				if (mainNode) throw new Error(`[JSVN] Node "${this.className}" has a render operator or env modifier, main node must not have "__IF", "__EACH" or '__env' properties.`);
				key = key.slice(2);
				if (typeof value === 'function') {
					if (key === 'IF')   {
						this.#condition = value;
						return true;
					}
					if (key === 'EACH') {
						this.#repeatFor = value;
						return true;
					}
				}
				if (key === 'env') {
					if (this.#envMod) throw new Error('[JSVN] Mixed use of __env and environment parameters (_*) is not allowed.');
					this.#envMod = { extend: false, value };
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
				if (!this.#envMod) this.#envMod = { extend: true, value: {}, props: {} };
				else if (!this.#envMod.extend) throw new Error('[JSVN] Mixed use of __env and environment parameters (_*) is not allowed.');

				if (typeof value === 'function') {
					this.#envMod.props[key.slice(1)] = value;
					return true;
				} else {
					this.#envMod.value[key.slice(1)] = value;
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
			if (key.type === symbols.EVENT) {
				this.#events[key.event] = value;
				return true;
			}
			if (key.type === symbols.SOURCE) { //sourceNode
				if (this.#children) {
					const protoIdx = key.name && this.#children.findIndex(child=>child.className === key.name);
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

	#parseBase(base) {
		base.reverse();

		const baseViews = [];
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
				let baseView = baseItem;
				//if ((baseItem||{}).source) baseView = baseItem.source;

				if (baseView && baseView instanceof SourceNode) {
					if (baseViews.length > 1) throw new Error('[JSVN] Multiple inheritance is not allowed.');
					if (baseView.tagName) this.#tagName = baseView.tagName;
					this.#classes.push(baseView.className);
					baseViews.push(baseView);
				} else throw new Error('[JSVN] Node base must be string or View.');
			}
		}

		return baseViews;
	}
}

export class View extends SourceNode {
	constructor(...params) {
		if (params.length < 1) throw new Error('[JSVN] View must have at least one argument');
		let content = params.pop();
		let name = null;
		let base = null;
		for (const param of params) {
			if (typeof param === 'string') name = param;
			else if (Array.isArray(param)) base = param;
		}

		let render = new.target.render;
		let styles = new.target.styles;

		if (!Array.isArray(content)) content = $$.arrayFrom(content);

		super(
			render,
			styles,
			content,
			base,
			name,
		);
	}
}