"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.find-index");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.starts-with");

require("core-js/modules/es.weak-map");

require("core-js/modules/es.weak-set");

require("core-js/modules/esnext.weak-map.delete-all");

require("core-js/modules/esnext.weak-set.add-all");

require("core-js/modules/esnext.weak-set.delete-all");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styleParsers = _interopRequireDefault(require("./styleParsers.js"));

var _symbols = _interopRequireDefault(require("./symbols.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var classNamesIndex = 0;

var _render = new WeakMap();

var _classId = new WeakMap();

var _nodeName = new WeakMap();

var _tagName = new WeakMap();

var _preset = new WeakMap();

var _params = new WeakMap();

var _inline = new WeakMap();

var _events = new WeakMap();

var _condition = new WeakMap();

var _repeatFor = new WeakMap();

var _envMod = new WeakMap();

var _envVals = new WeakMap();

var _envGens = new WeakMap();

var _classes = new WeakMap();

var _children = new WeakMap();

var _viewName = new WeakMap();

var _renderOnce = new WeakSet();

var _parseBase = new WeakSet();

var _parsers = new WeakSet();

var _parseContent = new WeakSet();

var SourceNode = /*#__PURE__*/function () {
  _createClass(SourceNode, [{
    key: "tagName",
    get: function get() {
      return _classPrivateFieldGet(this, _tagName);
    }
  }, {
    key: "className",
    get: function get() {
      return (_classPrivateFieldGet(this, _viewName) ? _classPrivateFieldGet(this, _viewName) + '__' : '') + _classPrivateFieldGet(this, _nodeName);
    }
  }]);

  function SourceNode() {
    var render = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var cssReceiver = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    var _content = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var _base = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    var name = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var parentSelector = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    var viewName = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;

    _classCallCheck(this, SourceNode);

    _parseContent.add(this);

    _parsers.add(this);

    _parseBase.add(this);

    _renderOnce.add(this);

    _render.set(this, {
      writable: true,
      value: void 0
    });

    _classId.set(this, {
      writable: true,
      value: classNamesIndex++
    });

    _nodeName.set(this, {
      writable: true,
      value: null
    });

    _tagName.set(this, {
      writable: true,
      value: 'div'
    });

    _preset.set(this, {
      writable: true,
      value: {}
    });

    _params.set(this, {
      writable: true,
      value: {}
    });

    _inline.set(this, {
      writable: true,
      value: {}
    });

    _events.set(this, {
      writable: true,
      value: {}
    });

    _condition.set(this, {
      writable: true,
      value: null
    });

    _repeatFor.set(this, {
      writable: true,
      value: null
    });

    _envMod.set(this, {
      writable: true,
      value: null
    });

    _envVals.set(this, {
      writable: true,
      value: {}
    });

    _envGens.set(this, {
      writable: true,
      value: {}
    });

    _classes.set(this, {
      writable: true,
      value: []
    });

    _children.set(this, {
      writable: true,
      value: []
    });

    _viewName.set(this, {
      writable: true,
      value: ''
    });

    if (!render) return;

    _classPrivateFieldSet(this, _render, render);

    _classPrivateFieldSet(this, _viewName, viewName);

    _base && _classPrivateMethodGet(this, _parseBase, _parseBase2).call(this, _base);

    _classPrivateFieldSet(this, _nodeName, name || 'jsvn-' + _classPrivateFieldGet(this, _classId));

    var _selector = '.' + this.className;

    if (parentSelector) _selector = parentSelector + '>' + _selector;
    var _css = {
      styles: '',
      childs: ''
    };
    if (_content) _classPrivateMethodGet(this, _parseContent, _parseContent2).call(this, _css, _content, _selector, !parentSelector);
    _css = _selector + ' {\n' + _css.styles + '}\n\n' + _css.childs;
    if (cssReceiver && typeof cssReceiver === 'function') cssReceiver(_css, this.className);
  }

  _createClass(SourceNode, [{
    key: "render",
    value: function render() {
      var _classPrivateFieldGet2;

      for (var _len = arguments.length, envs = new Array(_len), _key = 0; _key < _len; _key++) {
        envs[_key] = arguments[_key];
      }

      if (_classPrivateFieldGet(this, _condition) && !(_classPrivateFieldGet2 = _classPrivateFieldGet(this, _condition)).call.apply(_classPrivateFieldGet2, [this].concat(envs))) return null;

      if (_classPrivateFieldGet(this, _repeatFor)) {
        var _classPrivateFieldGet3;

        var list = (_classPrivateFieldGet3 = _classPrivateFieldGet(this, _repeatFor)).call.apply(_classPrivateFieldGet3, [this].concat(envs));

        var renderedNodes = [];

        if (Array.isArray(list)) {
          var _iterator = _createForOfIteratorHelper(list),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var itemEnv = _step.value;

              var renderedNode = _classPrivateMethodGet(this, _renderOnce, _renderOnce2).call(this, [itemEnv].concat(envs));

              renderedNodes.push(renderedNode);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }

        return renderedNodes;
      } else return _classPrivateMethodGet(this, _renderOnce, _renderOnce2).call(this, envs);
    }
  }]);

  return SourceNode;
}();

exports.default = SourceNode;

var _renderOnce2 = function _renderOnce2(envs) {
  if (_classPrivateFieldGet(this, _envMod)) {
    var _classPrivateFieldGet4;

    if (typeof _classPrivateFieldGet(this, _envMod) === 'function') envs[0] = (_classPrivateFieldGet4 = _classPrivateFieldGet(this, _envMod)).call.apply(_classPrivateFieldGet4, [this].concat(_toConsumableArray(envs)));else envs[0] = _classPrivateFieldGet(this, _envMod);
  } else {
    for (var _i = 0, _Object$entries = Object.entries(_classPrivateFieldGet(this, _envVals)); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          key = _Object$entries$_i[0],
          value = _Object$entries$_i[1];

      envs[0][key] = value;
    }

    for (var _i2 = 0, _Object$entries2 = Object.entries(_classPrivateFieldGet(this, _envGens)); _i2 < _Object$entries2.length; _i2++) {
      var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
          _key2 = _Object$entries2$_i[0],
          lambda = _Object$entries2$_i[1];

      envs[0][_key2] = lambda.apply(void 0, _toConsumableArray(envs));
    }
  }

  var renderedChildren = null;

  if (_classPrivateFieldGet(this, _children)) {
    renderedChildren = [];

    var _iterator2 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _children)),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var child = _step2.value;
        var rendered = child;
        if (child instanceof SourceNode) rendered = child.render.apply(child, _toConsumableArray(envs));else if (typeof child === 'function') rendered = child.apply(void 0, _toConsumableArray(envs));else if (Array.isArray(child)) {
          var _child = _slicedToArray(child, 2),
              component = _child[0],
              props = _child[1];

          if (component instanceof SourceNode) rendered = component.render(props.apply(void 0, _toConsumableArray(envs)));else if (typeof component === 'function') rendered = component(props.apply(void 0, _toConsumableArray(envs)));else throw new Error("[JSVN] Unknown child type: \"".concat(_typeof(component), "\""));
        }

        if (Array.isArray(rendered)) {
          var _iterator3 = _createForOfIteratorHelper(rendered),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var renderedNode = _step3.value;
              renderedChildren.push(renderedNode);
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        } else {
          renderedChildren.push(rendered);
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }

  var params = _objectSpread({}, _classPrivateFieldGet(this, _preset));

  for (var _i3 = 0, _Object$entries3 = Object.entries(_classPrivateFieldGet(this, _params)); _i3 < _Object$entries3.length; _i3++) {
    var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2),
        paramName = _Object$entries3$_i[0],
        _lambda = _Object$entries3$_i[1];

    params[paramName] = _lambda.apply(void 0, _toConsumableArray(envs));
  }

  var events = {};

  for (var _i4 = 0, _Object$entries4 = Object.entries(_classPrivateFieldGet(this, _events)); _i4 < _Object$entries4.length; _i4++) {
    var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i4], 2),
        _paramName = _Object$entries4$_i[0],
        _lambda2 = _Object$entries4$_i[1];

    events[_paramName] = _lambda2.apply(void 0, _toConsumableArray(envs));
  }

  var style = {};

  for (var _i5 = 0, _Object$entries5 = Object.entries(_classPrivateFieldGet(this, _inline)); _i5 < _Object$entries5.length; _i5++) {
    var _Object$entries5$_i = _slicedToArray(_Object$entries5[_i5], 2),
        styleName = _Object$entries5$_i[0],
        _lambda3 = _Object$entries5$_i[1];

    style[styleName] = _lambda3.apply(void 0, _toConsumableArray(envs));
  }

  var classes = [].concat(_toConsumableArray(_classPrivateFieldGet(this, _classes)), [this.className]);
  return _classPrivateFieldGet(this, _render).call(this, _classPrivateFieldGet(this, _tagName), classes, params, style, events, renderedChildren);
};

var _parseBase2 = function _parseBase2(base) {
  base.reverse();
  var baseNode = null;

  var _iterator4 = _createForOfIteratorHelper(base),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var baseItem = _step4.value;

      if (typeof baseItem === 'string') {
        if (baseItem.startsWith('<>')) {
          _classPrivateFieldSet(this, _tagName, baseItem.slice(2));
        } else if (baseItem.startsWith('/')) {
          _classPrivateFieldSet(this, _tagName, baseItem.slice(1));

          _classPrivateFieldSet(this, _children, null);
        } else if (baseItem.startsWith('.')) {
          _classPrivateFieldGet(this, _classes).push((_classPrivateFieldGet(this, _viewName) ? "".concat(_classPrivateFieldGet(this, _viewName), "__") : '') + baseItem.slice(1));
        } else {
          _classPrivateFieldGet(this, _classes).push(baseItem);
        }
      } else if (typeof baseItem === 'function') {
        //optional class
        throw new Error('[JSVN] Node base must be string or View.');
      } else {
        if (baseItem && baseItem instanceof SourceNode) {
          if (baseNode) throw new Error("[JSVN] Node is based on multiple views: \"".concat(baseNode.className, "\", \"").concat(baseItem.className, "\". Multiple inheritance is not allowed."));
          baseNode = baseItem;

          _classPrivateFieldSet(this, _tagName, baseNode.tagName);

          var _iterator5 = _createForOfIteratorHelper(_classPrivateFieldGet(baseNode, _classes)),
              _step5;

          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var baseViewClass = _step5.value;

              _classPrivateFieldGet(this, _classes).push(baseViewClass);
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }

          _classPrivateFieldGet(this, _classes).push(baseNode.className);
        } else throw new Error('[JSVN] Node base must be string or View.');
      }
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }

  if (baseNode) {
    _classPrivateFieldSet(this, _preset, _objectSpread({}, _classPrivateFieldGet(baseNode, _preset)));

    _classPrivateFieldSet(this, _params, _objectSpread({}, _classPrivateFieldGet(baseNode, _params)));

    _classPrivateFieldSet(this, _inline, _objectSpread({}, _classPrivateFieldGet(baseNode, _inline)));

    _classPrivateFieldSet(this, _events, _objectSpread({}, _classPrivateFieldGet(baseNode, _events)));

    _classPrivateFieldSet(this, _envGens, _objectSpread({}, _classPrivateFieldGet(baseNode, _envGens)));

    _classPrivateFieldSet(this, _envVals, _objectSpread({}, _classPrivateFieldGet(baseNode, _envVals)));

    _classPrivateFieldSet(this, _condition, _classPrivateFieldGet(baseNode, _condition));

    _classPrivateFieldSet(this, _repeatFor, _classPrivateFieldGet(baseNode, _repeatFor));

    _classPrivateFieldSet(this, _envMod, _classPrivateFieldGet(baseNode, _envMod));

    if (_classPrivateFieldGet(this, _children)) _classPrivateFieldSet(this, _children, _toConsumableArray(_classPrivateFieldGet(baseNode, _children)));
  }
};

var _parsers2 = function _parsers2(css, key, value, selector, mainNode) {
  //sys param
  if (typeof key === 'string') {
    if (key.startsWith('__')) {
      if (mainNode) throw new Error("[JSVN] Node \"".concat(this.className, "\" has a render operator or env modifier, main node must not have \"__IF\", \"__EACH\" or '__env' properties."));
      key = key.slice(2);

      if (typeof value === 'function') {
        if (key === 'IF') {
          _classPrivateFieldSet(this, _condition, value);

          return true;
        }

        if (key === 'EACH') {
          _classPrivateFieldSet(this, _repeatFor, value);

          return true;
        }
      }

      if (key === 'env') {
        if (_classPrivateFieldGet(this, _envGens).length || _classPrivateFieldGet(this, _envVals).length) throw new Error('[JSVN] Mixed use of __env and environment parameters (_*) is not allowed.');

        _classPrivateFieldSet(this, _envMod, value);

        return true;
      }

      if (key === 'bind') {
        if (Array.isArray(value)) {
          var _value = _slicedToArray(value, 2),
              getValue = _value[0],
              setValue = _value[1];

          _classPrivateFieldGet(this, _params)['value'] = getValue;

          _classPrivateFieldGet(this, _events)['change'] = function (env) {
            return function (e) {
              return setValue(env)(e.target.value);
            };
          };

          return true;
        }

        if (typeof value === 'string') {
          var _setValue = 'set' + value[0].toUpperCase() + value.slice(1);

          _classPrivateFieldGet(this, _params)['value'] = function (env) {
            return env[value] || '';
          };

          _classPrivateFieldGet(this, _events)['change'] = function (env) {
            return function (e) {
              return env[_setValue](e.target.value);
            };
          };

          return true;
        }
      }
    }

    if (key.startsWith('$')) {
      if (typeof value === 'function') {
        _classPrivateFieldGet(this, _params)[key.slice(1)] = value;
        return true;
      } else {
        _classPrivateFieldGet(this, _preset)[key.slice(1)] = value;
        return true;
      }
    }

    if (key.startsWith('_')) {
      if (_classPrivateFieldGet(this, _envMod)) throw new Error('[JSVN] Mixed use of __env and environment parameters (_*) is not allowed.');

      if (typeof value === 'function') {
        _classPrivateFieldGet(this, _envGens)[key.slice(1)] = value;
        return true;
      } else {
        _classPrivateFieldGet(this, _envVals)[key.slice(1)] = value;
        return true;
      }
    }
  } //styleNodeParsers


  var parser = (0, _styleParsers.default)(css, key, value, selector, _classPrivateFieldGet(this, _viewName));
  if (parser) return true; //inline style

  if (typeof key === 'string' && typeof value === 'function') {
    _classPrivateFieldGet(this, _inline)[key] = value;
    return true;
  }

  if (Array.isArray(key)) {
    //view / custom component
    if (!value || typeof value === 'function') {
      _classPrivateFieldGet(this, _children).push([key[0], value]);

      return true;
    } //base


    key = {
      type: _symbols.default.SOURCE,
      base: key
    };
  }

  if (_typeof(key) === 'object') {
    if (key.type === _symbols.default.TEXT) {
      _classPrivateFieldGet(this, _children).push(value);

      return true;
    }

    if (key.type === _symbols.default.EVENT) {
      _classPrivateFieldGet(this, _events)[key.event] = value;
      return true;
    }

    if (key.type === _symbols.default.SOURCE) {
      //sourceNode
      if (_classPrivateFieldGet(this, _children)) {
        var protoIdx = _classPrivateFieldGet(this, _children).findIndex(function (child) {
          if (child instanceof SourceNode) return _classPrivateFieldGet(child, _nodeName) === key.name;
          return false;
        });

        var childCSS;

        var getCSS = function getCSS(v) {
          return childCSS = v;
        };

        if (protoIdx >= 0) {
          if (!key.base) key.base = [_classPrivateFieldGet(this, _children)[protoIdx]];else key.base.push(_classPrivateFieldGet(this, _children)[protoIdx]);
          _classPrivateFieldGet(this, _children)[protoIdx] = new SourceNode(_classPrivateFieldGet(this, _render), getCSS, value, key.base, key.name, selector, _classPrivateFieldGet(this, _viewName) || this.className);
        } else {
          _classPrivateFieldGet(this, _children).push(new SourceNode(_classPrivateFieldGet(this, _render), getCSS, value, key.base, key.name, selector, _classPrivateFieldGet(this, _viewName) || this.className));
        }

        if (childCSS) css.childs += childCSS;
      } else throw new Error('[JSVN] Child node in self-closing tag. Self-closing tag must not have children');

      return true;
    }
  } //ERROR


  return false;
};

var _parseContent2 = function _parseContent2(css, content, selector, mainNode) {
  var _iterator6 = _createForOfIteratorHelper(content),
      _step6;

  try {
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      var _step6$value = _slicedToArray(_step6.value, 2),
          key = _step6$value[0],
          value = _step6$value[1];

      if (!_classPrivateMethodGet(this, _parsers, _parsers2).call(this, css, key, value, selector, mainNode)) {
        var keyType = _typeof(key);

        throw new Error("[JSVN] Incorrect key (".concat(keyType, ") '").concat(keyType === 'string' ? key : '*', "' of node '").concat(this.className, "'"));
      }
    }
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }
};