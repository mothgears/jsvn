import { NODE_MODIFIER, RULE_MODIFIER } from './nameModifiers';
import VirtualNode from './VirtualNode';

const toKebab = str=>str.replace(/([A-Z])/g, '-$1').toLowerCase();

const Types = {
	NODE     : Symbol('NODE'),
	CLASS    : Symbol('CLASS'),
	MODIFIER : Symbol('MODIFIER'),
	PSEUDO   : Symbol('PSEUDO'),
	//PRECEPT  : Symbol('PRECEPT'),
	SELECTOR : Symbol('SELECTOR'),
};

export default function styleNodeBodyParser (css, key, value, selector, viewName, parentName, parentType = Types.NODE) {
	if (typeof key === 'string') {
		//style
		if (typeof value === 'string') {
			const rx = /^[a-zA-Z]+$/;
			if (!rx.test(key)) {
				throw new Error(`[JSVN] The css property name "${key}" is incorrect.`);
			}

			css.styles += `\t${toKebab(key)}: ${value};\n`;
			return { style:true };
		}

		let thisNodeType = null;
		if      (key[0] === '.')       thisNodeType = Types.CLASS;
		else if (key.startsWith('--')) thisNodeType = Types.MODIFIER;
		else if (key[0] === ':')       thisNodeType = Types.PSEUDO;
		//else if (key[0] === '>')       thisNodeType = Types.PRECEPT;
		else if (key[0] === '&') {
			thisNodeType = Types.SELECTOR;
			console.warn(`JSVN "${viewName}" [${parentName} / ${key}] Warning! Uncontrolled selectors (started with "&") are an undocumented option and are not recommended for use.`);
		}

		if (parentType === Types.SELECTOR && thisNodeType && thisNodeType !== Types.SELECTOR) {
			throw new Error(`JSVN "${viewName}" [${parentName} / ${key}] A selector can only contain another selector or static style.`);
		}
		if (parentType !== Types.NODE) {
			if (thisNodeType === Types.MODIFIER) {
				throw new Error(`JSVN "${viewName}" [${parentName} / ${key}] The modifier can only be a child of a real node.`);
			}
			/*if (thisNodeType === Types.CLASS) {
				throw new Error(`JSVN "${viewName}" [${parentName} / ${key}] The virtual node can only be a child of a real node.`);
			}*/
		}

		/*if (parentType !== Types.CLASS && thisNodeType === Types.PRECEPT) {
			throw new Error(`JSVN "${viewName}" [${parentName} / ${key}] The premod-rule can only be a child of virtual node.`);
		}*/

		//is override?
		let override = false;
		if (thisNodeType === Types.CLASS && key.endsWith(' >>')) {
			if (parentType === Types.CLASS) {
				throw new Error(`JSVN "${viewName}" [${parentName} / ${key}] The overriding-rule can only be a child of real node.`);
			}

			key = key.slice(0, -3);
			override = true;
		}

		if (thisNodeType) {
			//RegExp check
			if (thisNodeType !== Types.SELECTOR) {
				const classNameRx = /^[a-zA-Z][_a-zA-Z0-9-]+$/;
				const pseudoSelectorRx = /^(::?([_a-zA-Z0-9-]+|not\(::?[_a-zA-Z0-9-]+\)))+$/;
				if (
					//thisNodeType === Types.PRECEPT  && !rx.test(key.slice(1)) ||
					thisNodeType === Types.CLASS    && !classNameRx.test(key.slice(1)) ||
					thisNodeType === Types.MODIFIER && !classNameRx.test(key.slice(2)) ||
					thisNodeType === Types.PSEUDO   && !pseudoSelectorRx.test(key)
				) {
					throw new Error(`[JSVN] The rule name "${key}" is incorrect.`);
				}
			}

			const { child, result, asVirtualNode } = styleNodeParser(key, value, selector, viewName, thisNodeType);
			css.childs += child;

			return {
				parser: result,
				override,
				asVirtualNode,
			};
		}
	}

	return {};
}

function styleNodeParser (key, content, parentSelector = null, viewName = null, thisNodeType = null) {
	let selector;
	if      (thisNodeType === Types.CLASS) selector = parentSelector + '>.' + RULE_MODIFIER + key.slice(1);
	//if      (thisNodeType === Types.PRECEPT) selector = parentSelector + '>.' + RULE_MODIFIER + key.slice(1);
	else if (thisNodeType === Types.MODIFIER || thisNodeType === Types.PSEUDO) selector = parentSelector + key;
	else if (thisNodeType === Types.SELECTOR) selector = parentSelector + key.slice(1).replace(/%/g, '.'+NODE_MODIFIER);

	const css = {
		styles: '',
		childs: '',
	};

	const virtualNode = thisNodeType === Types.CLASS && new VirtualNode();

	let contentEntries;
	let modCondition;
	if (Array.isArray(content)) contentEntries = content;
	else contentEntries = Object.entries(content);
	for (let [childName, value] of contentEntries) {
		if (childName === '__ON' && typeof value === 'function') {
			if (thisNodeType === Types.MODIFIER) modCondition = value;
			else throw new Error('[JSVN] The "__ON" operator can only be in a modifier node.');
		} else {
			const { parser, style, asVirtualNode } = styleNodeBodyParser(css, childName, value, selector, viewName, key, thisNodeType);
			if (parser) {
				if (virtualNode && typeof parser === 'string') {
					virtualNode._addNode(parser, asVirtualNode);
				}
			} else if (!style) {
				const childType = typeof childName;
				throw new Error(`[JSVN] Incorrect key (${childType}) '${childType === 'string' ? childName : '*'}' in node "${key}" (${parentSelector}) in view "${viewName}".`);
			}
		}
	}

	return {
		child         : selector + ' {\n'+css.styles+'}\n\n' + css.childs,
		result        : modCondition || (thisNodeType === Types.CLASS && key.slice(1)) || true,
		asVirtualNode : virtualNode,
	};
}