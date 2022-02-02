import $$, { View }        from '../../index.mjs';
import render              from 'react-jsvn';
import React, { useState } from 'react';
import ReactDOM            from 'react-dom';

//Simple View
const MyView = new View({
	//CSS (static) styles
	background: '#eee',
	width: '200px',
	textAlign: 'center',

	//Inline (dynamic) style
	color: m=>m.myColor,

	//Child nodes
	//Node based on "<div></div>" tag (base by default)
	[$$`my-title`]: {
		//Text node (simplified notation)
		$: 'JSVN Example',
	},

	//Node based on "<input/>" tag
	[$$`my-input `('/input')]: {
		_bind: [m=>m.myText, m=>m.setMyText],
	},

	//Unnamed node based on "<div></div>" tag (base by default, equal to "[$$('<>div')]")
	[$$()]: {
		//Condition for rendering
		_IF: m=>m.myText,

		fontFamily: 'Tahoma, sans-serif',

		//Text node
		[$$()]: 'Hello ',

		//Unnamed node based on "<span></span>" tag
		[$$('<>span')]: {
			fontWeight : 'bold',

			//Text node with dynamic text
			$: m=>`${m.myText}!`,
		},
	},
});

//Simple React Component
const MyComponent = props => {
	const [ myText, setMyText ] = useState('world');

	return render(MyView, { ...props, myText, setMyText });
};

//Render to root
ReactDOM.render(
	React.createElement(MyComponent, {
		myColor : '#090',
	}),
	document.getElementById('root'),
);