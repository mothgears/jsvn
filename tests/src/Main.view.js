import $$ from '../../src';
import {Button, Input, OneLineTable} from './base.vlib';
import List from './ListComponent';

export default new $$.View('Main', {
	width: '100%',

	'#form': {
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

		[$$`chameleo`]: {
			width  : '48px',
			height : '48px',

			'--selected': {
				__ON: ()=>true,

				background: '#099',

				':hover': {
					background: '#f69',
				},
			},

			$: 'Text',
		},

		[$$`item`]:{
			__EACH: it=>it.objectList,

			$: (key, value) => `item [${key}:${value}]`,
		},

		[$$`htmlBlock`]: {
			$$: 'html<br>code',
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
})