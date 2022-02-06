import $$ from './index.mjs';

let self = null;
if (typeof window !== "undefined" && window) self = window;
if (typeof global !== "undefined" && global) self = global;

if (self) {
	if (!self.$$) self.$$ = $$;
	if (self.jsvnGlobal) throw new Error('[JSVN] Global variable "jsvnGlobal" is already defined.');
	self.jsvnGlobal = $$;
}