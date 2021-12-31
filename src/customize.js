export const CUSTOMIZATOR_KEY = Symbol();
export default (value, options)=>({
	isCustomized: CUSTOMIZATOR_KEY,
	value,
	options,
});