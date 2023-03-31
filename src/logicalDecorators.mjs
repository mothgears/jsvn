export const decoratorFOR = Symbol();

export class LogicalDecorator {
	static IF  = new LogicalDecorator('_IF');
	static FOR = new LogicalDecorator(decoratorFOR);

	#key;

	get key () { return this.#key; }

	constructor(key) {
		this.#key = key;
	}
}

export const IF   = ()=> LogicalDecorator.IF;
export const FOR  = ()=> LogicalDecorator.FOR;