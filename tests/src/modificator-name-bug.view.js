import { View } from '../../src/index.mjs';

const MNBBaseWithMod = new View('mnb-base', {
	width: '32px',
	height: '32px',
	background: '#099',

	'--mod': {
		_ON: m=>m.status,
		border: 'solid 2px #f00',
	},
});

export const MNBElement = new View('mnb-element', [MNBBaseWithMod], {
	$$status: ()=>true,
});