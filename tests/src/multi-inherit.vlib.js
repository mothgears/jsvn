import $$, { View } from '../../src/index.mjs';

export const virtualView1 = new View(['<>span'], {
	background : '#906',
	color : '#0f0',
});

export const virtualView2 = new View(['<>div'], {
	width        : '160px',
	height       : '48px',
	borderRadius : '5px',

	':hover': {
		background : '#996',
	},
});

export const realView1 = new View({
	color : '#000',

	[$$`box`]: {
		$$: 'Multi inherit 1',
	},
});

export const realView2 = new View({
	':hover': {
		color : '#fff',
	},

	[$$`box`]: {
		$$: 'Multi inherit 2',
	},
});