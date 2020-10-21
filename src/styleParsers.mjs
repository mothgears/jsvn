const toKebab = str=>str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

export default function styleNodeBodyParser (css, key, value, selector, viewName) {
	if (typeof key === 'string') {
		//child
		if(['.',' ','&',':'].includes(key[0])) {
			css.childs += styleNodeParser(key, value, selector, viewName);
			return true;
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
	if      (key[0] === '.') selector = parentSelector + '>.' + (viewName?`${viewName}__`:'') + key.slice(1);
	else if (key[0] === '&') selector = parentSelector + key.slice(1);
	else                     selector = parentSelector + key;

	const css = {
		styles: '',
		childs: '',
	};

	for (let [key, value] of Object.entries(content)) {
		if (!styleNodeBodyParser(css, key, value)) {
			const keyType = typeof key;
			throw new Error(`[JSVN ERROR] Incorrect key (${keyType}) '${keyType === 'string' ? key : '*'}' of node`);
		}
	}

	return selector + ' {\n'+css.styles+'}\n\n' + css.childs;
}