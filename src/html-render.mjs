export const htmlRender = {
	lib: null,

	render (tag, classes, props, style, events, children, pureHTML, node) {
		//const activators = [];

		let tabShift = '';
		let parent = node.parent;
		while (parent) {
			tabShift += '\t';
			parent = parent.parent;
		}

		let result_html = (node.parent?'\n':'') + `${tabShift}<${tag} class="${classes.join(' ')}"`;

		const styles_str = Object.entries(style).map(([key, value])=>`${key}:${value};`).join(' ');
		if (styles_str) result_html += ` style="${styles_str}"`;

		for (const [prop, value] of Object.entries(props)) result_html += ` ${prop}="${value}"`;

		result_html += '>';

		if (pureHTML) result_html += pureHTML;

		if (children) {
			for (const child of children) {
				if (child?.JSVNContainer) {
					if (!child.renderEngine || child.renderEngine.lib === LIB_HTML) {
						throw new Error('Component with unknown render engine!');
					} else {
						//Custom component
						const { html/*, activate*/ } = child.renderEngine.convert(child.component, child.props);
						//if (activate) activators.push(activate);
						result_html += html;
					}
				} else {
					result_html += child;
				}
			}
		}

		if (pureHTML || children) {
			if (children?.length) result_html += '\n' + tabShift;
			result_html += `</${tag}>`;
		}

		return result_html;// + (node.parent?'\n':'');

		//events = Object.entries(events).reduce((arr, [k, v])=>{ arr['on' + k[0].toUpperCase() + k.slice(1)] = v; return arr;}, {});

		/*for (const activate of activators) {
			const domParent = ReactDOM.findDOMNode(reactElement);
			activate(domParent);
		}*/
	},
}

export default (view, ...envs) => {
	return view.render(htmlRender, ...envs);
}