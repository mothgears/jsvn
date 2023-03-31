import $$, { View } from './reimport.mjs';
//import $$, { View } from '../../lib';

export const Wrapper = new View({
	[$$()]: m=>`Wrapper "${m.text}"`,

	[$$()]: {
		padding: '10px',
		background: '#b9b',

		[$$(m=>m.child)]: ()=>{},
	},
});

export const LChildView = new View({
	background: '#9d9',

	[$$()]: 'LChild View',
});