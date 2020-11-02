import nameModificator from './nameModificator.js';

const toKebab = str=>str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

const classesPars = it=>{
	const nodes = it.key.split('>');
	let select = '';
	for (let node of nodes) {
		node = node.trim();
		if (node[0] === '.') node = node.slice(1);
		if (node !== '*') node = '.'+nameModificator(node);
		select += '>' + node;
	}
	return it.parentSelector + select;
};

const types = {
	'*' : classesPars,
	'.' : classesPars,
	':' : it=>it.parentSelector + it.key,
};

export default function styleNodeBodyParser (css, key, value, selector, viewName) {
	if (typeof key === 'string') {
		//child
		if(Object.keys(types).includes(key[0])) {
			css.childs += styleNodeParser(key, value, selector, viewName);
			if (key[0]==='.') {
				return key.split(' > ')[0].slice(1);
			} else {
				return true;
			}
		}

		//style
		if (typeof value === 'string') {
			css.styles += '\t' + toKebab(key) + ': ' + value + ';\n';
			return true;
		}
	}

	return false;
}

function styleNodeParser (key, content, parentSelector = null, viewName = null) {
	let selector;

	const type = types[key[0]];
	if (type) selector = type({key, content, parentSelector, viewName});
	else throw new Error('[JSVN] Unknown selector type.');

	const css = {
		styles: '',
		childs: '',
	};

	for (let [key, value] of Object.entries(content)) {
		if (!styleNodeBodyParser(css, key, value)) {
			const keyType = typeof key;
			throw new Error(`[JSVN] Incorrect key (${keyType}) '${keyType === 'string' ? key : '*'}' of node`);
		}
	}

	return [selector + ' {\n'+css.styles+'}\n\n' + css.childs];
}