"use strict";

var _index = _interopRequireDefault(require("./index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var self = null;
if (typeof window !== "undefined" && window) self = window;
if (typeof global !== "undefined" && global) self = global;

if (self) {
  if (!self.$$) self.$$ = _index.default;
  if (self.jsvnGlobal) throw new Error('[JSVN] Global variable "jsvnGlobal" is already defined.');
  self.jsvnGlobal = _index.default;
}