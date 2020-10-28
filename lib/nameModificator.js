"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(nodeName) {
  return (
    /*(this.#rootName?(this.#rootName+'__'):'')*/
    'jsvn_' + nodeName
  );
};

exports.default = _default;