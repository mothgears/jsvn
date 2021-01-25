import $$ from '../../src';

const iSuper1 = new $$.View('iSuper1', {
	marginTop: '10px',

	'.block': {
		height: '32px',
	},

	[$$`first-a `('block')]: {
		background: '#f09',

		[$$`mychild`]: {
			width: '50px',
			height: '20px',
			background: '#f90',

			$: '1 F',
		}
	},
	[$$`second-a `('block')]: { $: '2 Second' },
	[$$.el]: { $: '2.5' },
	[$$`third-a `('block')]: { $: '3 Third' },
});

const iExtender1 = new $$.View('iExtender1', [iSuper1], {
	[$$`fourth-b`]: { $: '4 Fourth' },
	[$$`fifth-b`]: { $: '5 Fifth' },
});

const iExtender2 = new $$.View('iExtender2', [iSuper1], {
	background: '#9cf',

	[$$`zero`]: {
		$: '0 zero',
	},
	[$$`first-a `()]: {
		fontWeight: 'bold',

		[$$`mychild `()]: {
			width: '250px',
		}
	},
	[$$`second-a `()]: { $: '2 Second B' },
	[$$`end`]: {
		$: '0-0 end',
	},
});

export default new $$.View('iStand', {
	width: '100%',
	background: '#eef',
	marginTop: '10px',
	padding: '15px',
	boxSizing: 'border-box',

	[$$.text]: 'iStand',

	[$$(iSuper1)]: it=>it,
	[$$(iExtender1)]: it=>it,
	[$$(iExtender2)]: it=>it,
});