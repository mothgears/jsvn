import $$ from './react-jsvn.js';
import List from './ListComponent.js';
import {Input, Button, OneLineTable} from './base.vlib.js';

const { useMemo, useState } = React;

const globCham = $$.import('glob-cham');

const MainComponent = () => {
	const [items, setItems]     = useState(['alpha', 'gamma']);
	const [newName, setNewName] = useState('');

	//Memorizes controller
	const ctrl = useMemo(()=>({
		addToList() {
			if (!newName) alert(`Empty value!`);
			else if (!items.some(item=>item === newName)) {
				setItems([...items, newName]);
				setNewName('');
			}
			else alert(`Item ${newName} already exist!`);
		},
		removeItem(item) {
			setItems(items.filter(i => i !== item));
		}
	}), [newName, items]);

	const view = useMemo(()=>new $$.View({
		width: '100%',

		[$$`form`]:{
			position   : 'absolute',
			left       : '50%',
			marginLeft : '-320px',
			width      : '640px',
			background : '#eee',
			marginTop  : '20px',

			[$$`active-block `(OneLineTable)]: {
				display   : 'table',
				width     : '100%',
				marginTop : '20px',

				'.cell' : { //Extends '.cell' subclass from 'OneLineTable'
					background: '#ccc',
				},

				[$$`item-name-cnt `('cell')]: { //Node based on 'cell' subclass from 'OneLineTable' extended with this local 'cell' subclass
					paddingLeft: '20px',

					[$$`item-name `(Input)]: {
						width: '520px',

						__bind: [it=>it.newName, it=>it.setNewName], //Bind variable to this input
					},
				},

				[$$('cell')]: {
					width: '20px',
				},

				[$$('cell')]: {
					paddingRight: '20px',

					//Include Button as view
					[$$(Button)]: it=>({ //Set model for this view
						action : it.addToList,
						label  : 'Add',
					}),
				},
			},

			[$$`list-cnt`]: {
				width     : '100%',
				padding   : '20px',
				boxSizing : 'border-box',

				//Include React Component
				[$$(List)]: it=>it,
			},

			'.sub-cham': {
				background: '#900',
			},

			/*[$$`chameleo`]: {
				__mods: [it=>it.varClass],

				width  : '48px',
				height : '48px',

				[$$`--selected `(it=>false)]: {
					background: '#099',
				},

				$: 'Text',
			},*/

			[$$`item`]:{
				__EACH: it=>it.objectList,

				$: (key, value) => `item [${key}:${value}]`,
			},
		},

		/*'* >node-b': {
			height: '100px',
		},

		[$$`node-a1 `('all-nodes')]: {
			[$$`node-b`]: {
				[$$`sub`]: {
					[$$.text]: 'SUB!',
				},
				[$$.text]: 'Node-B1',
			},
		},

		[$$`node-a2 `('all-nodes')]: {
			[$$`node-b`]: {
				[$$.text]: 'Node-B2',
			},
		},*/
	}), []);
	return view.render({...ctrl, items, setItems, newName, setNewName, varClass: globCham, globalVar:'#R', countValue:5, objectList: { a: 'alpha', b:'beta' }});
};

export default MainComponent;