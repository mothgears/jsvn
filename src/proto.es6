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
