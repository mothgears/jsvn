import $$ from './$$.js';
import SourceNode from './SourceNode.js';

export class View extends SourceNode {
	#css;
	#dependencies;

	get css          () { return this.#css; }
	get dependencies () { return this.#dependencies; }

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

		let css;
		let dependencies = new Set();

		super(
			dependencies,
			val => css = val,
			content,
			base,
			name,
		);

		this.#css          = css;
		this.#dependencies = dependencies;
	}
}