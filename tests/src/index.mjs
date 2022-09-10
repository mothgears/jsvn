import React from 'react';
import { createRoot } from 'react-dom/client';
import MainComponent from './MainComponent.mjs';

const root = createRoot(document.getElementById('root'));
root.render(React.createElement(MainComponent, {}),);