"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "importCSS", {
  enumerable: true,
  get: function get() {
    return _importStyles.default;
  }
});
Object.defineProperty(exports, "renderHTML", {
  enumerable: true,
  get: function get() {
    return _renderMarkup.default;
  }
});
exports.default = void 0;

var _$$ = _interopRequireDefault(require("./$$.js"));

var _View = require("./View.js");

var _importStyles = _interopRequireDefault(require("./importStyles.js"));

var _renderMarkup = _interopRequireDefault(require("./renderMarkup.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_$$.default.View = _View.View;
var _default = _$$.default;
exports.default = _default;