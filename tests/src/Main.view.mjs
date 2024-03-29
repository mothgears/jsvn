import $$, { requireGlobal, View, IF, FOR } from './reimport.mjs';
import { Button, Input, OneLineTable } from './base.vlib.mjs';
import List from './List.view.mjs';
import iStand from './inheritance.vlib.mjs';
import { ExtComponent, extRender } from './ext.mjs';
import { LChildView, Wrapper } from './composition.vlib.mjs';
import { MNBElement } from './modificator-name-bug.vlib.mjs';
import { realView1, realView2, virtualView1, virtualView2 } from './multi-inherit.vlib.mjs';

const globCham = requireGlobal('glob-cham');

const ElementC = new View({
	$$: 'LD Element-C (View)',
});

const ElementD = new View({
	$$: 'LD Element-D (View)',
});

const ElementY = new View({
	$$: m=>`LD Element-Y (View) "${m}"`,
});

const ElementZ = new View({
	$$: m=>`LD Element-Z (View) "${m.text}"`,
});

const ElementN = new View({
	$$: m=>`LD Element-N #${m.i} (View) "${m.label}"`,
});

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
			text: 'Work!',
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

			$$: item=>item || 'NULL',
		},
	},

	[$$`name-bug`]: {
		[$$(MNBElement)]: ()=>{},
	},

	[$$`sub-element`]: {
		background: '#f90',
		width: '64px',
		height: '64px',
		padding: '3px',

		'.sub-1': {
			background: '#309',
			width: '48px',
			height: '48px',
			padding: '3px',
		},

		'/':['sub-1'],
		[$$`sub-2`]: {
			background: '#930',
			width: '32px',
			height: '32px',
			padding: '3px',

			$$: 'sub-2',
		},
	},

	[$$`multi-inherit`]: {
		//[$$`error `(realView2, realView1)]: {},

		[$$`correct-1 `(virtualView2, virtualView1)]: {
			$$: 'virtualView2, virtualView1',
		},
		[$$`correct-2 `(virtualView1, realView1)]: {},
		[$$`correct-3 `(virtualView2, realView2)]: {
			background: '#ccc',
		},
		[$$`correct-4 `(virtualView2, virtualView1, realView2)]: {},
	},

	[$$`logical-decorators`]: {
		[$$(IF)]: m=>m.showElementA,
		[$$`element-a`]: {
			$$: 'LD Element A'
		},

		[$$(IF)]: m=>m.showElementB,
		[$$`element-b`]: { $$: 'LD Element B' },

		[$$(IF)]: m=>m.showElementC,
		[$$(ElementC)]: null,

		[$$(IF)]: m=>m.showElementD,
		[$$(ElementD)]: null,

		[$$(FOR)]: m=>m.decArr,
		[$$`element-x`]: {
			$$: m=>`LD Element X: "${m}"`
		},

		[$$(FOR)]: m=>m.decArr,
		[$$(ElementY)]: null,

		[$$(FOR)]: m=>m.decArrZ,
		[$$(IF)]: m=>m.showElementZ,
		[$$(ElementZ)]: null,

		[$$(FOR)]: { of: m=>m.decArr, as: (label, i)=>({ label, i }) },
		[$$(ElementN)]: null,

		[$$(FOR)]: { of: m=>m.decArr, as: (label, i)=>({ label, i }) },
		[$$()]: {
			'--end': {
				_ON: (item, m)=>item.i === m.decArr.length - 1,

				color: '#060',
			},

			$$: m=>`LD Element #${m.i} N: "${m.label}"`
		},
	},
})