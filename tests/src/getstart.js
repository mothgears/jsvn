import $$, { View } from '../../src';
//import $$, { View } from '../../lib';
//const { useState } = React;
import render       from 'react-jsvn';

//import render              from 'react-jsvn';
import React, { useState } from 'react';
import ReactDOM            from 'react-dom';

//Simple View
const MyView = new View({
	//CSS (static) Styles
	background : '#eee',
	width      : '200px',
	textAlign  : 'center',

	//Child nodes
	[$$('/input')]: { //Node base on "<input/>" tag
		_bind: [env=>env.myText, env=>env.setMyText],
	},

	[$$()]: { //Node based on "<div></div>" tag (base by default, equal to "[$$('<>div')]")
		_IF: env=>env.myText,               //Condition for rendering

		[$$()]: 'Hello ',                   //Text node

		[$$('<>span')]: {                   //Node based on "<span></span>" tag

			color      : env=>env.myColor,  //Inline (dynamic) style
			fontWeight : 'bold',            //CSS (static) style

			[$$()]: env=>`${env.myText}!`, //Text node with dynamic text
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