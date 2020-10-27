"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = styleNodeBodyParser;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var toKebab = function toKebab(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

var types = {
  '.': function _(it) {
    return it.parentSelector + '>.' + (it.viewName ? "".concat(it.viewName, "__") : '') + it.key.slice(1);
  },
  ':': function _(it) {
    return it.parentSelector + it.key;
  }
};

function styleNodeBodyParser(css, key, value, selector, viewName) {
  if (typeof key === 'string') {
    //child
    if (Object.keys(types).includes(key[0])) {
      css.childs += styleNodeParser(key, value, selector, viewName);
      return key[0] === '.' ? key.slice(1) : true;
    } //style


    if (typeof value === 'string') {
      css.styles += '\t' + toKebab(key) + ': ' + value + ';\n';
      return true;
    }
  }

  return false;
}

function styleNodeParser(key, content) {
  var parentSelector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var viewName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var selector;
  var type = types[key[0]];
  if (type) selector = type({
    key: key,
    content: content,
    parentSelector: parentSelector,
    viewName: viewName
  });else throw new Error('[JSVN] Unknown selector type.');
  var css = {
    styles: '',
    childs: ''
  };

  for (var _i = 0, _Object$entries = Object.entries(content); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        _key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    if (!styleNodeBodyParser(css, _key, value)) {
      var keyType = _typeof(_key);

      throw new Error("[JSVN] Incorrect key (".concat(keyType, ") '").concat(keyType === 'string' ? _key : '*', "' of node"));
    }
  }

  return [selector + ' {\n' + css.styles + '}\n\n' + css.childs];
}