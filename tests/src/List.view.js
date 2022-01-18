import $$, {customize, View} from '../../src'
//import $$, { View } from '../../lib';
import {Button, Table} from './base.vlib.js';

export default new View([Table], {
	width   : '100%',

	[$$`item `('row')]: {
		_EACH: env=>customize(env.items, {env: item => [item]}), //Will repeat this node for each item in 'it.items' array

		height  : '30px',
		width   : '100%',

		'.cell >>': {
			paddingBottom : '5px',
			paddingTop    : '5px',
			borderBottom  : '1px solid #999',
		},

		//Child node based on local style '.cell'
		[$$`item-name `('cell')]: {
			[$$()]: item=>item,
		},

		[$$`item-opts `('cell')]: {
			width: '30px',

			//Child node that extends Button view
			[$$(Button)]: {
				width: '30px',

				_env: (item, env)=>({
					label  : 'X',
					action : ()=>env.removeItem(item),
				}),
			},
		},
	}
});