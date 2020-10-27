export const decorate = $$ => {
	if ($$.View.decorator) throw new Error('react-jsvn/decorate : JSVN is already decorated.');

	$$.View = class extends $$.View {
		static get decorator () { return 'react'; }

		static render (tag, classes, params, style, events, children) {
			if (!children) children = [];
			events = Object.entries(events).reduce((arr, [k, v])=>{ arr['on' + k[0].toUpperCase() + k.slice(1)] = v; return arr;}, {});
			return React.createElement(tag, { className: classes.join(' '), style, ...events, ...params }, ...children);
		}

		static styles (css, className) {
			if (document.head && !document.querySelector(`style[data-view="${className}"]`)) {
				document.head.insertAdjacentHTML('beforeend', `<style data-view="${className}">${css}</style>`);
			}
		}
	};
	return $$;
};

export default decorate($$);