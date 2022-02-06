const generateExp = methods => target => {
	const exp = {};
	for (const [name, method] of Object.entries(methods)) exp[name] = (...args) => method(target, ...args);
	return exp;
}

export const cutByIndex  = (arr, index) => index >= 0 ? arr.splice(index, 1)[0] : null;
export const cutByFilter = (arr, filter) => cutByIndex(arr, arr.findIndex(filter));

export default generateExp({cutByIndex, cutByFilter});
