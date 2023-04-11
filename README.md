# JavaScript Views Notation
is a library for describing views using a combination of markup and styles

## Features
- Supports view inheritance
- Prevents style mixing between components and libraries, controls css-class dependencies
- Unifies html, css and js
- Unifies templates, allowing you to create templates using React, pure HTML or other renders
- Uses pure ES2020 without transpiles unlike JSX

## Documentation
https://jsvn.dev

## Example
```
import $$, { View } from 'jsvn';

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
        $$: 'JSVN Example',
    },

    //Node based on "<input/>" tag
    [$$`my-input `('/input')]: {
        _bind: [m=>m.myText, m=>m.setMyText],
    },

    [$$(IF)]: m=>m.myText, //Condition for rendering
    [$$()]: {//Unnamed node based on "<div></div>" tag (base by default, equal to "[$$('<>div')]")
        fontFamily: 'Tahoma, sans-serif',

        //Text node
        [$$()]: 'Hello ',

        //Unnamed node based on "<span></span>" tag
        [$$('<>span')]: {
            fontWeight : 'bold',

            //Text node with dynamic text
            $$: m=>`${m.myText}!`,
        },
    },
});
```