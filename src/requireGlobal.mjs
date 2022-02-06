import Pointer from './Pointer.mjs';

export const requireGlobal = target => {
	if (typeof target === 'string') return new Pointer(target, Pointer.types.CLASS_IMPORT);
	if (Array.isArray(target)) return target.map(className=>new Pointer(className, Pointer.types.CLASS_IMPORT));

	throw new Error('[JSVN] Incorrect imported className.');
};