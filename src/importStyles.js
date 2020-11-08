const installStyle = view => {
	if (document.head && !document.querySelector(`style[data-view="${view.className}"]`)) {
		document.head.insertAdjacentHTML('beforeend', `<style data-view="${view.className}">${view.css}</style>`);
	}
};

const installDependencies = view => {
	for (let depView of view.dependencies) installDependencies(depView);
	installStyle(view);
};

export default installDependencies;