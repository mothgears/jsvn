"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactJsvn = _interopRequireDefault(require("./react-jsvn.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//View
var UIBase = new _reactJsvn.default.View({
  height: '30px',
  //Style, will be added to css
  border: '1px solid #666',
  borderRadius: '5px',
  boxSizing: 'border-box',
  ':focus': {
    //Local style
    outline: 'none'
  }
});
var _default = UIBase;
exports.default = _default;