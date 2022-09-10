export const ExtComponent = {
	html: env=> `<div style="display: inline-block; background: #f80;">Hi ${env.name} Im Ext Component!</div>`,
}

export const extRender = {
	lib: 'ExtLib',

	convert(component, props) {
		return {
			html: component.html(props),
		};
	}
}