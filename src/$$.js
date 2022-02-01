import jsman_$$ from 'jsman';
import symbols from './symbols.js';

export default function $$ (...base) {
	//Node with/out base OR modificator with/out condition
	if (Array.isArray(base[0]) && typeof base[0][0] === 'string') {
		const name = base[0][0];
		if (name.endsWith(' ')) return (...base) => jsman_$$({ type: symbols.SOURCE, name: name.trim(), base });
		else                    return jsman_$$({ type: symbols.SOURCE, name });
	}

	return jsman_$$(base);
}

export const arrayFrom   = jsvn => jsman_$$.arrayFrom(jsvn);
export const mapFrom     = jsvn => jsman_$$.mapFrom(jsvn);
export const weakMapFrom = jsvn => jsman_$$.weakMapFrom(jsvn);