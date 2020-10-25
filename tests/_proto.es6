/*deepClone () {
	const clone = new SourceNode();
	clone.#render    = this.#render;
	clone.#classId   = this.#classId;
	clone.#nodeName  = this.#nodeName;
	clone.#preset    = { ...this.#preset };
	clone.#params    = { ...this.#params };
	clone.#inline    = { ...this.#inline };
	clone.#events    = { ...this.#events };
	clone.#tagName   = this.#tagName;
	clone.#condition = this.#condition;
	clone.#repeatFor = this.#repeatFor;
	clone.#viewName  = this.#viewName;
	clone.#classes   = this.classes;
	clone.#envMod    = this.#envMod; //?

	if (this.#children) {
		clone.#children = [];
		for (const child of this.#children) {
			clone.#children.push(child.deepClone());
		}
	} else {
		clone.#children = null;
	}

	return clone;
}*/