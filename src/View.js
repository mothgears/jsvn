import $$ from './$$.js';
import SourceNode from './SourceNode.js';

export class View extends SourceNode {
	constructor(...params) {
		if (params.length < 1) throw new Error('[JSVN] View must have at least one argument');
		let content = params.pop();
		let name = null;
		let base = null;
		for (const param of params) {
			if (typeof param === 'string') name = param;
			else if (Array.isArray(param)) base = param;
		}

		let render = new.target.render;
		let styles = new.target.styles;

		if (!render || !styles) throw new Error('[JSVN] Inheritor of View must have static render and style methods.');

		if (!Array.isArray(content)) content = $$.arrayFrom(content);

		super(
			render,
			styles,
			content,
			base,
			name,
		);
	}
}