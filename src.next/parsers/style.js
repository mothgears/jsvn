const toKebab = str=>str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

export default {
	test  : (key, value, keyString, valueString) => keyString && valueString,
	parse : (key, value) => {
		return '\t' + toKebab(key) + ': ' + value + ';\n';
	}
};