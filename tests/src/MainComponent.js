import React  from 'react';
import view   from './Main.view';
import render from './reactRender';

const { useMemo, useState } = React;

const MainComponent = () => {
	const [items, setItems]                     = useState(['alpha', 'gamma']);
	const [newName, setNewName]                 = useState('');
	const [selectChameleon, setSelectChameleon] = useState(false);

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

	return render(view, {
		...ctrl, items, setItems, newName, setNewName, objectList: { a: 'alpha', b:'beta' }, selectChameleon, setSelectChameleon,
	});
};

export default MainComponent;