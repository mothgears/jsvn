import $$ from './react-jsvn.js';
import Input from './Input.js';
import Button from './Button.js';
import List from './ListComponent.js';

const { useMemo, useState } = React;

const RootComponent = () => {
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

			[$$`active-block`]: {
				display   : 'table',
				width     : '100%',
				marginTop : '20px',

				'.cell': {
					display: 'table-cell',
				},

				[$$`item-name-cnt `('.cell')]: {
					paddingLeft: '20px',

					[$$`item-name `(Input)]: {
						width: '520px',

						__bind: [it=>it.newName, it=>it.setNewName], //Bind variable to this input
					},
				},

				[$$('.cell')]: {
					width: '20px',
				},

				[$$('.cell')]: {
					paddingRight: '20px',

					//Include Button as view
					[$$(Button)]: it=>({ //Set model for this view
						action : it.addToList,
						label  : 'Add',
					}),
				},
			},

			[$$()]: {
				width     : '100%',
				padding   : '20px',
				boxSizing : 'border-box',

				//Include React Component
				[$$(List)]: it=>it,
			},
		},

		background: '#eee',
	}), []);
	return view.render({...ctrl, items, setItems, newName, setNewName});
};

ReactDOM.render(
	React.createElement(RootComponent, {}),
	document.getElementById("root")
);