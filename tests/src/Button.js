import $$ from './react-jsvn.js';
import UIBase from './UIBase.js';

//View that extends UIBase and <button> tag
const Button = new $$.View(['<>button', UIBase], {
	width : '60px',

	__onclick : it=>it.action, //Event

	[$$.text] : it=>it.label, //Text node, 'it' in 'it.label' is model

	':hover': {
		background : '#9cf',
		color      : '#fff',
		cursor     : 'pointer',
	}
});

export default Button;