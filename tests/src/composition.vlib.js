import $$, { View } from '../../src/index.js';
//import $$, { View } from '../../lib';

export const Wrapper = new View({
	[$$()]: 'Wrapper',

	[$$()]: {
		padding: '10px',
		background: '#b9b',

		[$$(env=>env.child)]: ()=>{},
	},
});

export const LChildView = new View({
	background: '#9d9',

	[$$()]: 'LChild View',
});