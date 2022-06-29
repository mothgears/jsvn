import $$, {requireGlobal, View} from '../../src/index.mjs';
import {Button, Input, OneLineTable} from './base.vlib';
import List from './List.view';
import iStand from './inheritance.vlib';
import { ExtComponent, extRender } from './ext';
import { LChildView, Wrapper } from './composition.vlib';
import { MNBElement } from './modificator-name-bug.view';

const globCham = requireGlobal('glob-cham');

export default new View({
	width: '100%',

	[$$`form`]: {
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

			//Virtual node
			'.cell' : { //Extends 'cell' subclass from 'OneLineTable'
				background: '#ccc',
			},

			//Real node
			[$$`item-name-cnt `('cell')]: { //Node based on 'cell' subclass from 'OneLineTable' extended with this local 'cell' subclass
				paddingLeft: '20px',

				[$$`item-name `(Input)]: {
					width: '520px',

					_bind: [env=>env.newName, env=>env.setNewName], //Bind variable to this input
				},
			},

			[$$('cell')]: {
				width: '20px',
			},

			[$$('cell')]: {
				paddingRight: '20px',

				//Include Button as view
				[$$(Button)]: env=>({ //Set model for this view
					action : env.addToList,
					label  : 'Add',
				}),
			},
		},

		[$$`list-cnt`]: {
			width     : '100%',
			padding   : '20px',
			boxSizing : 'border-box',

			[$$(List)]: env=>env,

			//MyComponent
			[$$([ExtComponent, extRender])]: ()=>({name: 'Developer'}),
		},

		'.sub-cham': {
			background: '#900',
		},

		[$$`chameleon `(globCham)]: {
			width      : '48px',
			height     : '48px',
			//background : '#999',

			'--selected': {
				_ON: env=>env.selectChameleon,

				background: '#099',

				':hover': {
					background: '#f69',
				},
			},

			$onclick : env=>()=>env.setSelectChameleon(!env.selectChameleon),
			[$$()]   : 'Text',
		},

		[$$`item`]:{
			_EACH: m=>m.objectList,

			[$$()]: ({key, value}) => `item [${key}:${value}]`,
		},

		[$$`br-line`]: {
			width: '100%',
			height: '2px',
			background: '#ccc',
		},

		[$$`item-2`]:{
			_FOR: m=>Object.entries(m.objectList).reverse(),

			[$$()]: ([k, v]) => `item [${k}:${v}]`,
		},

		[$$`htmlBlock`]: {
			_html: 'html<br>code',
		},

		[$$(iStand)]: it=>it,

		[$$(Wrapper)]: ()=>({
			child: LChildView,
		}),
	},

	'.all-nodes': {
		width: '128px',

		'.node-b': {
			background: '#83b1d0',
		},
	},

	[$$`node-a1 `('all-nodes')]: {
		[$$('node-b')]: {
			[$$`sub`]: {
				[$$()]: 'SUB!',
			},
			[$$()]: 'Node-B1',
		},
	},

	[$$`node-a2`]: {
		[$$`node-b`]: {
			[$$()]: 'Node-B2',
		},
	},

	'.node-with-mods-bg': {
		background: '#069',
	},

	'.local-mod': {
		background: '#060',
	},

	[$$`node-with-mods `('node-with-mods-bg', env => env.items && env.items.length > 2 && 'local-mod')]: {
		width: '64px',
		height: '64px',
	},

	[$$`iterator-test`]: {
		[$$()]: 'IteratorTest: ',

		[$$('<>span')]: {
			_EACH: env => state => {
				if (typeof state.index === 'undefined') state.index = 0;
				else state.index++;
				let item = env.demoCollection[state.index];
				item = state.index < env.demoCollection.length ? [ item ] : false;
				return item;
			},

			$: item=>item || 'NULL',
		},
	},

	[$$`name-bug`]: {
		[$$(MNBElement)]: ()=>{},
	},
})