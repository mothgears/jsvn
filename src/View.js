import $$ from './$$.js';
import SourceNode from './SourceNode.js';

export class View extends SourceNode {
	static get decorator () { return null; }

	#render;

	constructor(...params) {
		let content = null,
			name    = null,
			base    = null;

		for (const param of params) {
			if (typeof param === 'string') name = param;
			else if (Array.isArray(param)) base = param;
			else content = param;
		}

		if (!content) throw new Error('[JSVN] The View must have at least an argument with jsvn-content.');
		content = $$.arrayFrom(content);

		if (!new.target.render || !new.target.styles) throw new Error('[JSVN] The View inheritor must have static "render" and "styles" methods.');

		super(
			new.target.styles,
			content,
			base,
			name,
		);

		this.#render = new.target.render;
	}

	render(...envs) {
		return super.render(this.#render, ...envs);
	}
}