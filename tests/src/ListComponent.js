import $$ from './react-jsvn.js';
import Button from './Button.js';

const { useMemo } = React;

//React Function Component with view
const List = props => {
	const view = useMemo(()=>new $$.View({ //Memorizes view declaration with useMemo hook
		display : 'table',
		width   : '100%',

		//Child node based on tag '<div>' (default base)
		[$$`item`]: {
			__EACH: it=>it.items, //Will repeat this node for each item in 'it.items' array
			$key: item=>item,

			display : 'table-row',
			height  : '30px',
			width   : '100%',

			'.cell': {
				display: 'table-cell',
				paddingBottom: '5px',
				paddingTop: '5px',
				borderBottom: '1px solid #999',
			},

			//Child node based on local style '.cell'
			[$$`item-name `('.cell')]: {
				[$$.text]: item=>item,
			},

			[$$`item-opts `('.cell')]: {
				width: '30px',

				//Child node that extends Button view
				[$$(Button)]: {
					width: '30px',

					_label  : 'X', //Model overloading
					_action : (item, it) => ()=>it.removeItem(item),
				},
			},
		}
	}), []);

	return view.render(props);
};

export default List;