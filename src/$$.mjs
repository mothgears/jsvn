import jsman_$$ from 'jsman';
import symbols from './symbols.mjs';

export default function $$ (...base) {
	//Node with/out base OR modificator with/out condition
	if (Array.isArray(base[0]) && typeof base[0][0] === 'string') {
		const name = base[0][0];
		if (name.endsWith(' ')) return (...base) => jsman_$$({ type: symbols.SOURCE, name: name.trim(), base });
		else                    return jsman_$$({ type: symbols.SOURCE, name });
	}

	return jsman_$$(base);
}