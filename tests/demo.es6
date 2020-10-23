const { useMemo } = React;

//React
$$.View = class extends $$.View {
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

const RootComponent = () => {
	const view = useMemo(()=>new $$.View({
		width  : '128px',
		height : '64px',

		background: '#090'
	}), []);

	return view.render();
};

const root = document.getElementById("root");
console.log('root');

ReactDOM.render(React.createElement(RootComponent, {}), root);