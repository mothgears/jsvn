import view from './Main.view';
import $$, { importCSS }               from "../../src";
import render                          from "./reactRender";
const { useMemo, useState } = React;

const globCham = $$.useGlobal('glob-cham');

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

	useMemo(()=>importCSS(view), [view]);

	return render(view, {
		...ctrl, items, setItems, newName, setNewName, varClass: globCham, globalVar:'#R', countValue:5, objectList: { a: 'alpha', b:'beta' }
	});
};

export default MainComponent;