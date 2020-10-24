"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactJsvn = _interopRequireDefault(require("./react-jsvn.js"));

var _UIBase = _interopRequireDefault(require("./UIBase.js"));

var _$$$View;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//View that extends UIBase and <button> tag
var Button = new _reactJsvn.default.View(['<>button', _UIBase.default], (_$$$View = {
  width: '60px',
  __onclick: function __onclick(it) {
    return it.action;
  }
}, _defineProperty(_$$$View, _reactJsvn.default.text, function (it) {
  return it.label;
}), _defineProperty(_$$$View, ':hover', {
  background: '#9cf',
  color: '#fff',
  cursor: 'pointer'
}), _$$$View));
var _default = Button;
exports.default = _default;