import jsman_$$ from 'jsman';
import symbols from './symbols.js';
import Pointer from './Pointer.js';

function $$ (...args) {
	//Node with/out base
	if (Array.isArray(args[0]) && typeof args[0][0] === 'string') {
		const name = args[0][0];

		if (name.endsWith(' ')) {
			return (...base) => jsman_$$({ type: symbols.SOURCE, name: name.trim(), base });
		} else {
			return jsman_$$({ type: symbols.SOURCE, name });
		}
	}

	return jsman_$$(args);
}

Object.defineProperty($$, 'text', {
	get () { return jsman_$$({ type: symbols.TEXT }); },
});
$$.__ = base => {
	if (Array.isArray(base) && typeof base[0] === 'string') base = base[0];
	if (!base || typeof base !== 'string') throw new Error('[JSVN] Incorrect base name.');
	return new Pointer(base, Pointer.types.BASE_NODE);
};

$$.import = className => {
	if (!className || typeof className !== 'string') throw new Error('[JSVN] Incorrect imported className.');
	return new Pointer(className, Pointer.types.CLASS_IMPORT);
};

$$.arrayFrom = jsvn => jsman_$$.arrayFrom(jsvn);
$$.mapFrom   = jsvn => jsman_$$.mapFrom(jsvn);

export default $$;