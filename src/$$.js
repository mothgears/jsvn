import jsman_$$ from 'jsman';
import symbols from './symbols.js';

function $$ (...args) {
	//Node with/out base OR modificator with/out condition
	if (Array.isArray(args[0]) && typeof args[0][0] === 'string') {
		const name = args[0][0];
		if (name.endsWith(' ')) return (...base) => jsman_$$({ type: symbols.SOURCE, name: name.trim(), base });
		else                    return jsman_$$({ type: symbols.SOURCE, name });
	}

	return jsman_$$(args);
}

$$.arrayFrom = jsvn => jsman_$$.arrayFrom(jsvn);
$$.mapFrom   = jsvn => jsman_$$.mapFrom(jsvn);

export default $$;