import $$ from './react-jsvn.js';

//View
const UIBase = new $$.View({
	height       : '30px', //Style, will be added to css
	border       : '1px solid #666',
	borderRadius : '5px',
	boxSizing    : 'border-box',

	':focus': { //Local style
		outline: 'none',
	}
});

export default UIBase;