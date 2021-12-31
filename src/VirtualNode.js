export default class VirtualNode {
	static nodeTypes = {
		GHOST : Symbol(),
		OWN   : Symbol(),
		ALL   : Symbol(),
	};

	_virtuals = {};
	_bases    = [];

	hasNode (name, type = VirtualNode.nodeTypes.ALL) {
		if (type !== VirtualNode.nodeTypes.GHOST) {
			const node = this._virtuals[name];
			if (node) return node;
		}

		if (type !== VirtualNode.nodeTypes.OWN) {
			for (const base of this._bases) {
				const node = base.hasNode(name);
				if (node) return node;
			}
		}

		return null;
	}

	//SYSTEM
	_addBase (node) {
		this._bases.push(node);
	}
	_addNode (name, node) {
		this._virtuals[name] = node;
	}
}