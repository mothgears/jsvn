export default class Pointer {
	static #types = {
		CLASS_IMPORT : Symbol(),
		BASE_NODE    : Symbol()
	};
	static get types() { return this.#types; }

	#type;
	#value;

	get type()  { return this.#type; }
	get value() { return this.#value; }

	constructor(value, type) {
		if (!value || typeof value !== 'string') throw new Error('[JSVN] Pointer incorrect value. Must be not empty string.');
		this.#value = value;

		if (Object.values(Pointer.#types).includes(type)) this.#type = type;
		else throw new Error('[JSVN] Pointer incorrect type. Must be one of "Pointer.types".');
	}
}