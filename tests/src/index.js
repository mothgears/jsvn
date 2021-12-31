import React from 'react';
import ReactDOM from 'react-dom';
import MainComponent from './MainComponent.js';

ReactDOM.render(
	React.createElement(MainComponent, {}),
	document.getElementById('root'),
);