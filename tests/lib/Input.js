"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactJsvn = _interopRequireDefault(require("./react-jsvn.js"));

var _UIBase = _interopRequireDefault(require("./UIBase.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Input = new _reactJsvn.default.View(['/input', _UIBase.default], {
  //Prefix '/' indicates a self-closing tag
  width: '90px',
  padding: '0 15px'
});
var _default = Input;
exports.default = _default;