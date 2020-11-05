import $$ from './react-jsvn.js';
import { Button, OneLineTable } from './base.vlib.js';

const { useMemo } = React;

//React Function Component with view
const List = props => {
	const view = useMemo(()=>new $$.View('List', { //Memorizes view declaration with useMemo hook
		display : 'table',
		width   : '100%',

		'#item': {
			__EACH: it=>it.items, //Will repeat this node for each item in 'it.items' array
			$key: item=>item,

			display : 'table-row',
			height  : '30px',
			width   : '100%',

			'.cell': {
				display: 'table-cell',

				paddingBottom : '5px',
				paddingTop    : '5px',
				borderBottom  : '1px solid #999',
			},

			//Child node based on local style '.cell'
			[$$`item-name `('cell')]: {
				$: item=>item,
			},

			[$$`item-opts `('cell')]: {
				width: '30px',

				//Child node that extends Button view
				[$$(Button)]: {
					width: '30px',

					//Model overloading
					_label  : 'X',
					_action : (item, it) => ()=>it.removeItem(item),
				},
			},
		}
	}), []);

	return view.render(props);
};

export default List;