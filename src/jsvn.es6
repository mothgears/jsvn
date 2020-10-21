import jsman_$$ from 'jsman';
import symbols from './symbols.es6';

function $$ (...base) {
	//Node with/out base
	if (Array.isArray(base[0]) && typeof base[0][0] === 'string') {
		const name = base[0][0];

		if (name.endsWith(' ')) {
			return (...base) => jsman_$$({ type: symbols.SOURCE, name: name.trim(), base });
		} else {
			return jsman_$$({ type: symbols.SOURCE, name });
		}
	}

	return jsman_$$(base);
}
Object.defineProperty($$, 'text', {
	get () { return jsman_$$({ type: symbols.TEXT }); },
});
$$.on = event => {
	if (!Array.isArray(event)) event = event[0];
	return jsman_$$({ type: symbols.EVENT, event });
};

$$.arrayFrom = jsvn => jsman_$$.arrayFrom(jsvn);
$$.mapFrom   = jsvn => jsman_$$.mapFrom(jsvn);

export default $$;