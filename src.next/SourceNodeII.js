const messages = {
	INCORRECT_BASE : '[JSVN] Node base must be string, import, base child or View.',
	UNSAFE_GLOBALS : env => `[JSVN] Warning: node "${env.className}" is based on the global class "${env.baseItem}" without "$$.import()". The concise style of inheriting global styles is unsafe and may change in the future.`,
	GLOBAL_BASES   : env => `[JSVN] View "${env.viewName}" cannot be based on local classes, import global class "${env.baseItem}" before using.`
};

let classNamesIndex = 0;

const getClassName = ({name}, root = null) => {
	if (root) return root.name + '__' + name;
	else return name;
};

export default class SourceNode {
	#data = {};

	//get viewName  () { return this.#data.isRoot || this.#root; }
	get className () { return (!this.#data.isRoot?(this.#root.viewName+'__'):'') + this.#data.name; }

	constructor(source, root, bases = null, name = null, parent = null) {
		this.#data.name = name || `jsvn-${++classNamesIndex}`;

		this.#parseBases(bases, root, parent);
	}

	#parseBaseItem (baseItem, baseNode, root, parent) {
		if (!baseItem) return false;

		if (typeof baseItem === 'string') {
			if      (baseItem.startsWith('<>')) this.#data.tag = baseItem.slice(2);
			else if (baseItem.startsWith('/')) { this.#data.tag = baseItem.slice(1); this.#data.children = null; }
			else if (baseItem.startsWith('.')) {
				this.#data.classes.push(baseItem.slice(1));
				console.warn(messages.UNSAFE_GLOBALS({className: getClassName(this.#data, root), baseItem}));
			} else {
				if (parent) {
					if (parent.subclasses.includes(baseItem)) {
						this.#data.classes.push((root.name + '__' + baseItem));
					} else {
						this.#data.classes.push((parent.base.root.name + '__' + baseItem));
					}
				} else throw new Error(messages.GLOBAL_BASES());
			}
			return true;
		}
	}

	#parseBases (bases, root, parent) {
		bases.reverse();

		let baseNode = null;
		for (let baseItem of bases) {
			const result = this.#parseBaseItem(baseItem, baseNode, root, parent);
			if (result instanceof SourceNodeII) baseNode = result;
			if (!result) throw new Error(messages.INCORRECT_BASE);
		}
	}
}