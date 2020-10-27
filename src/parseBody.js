import nodeTypes from "./nodeTypes.js";

export default function parseBody(parsers, key, value, rootData, parentData) {
	const cssRule = { styles: '' };
	rootData.cssList.push(cssRule);

	//parse class selector
	if (!isPseudo) {
		const localSelector = '.'+(viewName?`${viewName}__`:'') + key;
		cssRule.nodeName = localSelector.slice(1);
		if ((parentData||{}).selector) cssRule.selector = parentData.selector + '>' + localSelector;
		else                cssRule.selector = localSelector;

	} else {
		cssRule.nodeName = localSelector;
		cssRule.selector = parentData.selector + localSelector;
	}

	const thisData = { subclasses: [] };
	for (let [key, value] of content) {
		const keyString   = typeof key   === 'string';
		const valueString = typeof value === 'string';

		let result = null;
		for (let {test, parse} of parsers) {
			if (test(key, value, keyString, valueString)) result = parse(key, value);
		}

		if (!result) {
			const keyType = typeof key;
			throw new Error(`[JSVN] Incorrect key (${keyType}) "${keyType === 'string' ? key : '*'}" of node.`);
		}
		/*switch (result.type) {
			case nodeTypes.STYLE : cssRule.styles += result.value; break;
			case nodeTypes.RULE  : thisData.subclasses.push(result.value); break;
		}*/
	}
}