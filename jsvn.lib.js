"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.find-index");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.ends-with");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.starts-with");

require("core-js/modules/es.string.trim");

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

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));

var _classPrivateFieldGet5 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _jsman = _interopRequireDefault(require("jsman"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

//----------------------------------------------------------------------------------------------------------------------
var symbols = {
  SOURCE: Symbol(),
  TEXT: Symbol(),
  EVENT: Symbol()
}; //----------------------------------------------------------------------------------------------------------------------

function $$() {
  for (var _len = arguments.length, base = new Array(_len), _key = 0; _key < _len; _key++) {
    base[_key] = arguments[_key];
  }

  //Node with/out base
  if (Array.isArray(base[0]) && typeof base[0][0] === 'string') {
    var name = base[0][0];

    if (name.endsWith(' ')) {
      return function () {
        for (var _len2 = arguments.length, base = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          base[_key2] = arguments[_key2];
        }

        return (0, _jsman.default)({
          type: symbols.SOURCE,
          name: name.trim(),
          base: base
        });
      };
    } else {
      return (0, _jsman.default)({
        type: symbols.SOURCE,
        name: name
      });
    }
  }

  return (0, _jsman.default)(base);
}

Object.defineProperty($$, 'text', {
  get: function get() {
    return (0, _jsman.default)({
      type: symbols.TEXT
    });
  }
});

$$.on = function (event) {
  if (!Array.isArray(event)) event = event[0];
  return (0, _jsman.default)({
    type: symbols.EVENT,
    event: event
  });
};

$$.arrayFrom = function (jsvn) {
  return _jsman.default.arrayFrom(jsvn);
};

$$.mapFrom = function (jsvn) {
  return _jsman.default.mapFrom(jsvn);
}; //----------------------------------------------------------------------------------------------------------------------


var toKebab = function toKebab(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

function styleNodeBodyParser(css, key, value, selector, viewName) {
  if (typeof key === 'string') {
    //child
    if (['.', ' ', '&', ':'].includes(key[0])) {
      css.childs += styleNodeParser(key, value, selector, viewName);
      return true;
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
  if (key[0] === '.') selector = parentSelector + '>.' + (viewName ? "".concat(viewName, "__") : '') + key.slice(1);else if (key[0] === '&') selector = parentSelector + key.slice(1);else selector = parentSelector + key;
  var css = {
    styles: '',
    childs: ''
  };

  for (var _i = 0, _Object$entries = Object.entries(content); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = (0, _slicedToArray2.default)(_Object$entries[_i], 2),
        _key3 = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    if (!styleNodeBodyParser(css, _key3, value)) {
      var keyType = (0, _typeof2.default)(_key3);
      throw new Error("[JSVN ERROR] Incorrect key (".concat(keyType, ") '").concat(keyType === 'string' ? _key3 : '*', "' of node"));
    }
  }

  return selector + ' {\n' + css.styles + '}\n\n' + css.childs;
} //----------------------------------------------------------------------------------------------------------------------


var classNamesIndex = 0;

var _render = new WeakMap();

var _classId = new WeakMap();

var _nodeName = new WeakMap();

var _tagName = new WeakMap();

var _preset = new WeakMap();

var _params = new WeakMap();

var _inline = new WeakMap();

var _events = new WeakMap();

var _envMod = new WeakMap();

var _condition = new WeakMap();

var _repeatFor = new WeakMap();

var _classes = new WeakMap();

var _children = new WeakMap();

var _viewName = new WeakMap();

var _renderOnce = new WeakSet();

var _parsers = new WeakSet();

var _parseContent = new WeakSet();

var _parseBase = new WeakSet();

var SourceNode = /*#__PURE__*/function () {
  (0, _createClass2.default)(SourceNode, [{
    key: "tagName",
    get: function get() {
      return (0, _classPrivateFieldGet5.default)(this, _tagName);
    }
  }, {
    key: "className",
    get: function get() {
      return ((0, _classPrivateFieldGet5.default)(this, _viewName) ? (0, _classPrivateFieldGet5.default)(this, _viewName) + '__' : '') + (0, _classPrivateFieldGet5.default)(this, _nodeName);
    }
  }]);

  function SourceNode(render, cssReceiver, _content, _base) {
    var name = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var parentSelector = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    var viewName = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
    (0, _classCallCheck2.default)(this, SourceNode);

    _parseBase.add(this);

    _parseContent.add(this);

    _parsers.add(this);

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

    _envMod.set(this, {
      writable: true,
      value: null
    });

    _condition.set(this, {
      writable: true,
      value: null
    });

    _repeatFor.set(this, {
      writable: true,
      value: null
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

    (0, _classPrivateFieldSet2.default)(this, _render, render);
    (0, _classPrivateFieldSet2.default)(this, _viewName, viewName);

    if (_base) {
      var baseNodes = _classPrivateMethodGet(this, _parseBase, _parseBase2).call(this, _base);

      var _iterator = _createForOfIteratorHelper(baseNodes),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var baseNode = _step.value;
          (0, _classPrivateFieldSet2.default)(this, _preset, _objectSpread(_objectSpread({}, (0, _classPrivateFieldGet5.default)(this, _preset)), (0, _classPrivateFieldGet5.default)(baseNode, _preset)));
          (0, _classPrivateFieldSet2.default)(this, _params, _objectSpread(_objectSpread({}, (0, _classPrivateFieldGet5.default)(this, _params)), (0, _classPrivateFieldGet5.default)(baseNode, _params)));
          (0, _classPrivateFieldSet2.default)(this, _inline, _objectSpread(_objectSpread({}, (0, _classPrivateFieldGet5.default)(this, _inline)), (0, _classPrivateFieldGet5.default)(baseNode, _inline)));
          (0, _classPrivateFieldSet2.default)(this, _events, _objectSpread(_objectSpread({}, (0, _classPrivateFieldGet5.default)(this, _events)), (0, _classPrivateFieldGet5.default)(baseNode, _events)));
          if ((0, _classPrivateFieldGet5.default)(baseNode, _condition)) (0, _classPrivateFieldSet2.default)(this, _condition, (0, _classPrivateFieldGet5.default)(baseNode, _condition));
          if ((0, _classPrivateFieldGet5.default)(baseNode, _repeatFor)) (0, _classPrivateFieldSet2.default)(this, _repeatFor, (0, _classPrivateFieldGet5.default)(baseNode, _repeatFor));
          if ((0, _classPrivateFieldGet5.default)(this, _children)) (0, _classPrivateFieldSet2.default)(this, _children, (0, _classPrivateFieldGet5.default)(baseNode, _children)); //Add fusion
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    (0, _classPrivateFieldSet2.default)(this, _nodeName, name || 'jsvn-' + (0, _classPrivateFieldGet5.default)(this, _classId));

    var _selector = '.' + this.className;

    if (parentSelector) _selector = parentSelector + '>' + _selector;
    var _css = {
      styles: '',
      childs: ''
    };

    _classPrivateMethodGet(this, _parseContent, _parseContent2).call(this, _css, _content, _selector, !parentSelector);

    _css = _selector + ' {\n' + _css.styles + '}\n\n' + _css.childs;

    if (cssReceiver && typeof cssReceiver === 'function') {
      cssReceiver(_css, this.className);
    }
  }

  (0, _createClass2.default)(SourceNode, [{
    key: "render",
    value: function render() {
      var _classPrivateFieldGet2, _classPrivateMethodGe2;

      for (var _len3 = arguments.length, envs = new Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
        envs[_key4] = arguments[_key4];
      }

      if ((0, _classPrivateFieldGet5.default)(this, _condition) && !(_classPrivateFieldGet2 = (0, _classPrivateFieldGet5.default)(this, _condition)).call.apply(_classPrivateFieldGet2, [this].concat(envs))) return null;

      if ((0, _classPrivateFieldGet5.default)(this, _repeatFor)) {
        var _classPrivateFieldGet3;

        var list = (_classPrivateFieldGet3 = (0, _classPrivateFieldGet5.default)(this, _repeatFor)).call.apply(_classPrivateFieldGet3, [this].concat(envs));

        var renderedNodes = [];

        if (Array.isArray(list)) {
          var _iterator2 = _createForOfIteratorHelper(list),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _classPrivateMethodGe;

              var itemEnv = _step2.value;

              var renderedNode = (_classPrivateMethodGe = _classPrivateMethodGet(this, _renderOnce, _renderOnce2)).call.apply(_classPrivateMethodGe, [this, itemEnv].concat(envs));

              renderedNodes.push(renderedNode);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }

        return renderedNodes;
      } else return (_classPrivateMethodGe2 = _classPrivateMethodGet(this, _renderOnce, _renderOnce2)).call.apply(_classPrivateMethodGe2, [this].concat(envs));
    }
  }]);
  return SourceNode;
}();

var _renderOnce2 = function _renderOnce2() {
  for (var _len5 = arguments.length, envs = new Array(_len5), _key6 = 0; _key6 < _len5; _key6++) {
    envs[_key6] = arguments[_key6];
  }

  if ((0, _classPrivateFieldGet5.default)(this, _envMod)) {
    if ((0, _classPrivateFieldGet5.default)(this, _envMod).extend) {
      var props = {};

      for (var _i3 = 0, _Object$entries2 = Object.entries((0, _classPrivateFieldGet5.default)(this, _envMod).props); _i3 < _Object$entries2.length; _i3++) {
        var _Object$entries2$_i = (0, _slicedToArray2.default)(_Object$entries2[_i3], 2),
            key = _Object$entries2$_i[0],
            value = _Object$entries2$_i[1];

        props[key] = value.apply(void 0, envs);
      }

      envs[0] = _objectSpread(_objectSpread(_objectSpread({}, envs[0]), (0, _classPrivateFieldGet5.default)(this, _envMod).value), props);
    } else {
      var _classPrivateFieldGet4;

      if (typeof (0, _classPrivateFieldGet5.default)(this, _envMod).value === 'function') envs[0] = (_classPrivateFieldGet4 = (0, _classPrivateFieldGet5.default)(this, _envMod)).value.apply(_classPrivateFieldGet4, envs);else envs[0] = (0, _classPrivateFieldGet5.default)(this, _envMod).value;
    }
  }

  var renderedChildren = null;

  if ((0, _classPrivateFieldGet5.default)(this, _children)) {
    renderedChildren = [];

    var _iterator3 = _createForOfIteratorHelper((0, _classPrivateFieldGet5.default)(this, _children)),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var child = _step3.value;
        var rendered = child;
        if (child instanceof SourceNode) rendered = child.render.apply(child, envs);else if (typeof child === 'function') rendered = child.apply(void 0, envs);else if (Array.isArray(child)) {
          var _child = (0, _slicedToArray2.default)(child, 2),
              component = _child[0],
              _props = _child[1];

          if (component instanceof SourceNode) rendered = component.render(_props.apply(void 0, envs));else if (typeof component === 'function') rendered = component(_props.apply(void 0, envs));else throw new Error("[JSVN] Unknown child type: \"".concat((0, _typeof2.default)(component), "\""));
        }

        if (Array.isArray(rendered)) {
          var _iterator4 = _createForOfIteratorHelper(rendered),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var renderedNode = _step4.value;
              renderedChildren.push(renderedNode);
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        } else {
          renderedChildren.push(rendered);
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }

  var params = _objectSpread({}, (0, _classPrivateFieldGet5.default)(this, _preset));

  for (var _i4 = 0, _Object$entries3 = Object.entries((0, _classPrivateFieldGet5.default)(this, _params)); _i4 < _Object$entries3.length; _i4++) {
    var _Object$entries3$_i = (0, _slicedToArray2.default)(_Object$entries3[_i4], 2),
        paramName = _Object$entries3$_i[0],
        lambda = _Object$entries3$_i[1];

    params[paramName] = lambda.apply(void 0, envs);
  }

  var events = {};

  for (var _i5 = 0, _Object$entries4 = Object.entries((0, _classPrivateFieldGet5.default)(this, _events)); _i5 < _Object$entries4.length; _i5++) {
    var _Object$entries4$_i = (0, _slicedToArray2.default)(_Object$entries4[_i5], 2),
        _paramName = _Object$entries4$_i[0],
        _lambda = _Object$entries4$_i[1];

    events[_paramName] = _lambda.apply(void 0, envs);
  }

  var style = {};

  for (var _i6 = 0, _Object$entries5 = Object.entries((0, _classPrivateFieldGet5.default)(this, _inline)); _i6 < _Object$entries5.length; _i6++) {
    var _Object$entries5$_i = (0, _slicedToArray2.default)(_Object$entries5[_i6], 2),
        styleName = _Object$entries5$_i[0],
        _lambda2 = _Object$entries5$_i[1];

    style[styleName] = _lambda2.apply(void 0, envs);
  }

  var classes = [].concat((0, _toConsumableArray2.default)((0, _classPrivateFieldGet5.default)(this, _classes)), [this.className]);
  return (0, _classPrivateFieldGet5.default)(this, _render).call(this, (0, _classPrivateFieldGet5.default)(this, _tagName), classes, params, style, events, renderedChildren);
};

var _parsers2 = function _parsers2(css, key, value, selector, mainNode) {
  //sys param
  if (typeof key === 'string') {
    if (key.startsWith('__')) {
      if (mainNode) throw new Error("[JSVN] Node \"".concat(this.className, "\" has a render operator or env modifier, main node must not have \"__IF\", \"__EACH\" or '__env' properties."));
      key = key.slice(2);

      if (typeof value === 'function') {
        if (key === 'IF') {
          (0, _classPrivateFieldSet2.default)(this, _condition, value);
          return true;
        }

        if (key === 'EACH') {
          (0, _classPrivateFieldSet2.default)(this, _repeatFor, value);
          return true;
        }
      }

      if (key === 'env') {
        if ((0, _classPrivateFieldGet5.default)(this, _envMod)) throw new Error('[JSVN] Mixed use of __env and environment parameters (_*) is not allowed.');
        (0, _classPrivateFieldSet2.default)(this, _envMod, {
          extend: false,
          value: value
        });
        return true;
      }

      if (key === 'bind') {
        if (Array.isArray(value)) {
          var _value = (0, _slicedToArray2.default)(value, 2),
              getValue = _value[0],
              setValue = _value[1];

          (0, _classPrivateFieldGet5.default)(this, _params)['value'] = getValue;

          (0, _classPrivateFieldGet5.default)(this, _events)['change'] = function (env) {
            return function (e) {
              return setValue(env)(e.target.value);
            };
          };

          return true;
        }

        if (typeof value === 'string') {
          var _setValue = 'set' + value[0].toUpperCase() + value.slice(1);

          (0, _classPrivateFieldGet5.default)(this, _params)['value'] = function (env) {
            return env[value] || '';
          };

          (0, _classPrivateFieldGet5.default)(this, _events)['change'] = function (env) {
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
        (0, _classPrivateFieldGet5.default)(this, _params)[key.slice(1)] = value;
        return true;
      } else {
        (0, _classPrivateFieldGet5.default)(this, _preset)[key.slice(1)] = value;
        return true;
      }
    }

    if (key.startsWith('_')) {
      if (!(0, _classPrivateFieldGet5.default)(this, _envMod)) (0, _classPrivateFieldSet2.default)(this, _envMod, {
        extend: true,
        value: {},
        props: {}
      });else if (!(0, _classPrivateFieldGet5.default)(this, _envMod).extend) throw new Error('[JSVN] Mixed use of __env and environment parameters (_*) is not allowed.');

      if (typeof value === 'function') {
        (0, _classPrivateFieldGet5.default)(this, _envMod).props[key.slice(1)] = value;
        return true;
      } else {
        (0, _classPrivateFieldGet5.default)(this, _envMod).value[key.slice(1)] = value;
        return true;
      }
    }
  } //styleNodeParsers


  var parser = styleNodeBodyParser(css, key, value, selector, (0, _classPrivateFieldGet5.default)(this, _viewName));
  if (parser) return true; //inline style

  if (typeof key === 'string' && typeof value === 'function') {
    (0, _classPrivateFieldGet5.default)(this, _inline)[key] = value;
    return true;
  }

  if (Array.isArray(key)) {
    //view / custom component
    if (!value || typeof value === 'function') {
      (0, _classPrivateFieldGet5.default)(this, _children).push([key[0], value]);
      return true;
    } //base


    key = {
      type: symbols.SOURCE,
      base: key
    };
  }

  if ((0, _typeof2.default)(key) === 'object') {
    if (key.type === symbols.TEXT) {
      (0, _classPrivateFieldGet5.default)(this, _children).push(value);
      return true;
    }

    if (key.type === symbols.EVENT) {
      (0, _classPrivateFieldGet5.default)(this, _events)[key.event] = value;
      return true;
    }

    if (key.type === symbols.SOURCE) {
      //sourceNode
      if ((0, _classPrivateFieldGet5.default)(this, _children)) {
        var protoIdx = key.name && (0, _classPrivateFieldGet5.default)(this, _children).findIndex(function (child) {
          return child.className === key.name;
        });
        var childCSS;

        var getCSS = function getCSS(v) {
          return childCSS = v;
        };

        if (protoIdx >= 0) {
          if (!key.base) key.base = [(0, _classPrivateFieldGet5.default)(this, _children)[protoIdx]];else key.base.push((0, _classPrivateFieldGet5.default)(this, _children)[protoIdx]);
          (0, _classPrivateFieldGet5.default)(this, _children)[protoIdx] = new SourceNode((0, _classPrivateFieldGet5.default)(this, _render), getCSS, value, key.base, key.name, selector, (0, _classPrivateFieldGet5.default)(this, _viewName) || this.className);
        } else {
          (0, _classPrivateFieldGet5.default)(this, _children).push(new SourceNode((0, _classPrivateFieldGet5.default)(this, _render), getCSS, value, key.base, key.name, selector, (0, _classPrivateFieldGet5.default)(this, _viewName) || this.className));
        }

        if (childCSS) css.childs += childCSS;
      } else throw new Error('[JSVN] Child node in self-closing tag. Self-closing tag must not have children');

      return true;
    }
  } //ERROR


  return false;
};

var _parseContent2 = function _parseContent2(css, content, selector, mainNode) {
  var _iterator5 = _createForOfIteratorHelper(content),
      _step5;

  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var _step5$value = (0, _slicedToArray2.default)(_step5.value, 2),
          key = _step5$value[0],
          value = _step5$value[1];

      if (!_classPrivateMethodGet(this, _parsers, _parsers2).call(this, css, key, value, selector, mainNode)) {
        var keyType = (0, _typeof2.default)(key);
        throw new Error("[JSVN] Incorrect key (".concat(keyType, ") '").concat(keyType === 'string' ? key : '*', "' of node '").concat(this.className, "'"));
      }
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
};

var _parseBase2 = function _parseBase2(base) {
  base.reverse();
  var baseViews = [];

  var _iterator6 = _createForOfIteratorHelper(base),
      _step6;

  try {
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      var baseItem = _step6.value;

      if (typeof baseItem === 'string') {
        if (baseItem.startsWith('<>')) {
          (0, _classPrivateFieldSet2.default)(this, _tagName, baseItem.slice(2));
        } else if (baseItem.startsWith('/')) {
          (0, _classPrivateFieldSet2.default)(this, _tagName, baseItem.slice(1));
          (0, _classPrivateFieldSet2.default)(this, _children, null);
        } else if (baseItem.startsWith('.')) {
          (0, _classPrivateFieldGet5.default)(this, _classes).push(((0, _classPrivateFieldGet5.default)(this, _viewName) ? "".concat((0, _classPrivateFieldGet5.default)(this, _viewName), "__") : '') + baseItem.slice(1));
        } else {
          (0, _classPrivateFieldGet5.default)(this, _classes).push(baseItem);
        }
      } else if (typeof baseItem === 'function') {
        //optional class
        throw new Error('[JSVN] Node base must be string or View.');
      } else {
        var baseView = baseItem; //if ((baseItem||{}).source) baseView = baseItem.source;

        if (baseView && baseView instanceof SourceNode) {
          if (baseViews.length > 1) throw new Error('[JSVN] Multiple inheritance is not allowed.');
          if (baseView.tagName) (0, _classPrivateFieldSet2.default)(this, _tagName, baseView.tagName);
          (0, _classPrivateFieldGet5.default)(this, _classes).push(baseView.className);
          baseViews.push(baseView);
        } else throw new Error('[JSVN] Node base must be string or View.');
      }
    }
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }

  return baseViews;
};

var View = /*#__PURE__*/function (_SourceNode) {
  (0, _inherits2.default)(View, _SourceNode);

  var _super = _createSuper(View);

  function View() {
    (0, _classCallCheck2.default)(this, View);

    for (var _len4 = arguments.length, params = new Array(_len4), _key5 = 0; _key5 < _len4; _key5++) {
      params[_key5] = arguments[_key5];
    }

    if (params.length < 1) throw new Error('[JSVN] View must have at least one argument');
    var content = params.pop();
    var name = null;
    var base = null;

    for (var _i2 = 0, _params2 = params; _i2 < _params2.length; _i2++) {
      var param = _params2[_i2];
      if (typeof param === 'string') name = param;else if (Array.isArray(param)) base = param;
    }

    var render = (this instanceof View ? this.constructor : void 0).render;
    var styles = (this instanceof View ? this.constructor : void 0).styles;
    if (!Array.isArray(content)) content = $$.arrayFrom(content);
    return _super.call(this, render, styles, content, base, name);
  }

  return View;
}(SourceNode); //----------------------------------------------------------------------------------------------------------------------


$$.View = View;
var _default = $$;
exports.default = _default;
module.exports = exports.default;
