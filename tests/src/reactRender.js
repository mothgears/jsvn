import createReactRender from 'react-jsvn/lib/createReactRender.js';

const reactRender = createReactRender(React);

export default (view, ...envs) => {
	return view.render(reactRender, ...envs);
}
