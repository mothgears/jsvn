import $$, {View} from '../../src/index.mjs'
import {Button, Table} from './base.vlib.js';

export default new View([Table], {
	width: '100%',

	[$$`lolcus`]: {
		_FOR: ()=>({ each:i=>i+1, to:3 }),

		$$: i=>` =[${i}]= `,
	},

	[$$`item `('row')]: {
		_FOR: m=>({ i: 1, each: (v, scope)=>[v, scope.i++], of: m.items }),

		height  : '30px',
		width   : '100%',

		'.cell': {
			paddingBottom : '5px',
			paddingTop    : '5px',
			borderBottom  : '1px solid #999',
		},

		//Child node based on local style '.cell'
		[$$`item-name `('cell')]: {
			[$$()]: ([item, idx])=>idx + '. ' + item,
		},

		[$$`item-opts `('cell')]: {
			width: '30px',

			//Child node that extends Button view
			[$$(Button)]: {
				$$label  : 'X',
				$$action : ([item], m)=>[m.removeItem, item],

				width: '30px',
			},
		},
	}
});