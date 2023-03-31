import React  from 'react';
import view   from './Main.view.mjs';
import render from 'react-jsvn';

const { useMemo, useState } = React;

const demoCollection = ['its', 'demo', null, 'collection'];

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
		...ctrl,
		items, setItems, newName, setNewName, objectList: { a: 'alpha', b:'beta' }, selectChameleon, setSelectChameleon,
		showElementA: false,
		showElementB: true,
		showElementC: false,
		showElementD: true,
		decArr: [
			'alpha', 'beta', 'gamma',
		],
		demoCollection
	});
};

export default MainComponent;