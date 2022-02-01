import $$, { View } from '../../index.mjs';
//import $$, { View } from '../../lib';

const iSuper1 = new View({
	marginTop: '10px',
	border: '2px solid #333',

	'.block': {
		height: '32px',
	},

	'.base-rule': {
		borderLeft: '3px solid #900',
	},

	[$$`first-a `('block')]: {
		background: '#f09',

		[$$`mychild`]: {
			width: '100px',
			height: '20px',
			background: '#f90',

			[$$()]: '1 First-A',
		}
	},
	[$$`second-a `('block')] : { [$$()]: '2 Second' },
	[$$()]                   : { [$$()]: '2.5' },
	[$$`third-a `('block')]  : { [$$()]: '3 Third' },
});

const iExtender1 = new View([iSuper1], {
	[$$`fourth-b`] : { [$$()]: '4 Fourth' },
	[$$`fifth-b`]  : { [$$()]: '5 Fifth' },
});

const iExtender2 = new View([iSuper1], {
	background: '#9cf',

	'.block >>': {
		borderRight: '10px solid #090',
	},

	[$$`zero`]: {
		[$$()]: '0 zero',
	},
	[$$`first-a >>`]: {
		fontWeight: 'bold',

		[$$`mychild >>`]: {
			width: '250px',
		}
	},
	[$$`second-a >>`]: { [$$()]: ' 2 Second B' },
	[$$`end`]: {
		[$$()]: '0-0 end',
	},

	[$$('base-rule')]: { [$$()]: 'Base Rule!' },
});

const iSuperExtender = new View([iExtender2], {
	background: '#906',

	[$$`first-a >>`]: {
		color: '#090',
	},
});

export default new View({
	width      : '100%',
	background : '#eef',
	marginTop  : '10px',
	padding    : '15px',
	boxSizing  : 'border-box',

	[$$()]: 'iStand',

	[$$(iSuper1)]        : env=>env,
	[$$(iExtender1)]     : env=>env,
	[$$(iExtender2)]     : env=>env,
	[$$(iSuperExtender)] : env=>env,
});