import $$ from './react-jsvn.js';
import UIBase from './UIBase.js';

const Input = new $$.View(['/input', UIBase], { //Prefix '/' indicates a self-closing tag
	width   : '90px',
	padding : '0 15px',
});

export default Input;