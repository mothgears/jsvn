import $$, { View } from '../../src/index.mjs';
//import $$, { View } from '../../lib';

//View based on <div>
export const UIBase = new View({
	height       : '30px', //Style, will be added to css
	border       : '1px solid #666',
	borderRadius : '5px',
	boxSizing    : 'border-box',

	':focus': { //Local style
		outline: 'none',
	}
});

//View that extends UIBase and <button> tag
//The first base in the list overloads the next, etc.
//Bases can be View, class, tag (But Vue is only one)
export const Button = new View(['<>button', UIBase], {
	width : '60px',

	':hover': {
		background : '#9cf',
		color      : '#fff',
		cursor     : 'pointer',
	},

	$onclick: env=>env.action, //Event; 'env' in 'env.action' is environment (model/ctrl/props/state), 'action' - handler function.

	[$$()]: env=>env.label, //Text node
});

export const Input = new View(['/input', UIBase], { //Prefix '/' indicates a self-closing tag
	width   : '90px',
	padding : '0 15px',
});

export const OneLineTable = new View({
	display: 'table',

	'.cell': {
		display: 'table-cell',
	},
});

export const Table = new View({
	display: 'table',

	'.row': {
		display: 'table-row',

		'.cell': {
			display: 'table-cell',
		},
	},
});

///////////////////
/*export const baseUI = new UILibrary({
	[$$`UIElement`]: {
		height       : '30px', //Style, will be added to css
		border       : '1px solid #666',
		borderRadius : '5px',
		boxSizing    : 'border-box',

		':focus': { //Local style
			outline: 'none',
		}
	},

	[$$`Button `('.UIElement', '<>button')]: {
		width : '60px',

		':hover': {
			background : '#9cf',
			color      : '#fff',
			cursor     : 'pointer',
		},

		$onclick: env=>env.action, //Event; 'env' in 'env.action' is environment (model/ctrl/props/state), 'action' - handler function.

		[$$()]: env=>env.label, //Text node
	},

	[$$`Input `('.UIElement', '/input')]: {
		width   : '90px',
		padding : '0 15px',
	}
})*/