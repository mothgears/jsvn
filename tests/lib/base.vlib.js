"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OneLineTable = exports.Input = exports.Button = exports.UIBase = void 0;

var _reactJsvn = _interopRequireDefault(require("./react-jsvn.js"));

var _$$$View;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//View based on <div>
var UIBase = new _reactJsvn.default.View('UIBase', {
  height: '30px',
  //Style, will be added to css
  border: '1px solid #666',
  borderRadius: '5px',
  boxSizing: 'border-box',
  ':focus': {
    //Local style
    outline: 'none'
  }
}); //View that extends UIBase and <button> tag
//The first base in the list overloads the next, etc.
//Bases can be View, class, tag (But Vue is only one)

exports.UIBase = UIBase;
var Button = new _reactJsvn.default.View('Button', ['<>button', UIBase], (_$$$View = {
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
exports.Button = Button;
var Input = new _reactJsvn.default.View('Input', ['/input', UIBase], {
  //Prefix '/' indicates a self-closing tag
  width: '90px',
  padding: '0 15px'
});
exports.Input = Input;
var OneLineTable = new _reactJsvn.default.View('OneLineTable', {
  display: 'table',
  '.cell': {
    display: 'table-cell'
  }
});
exports.OneLineTable = OneLineTable;