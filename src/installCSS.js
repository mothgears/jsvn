export const installStyle = view => {
	if (document.head && !document.querySelector(`style[data-view="${view.className}"]`)) {
		document.head.insertAdjacentHTML('beforeend', `<style data-view="${view.className}">${view.css}</style>`);
		return true;
	}
	return false;
};

export const installCSS = view => {
	for (let depView of view.getDependencyTree()) installStyle(depView);
	installStyle(view);
};