import $$, { View } from '../../src';
//import $$, { View } from '../../lib';
import renderToDOM from './dom-jsvn';
import { reactRender } from './react-jsvn';
import MainComponent from './MainComponent.js';

const MainView = new View({
	background : '#eee',
	width      : '640px',
	height     : '480px',
	textAlign  : 'center',

	[$$()]: 'Hello World!',
	[$$('/br')]: {},
	[$$()]: {
		[$$([MainComponent, reactRender])]: ()=>{},
	},
});

renderToDOM('root', MainView, {});