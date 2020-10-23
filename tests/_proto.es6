/*static render (tag, classes, params, style, children) {
	let html = '<' + tag;

	if (classes.length > 0) html += ' class="' + classes.join(' ') + '"';
	for (let [prop, value] of Object.entries(params)) html += ` ${prop}="${value}"`;

	const styles = Object.entries(style).reduce((r, [s, value]) => r + s + ': ' + value + '; ', '');
	if (styles) html += ` styles="${styles}"`;

	if (children) {
		if (Array.isArray(children)) {
			html += '>';
			html = children.reduce((html, child) => html + child, html + '>');
		}
		html += `</${tag}>`;
	} else html += '/>';

	return html;
}

static styles (css, className) {
	if (document.head && !document.querySelector(`style[data-view="${className}"]`)) {
		document.head.insertAdjacentHTML('beforeend', `<style data-view="${className}">${css}</style>`);
	}
}*/

/*
	#fillWith (node) {
		this.#preset = { ...node.#preset, ...this.#preset };
		this.#params = { ...node.#params, ...this.#params };
		this.#inline = { ...node.#inline, ...this.#inline };
		this.#events = { ...node.#events, ...this.#events };
		if (!this.#tagName)   this.#tagName   = node.#tagName;
		if (!this.#condition) this.#condition = node.#condition;
		if (!this.#repeatFor) this.#repeatFor = node.#repeatFor;

		if (this.#children) {
			const extendingChildren = this.#children;
			const newChildren = [];

			for (const child of node.#children) {
				const extendingChild = extendingChildren.find(c=>c.nodeName === child.#nodeName);



				/*let childCSS;
				const getCSS = v => childCSS = v;*/
/*if (protoIdx >= 0) {
	if (!key.base) key.base = [ this.#children[protoIdx] ];
	else           key.base.push(this.#children[protoIdx]);
	this.#children[protoIdx] = new SourceNode(
		this.#render, getCSS, value, key.base, key.name,
		selector, this.#viewName || this.className
	);
}*/ /*else {
					this.#children.push(new SourceNode(
						this.#render, getCSS, value, key.base, key.name,
						selector, this.#viewName || this.className
					));
				}*/
/*if (childCSS) css.childs += childCSS;
newChildren.push(extendingChild);
}
this.#children = newChildren;
}
};
* */

/*deepClone () {
	const clone = new SourceNode();
	clone.#render    = this.#render;
	clone.#classId   = this.#classId;
	clone.#nodeName  = this.#nodeName;
	clone.#preset    = { ...this.#preset };
	clone.#params    = { ...this.#params };
	clone.#inline    = { ...this.#inline };
	clone.#events    = { ...this.#events };
	clone.#tagName   = this.#tagName;
	clone.#condition = this.#condition;
	clone.#repeatFor = this.#repeatFor;
	clone.#viewName  = this.#viewName;
	clone.#classes   = this.classes;
	clone.#envMod    = this.#envMod; //?

	if (this.#children) {
		clone.#children = [];
		for (const child of this.#children) {
			clone.#children.push(child.deepClone());
		}
	} else {
		clone.#children = null;
	}

	return clone;
}*/