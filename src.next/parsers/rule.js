import styleParser from "./style.js";

const parser = {
	test  : (key, value, keyString) => keyString && ['.',':'].includes(key[0]),
	parse : (key, value, parentData, rootData) => {
		const isPseudo = key[0] === ':';
		key = key.slice(1);

		return parseBody([parser, styleParser], key, value, parentData, rootData);
	},
};