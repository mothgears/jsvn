"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.find-index");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.index-of");

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

var _Pointer = _interopRequireDefault(require("./Pointer.js"));

var _$$ = _interopRequireDefault(require("./$$.js"));

var _nameModificator = _interopRequireDefault(require("./nameModificator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classStaticPrivateMethodGet(receiver, classConstructor, method) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } return method; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var classNamesIndex = 0;

var ERROR_TOP_PROPS = function ERROR_TOP_PROPS(className) {
  return "[JSVN] Node \"".concat(className, "\" has a render operator or env modifier, main node must not have \"__IF\", \"__EACH(_invert)\" or '__env' properties.");
};

var WARN_UNSAFE_GLOBAL = function WARN_UNSAFE_GLOBAL(className, baseItem) {
  return "[JSVN] Warning! Node \"".concat(className, "\" is based on the global class \"").concat(baseItem, "\" without \"$$.useGlobal()\". The short style of inheriting global styles is unsafe and may change in the future.");
};

var NOTBEM_MODE_NAME = function NOTBEM_MODE_NAME(className, modName) {
  return "[JSVN] Warning! Name of modificator \"".concat(modName, "\" for node \"").concat(className, "\" is not BEM.");
};

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

var _mods = new WeakMap();

var _children = new WeakMap();

var _pureHTML = new WeakMap();

var _rootName = new WeakMap();

var _renderOnce = new WeakSet();

var _parseBaseItem = new WeakSet();

var _parseBases = new WeakSet();

var _basedOn = new WeakSet();

var _parseBodyItem = new WeakSet();

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
      return (0, _nameModificator.default)(_classPrivateFieldGet(this, _nodeName));
    }
  }, {
    key: "viewName",
    get: function get() {
      return _classPrivateFieldGet(this, _rootName) || _classPrivateFieldGet(this, _nodeName);
    }
  }]);

  function SourceNode() {
    var _dependencies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var cssReceiver = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    var _content = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var base = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var name = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var parentSelector = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    var rootName = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;

    var _parentData = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;

    _classCallCheck(this, SourceNode);

    _parseContent.add(this);

    _parseBodyItem.add(this);

    _basedOn.add(this);

    _parseBases.add(this);

    _parseBaseItem.add(this);

    _renderOnce.add(this);

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

    _mods.set(this, {
      writable: true,
      value: []
    });

    _children.set(this, {
      writable: true,
      value: []
    });

    _pureHTML.set(this, {
      writable: true,
      value: null
    });

    _rootName.set(this, {
      writable: true,
      value: null
    });

    if (!_dependencies) return;

    _classPrivateFieldSet(this, _rootName, rootName);

    if (_classPrivateFieldGet(this, _rootName)) _classPrivateFieldSet(this, _nodeName, name || 'node' + _classPrivateFieldGet(this, _classId));else _classPrivateFieldSet(this, _nodeName, name || 'View' + _classPrivateFieldGet(this, _classId));

    var _baseNode = base && _classPrivateMethodGet(this, _parseBases, _parseBases2).call(this, base, _dependencies, _parentData);

    if (_baseNode) _classPrivateMethodGet(this, _basedOn, _basedOn2).call(this, _baseNode);

    var _selector = '.' + this.className;

    if (parentSelector) _selector = parentSelector + '>' + _selector;

    var _css;

    if (_content) {
      _css = _classPrivateMethodGet(this, _parseContent, _parseContent2).call(this, _dependencies, _content, _selector, !parentSelector, (_baseNode || {}).viewName);
      if (_css) _css = _selector + ' {\n' + _css.styles + '}\n\n' + _css.childs;
    }

    if (cssReceiver && typeof cssReceiver === 'function') cssReceiver(_css, this.className);
  }

  _createClass(SourceNode, [{
    key: "render",
    value: function render(_render) {
      for (var _len = arguments.length, envs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        envs[_key - 1] = arguments[_key];
      }

      if (_classPrivateFieldGet(this, _repeatFor)) {
        var _classPrivateFieldGet2;

        var list = (_classPrivateFieldGet2 = _classPrivateFieldGet(this, _repeatFor)).list.apply(_classPrivateFieldGet2, envs),
            invert = _classPrivateFieldGet(this, _repeatFor).invert;

        if (!list) return null;
        var renderedNodes = [];

        if (Array.isArray(list)) {
          var index = 0;

          var _iterator = _createForOfIteratorHelper(list),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var _classPrivateFieldGet3, _classPrivateMethodGe;

              var itemEnv = _step.value;
              if (_classPrivateFieldGet(this, _condition) && !(_classPrivateFieldGet3 = _classPrivateFieldGet(this, _condition)).call.apply(_classPrivateFieldGet3, [this, itemEnv, index++].concat(envs))) continue;

              var renderedNode = (_classPrivateMethodGe = _classPrivateMethodGet(this, _renderOnce, _renderOnce2)).call.apply(_classPrivateMethodGe, [this, _render, itemEnv, index++].concat(envs));

              renderedNodes.push(renderedNode);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        } else if (typeof list === 'number') {
          for (var i = 0; i < list; i++) {
            var _classPrivateFieldGet4, _classPrivateMethodGe2;

            if (_classPrivateFieldGet(this, _condition) && !(_classPrivateFieldGet4 = _classPrivateFieldGet(this, _condition)).call.apply(_classPrivateFieldGet4, [this, i].concat(envs))) continue;

            var _renderedNode = (_classPrivateMethodGe2 = _classPrivateMethodGet(this, _renderOnce, _renderOnce2)).call.apply(_classPrivateMethodGe2, [this, _render, i].concat(envs));

            renderedNodes.push(_renderedNode);
          }
        } else if (_typeof(list) === 'object') {
          var _index = 0;

          for (var _i = 0, _Object$entries = Object.entries(list); _i < _Object$entries.length; _i++) {
            var _classPrivateFieldGet5, _classPrivateMethodGe3;

            var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                key = _Object$entries$_i[0],
                value = _Object$entries$_i[1];

            if (_classPrivateFieldGet(this, _condition) && !(_classPrivateFieldGet5 = _classPrivateFieldGet(this, _condition)).call.apply(_classPrivateFieldGet5, [this, key, value, _index++].concat(envs))) continue;

            var _renderedNode2 = (_classPrivateMethodGe3 = _classPrivateMethodGet(this, _renderOnce, _renderOnce2)).call.apply(_classPrivateMethodGe3, [this, _render, key, value, _index++].concat(envs));

            renderedNodes.push(_renderedNode2);
          }
        } else throw new Error('[JSVN] __EACH(_invert) argument must be "Array", "number" or iterable object.');

        if (invert) renderedNodes.reverse();
        return renderedNodes;
      } else {
        var _classPrivateFieldGet6, _classPrivateMethodGe4;

        if (_classPrivateFieldGet(this, _condition) && !(_classPrivateFieldGet6 = _classPrivateFieldGet(this, _condition)).call.apply(_classPrivateFieldGet6, [this].concat(envs))) return null;
        return (_classPrivateMethodGe4 = _classPrivateMethodGet(this, _renderOnce, _renderOnce2)).call.apply(_classPrivateMethodGe4, [this, _render].concat(envs));
      }
    }
  }]);

  return SourceNode;
}();

exports.default = SourceNode;

var _prepareClass = function _prepareClass(classProto) {
  var modTarget = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  if (classProto instanceof _Pointer.default) return classProto.value;else if (typeof classProto === 'string') {
    if (classProto[0] === '.') {
      console.warn(WARN_UNSAFE_GLOBAL(modTarget, classProto));
      return classProto.slice(1);
    }

    if (modTarget) {
      if (!classProto.startsWith('--')) console.warn(NOTBEM_MODE_NAME(modTarget, classProto));
      return modTarget + classProto;
    }

    return (0, _nameModificator.default)(classProto);
  } else return null;
};

var _getBaseIndex = function _getBaseIndex(key, children) {
  var basePointer = null;

  if (key.base) {
    if (!key.base.length) basePointer = key.name;else {
      basePointer = key.base.indexOf(_$$.default.__);

      if (basePointer >= 0) {
        delete key.base[basePointer];
        basePointer = key.name;
      } else {
        basePointer = key.base.findIndex(function (b) {
          return b instanceof _Pointer.default && b.type === _Pointer.default.types.BASE_NODE;
        });

        if (basePointer >= 0) {
          delete key.base[basePointer];
          basePointer = key.name;
        } else basePointer = null;
      }
    }
  }

  if (basePointer) basePointer = children.findIndex(function (child) {
    if (child instanceof SourceNode) return _classPrivateFieldGet(child, _nodeName) === basePointer;
    return false;
  });else return -1;
  return basePointer;
};

var _renderOnce2 = function _renderOnce2(render) {
  for (var _len2 = arguments.length, envs = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    envs[_key2 - 1] = arguments[_key2];
  }

  if (_classPrivateFieldGet(this, _envMod)) {
    var _classPrivateFieldGet7;

    if (typeof _classPrivateFieldGet(this, _envMod) === 'function') envs = [(_classPrivateFieldGet7 = _classPrivateFieldGet(this, _envMod)).call.apply(_classPrivateFieldGet7, [this].concat(_toConsumableArray(envs)))].concat(_toConsumableArray(envs));else if (Array.isArray(_classPrivateFieldGet(this, _envMod))) {
      var envsLoc = [];

      var _iterator2 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _envMod)),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var env = _step2.value;
          if (typeof env === 'function') env = env.apply(void 0, _toConsumableArray(envs));
          envsLoc.push(env);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      envs = envsLoc;
    } else envs = [_classPrivateFieldGet(this, _envMod)].concat(_toConsumableArray(envs));
  } else {
    var newEnv = null;

    for (var _i2 = 0, _Object$entries2 = Object.entries(_classPrivateFieldGet(this, _envVals)); _i2 < _Object$entries2.length; _i2++) {
      var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
          key = _Object$entries2$_i[0],
          value = _Object$entries2$_i[1];

      if (!newEnv) newEnv = {};
      newEnv[key] = value;
    }

    for (var _i3 = 0, _Object$entries3 = Object.entries(_classPrivateFieldGet(this, _envGens)); _i3 < _Object$entries3.length; _i3++) {
      var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2),
          _key3 = _Object$entries3$_i[0],
          lambda = _Object$entries3$_i[1];

      if (!newEnv) newEnv = {};
      newEnv[_key3] = lambda.apply(void 0, _toConsumableArray(envs));
    }

    if (newEnv) {
      if (_typeof(envs[0]) === 'object') envs[0] = _objectSpread(_objectSpread({}, envs[0]), newEnv);else envs[0] = newEnv;
    }
  }

  var renderedChildren = null;

  if (_classPrivateFieldGet(this, _children)) {
    renderedChildren = [];

    var _iterator3 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _children)),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var child = _step3.value;
        var rendered = child;
        if (child instanceof SourceNode) rendered = child.render.apply(child, [render].concat(_toConsumableArray(envs)));else if (typeof child === 'function') rendered = child.apply(void 0, _toConsumableArray(envs));else if (Array.isArray(child)) {
          var _child = _slicedToArray(child, 2),
              component = _child[0],
              props = _child[1];

          if (component instanceof _$$.default.View) rendered = component.render(render, props.apply(void 0, _toConsumableArray(envs)));else if (typeof component === 'function') rendered = component(props.apply(void 0, _toConsumableArray(envs)));else throw new Error("[JSVN] Unknown child type: \"".concat(_typeof(component), "\""));
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

  var params = _objectSpread({}, _classPrivateFieldGet(this, _preset));

  for (var _i4 = 0, _Object$entries4 = Object.entries(_classPrivateFieldGet(this, _params)); _i4 < _Object$entries4.length; _i4++) {
    var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i4], 2),
        paramName = _Object$entries4$_i[0],
        _lambda = _Object$entries4$_i[1];

    params[paramName] = _lambda.apply(void 0, _toConsumableArray(envs));
  }

  var events = {};

  for (var _i5 = 0, _Object$entries5 = Object.entries(_classPrivateFieldGet(this, _events)); _i5 < _Object$entries5.length; _i5++) {
    var _Object$entries5$_i = _slicedToArray(_Object$entries5[_i5], 2),
        _paramName = _Object$entries5$_i[0],
        _lambda2 = _Object$entries5$_i[1];

    events[_paramName] = _lambda2.apply(void 0, _toConsumableArray(envs));
  }

  var style = {};

  for (var _i6 = 0, _Object$entries6 = Object.entries(_classPrivateFieldGet(this, _inline)); _i6 < _Object$entries6.length; _i6++) {
    var _Object$entries6$_i = _slicedToArray(_Object$entries6[_i6], 2),
        styleName = _Object$entries6$_i[0],
        _lambda3 = _Object$entries6$_i[1];

    style[styleName] = _lambda3.apply(void 0, _toConsumableArray(envs));
  }

  var classes = [];

  var _iterator5 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _classes)),
      _step5;

  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var classSrc = _step5.value;

      if (typeof classSrc === 'function') {
        var classProto = classSrc.apply(void 0, _toConsumableArray(envs));

        var className = _classStaticPrivateMethodGet(SourceNode, SourceNode, _prepareClass).call(SourceNode, classProto);

        if (!className) throw new Error("[JSVN] Incorrect dynamic class value, must be function returns string/global.");
        classes.push(className);
      } else classes.push(classSrc);
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }

  classes.push(this.className);

  var _iterator6 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _mods)),
      _step6;

  try {
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      var mod = _step6.value;

      if (typeof mod === 'function') {
        var _classProto = mod.apply(void 0, _toConsumableArray(envs));

        if (_classProto) {
          var _className = _classStaticPrivateMethodGet(SourceNode, SourceNode, _prepareClass).call(SourceNode, _classProto, this.className);

          if (!_className) throw new Error("[JSVN] Incorrect \"__mods\" value, must be array of functions returns strings/globals.");
          classes.push(_className);
        }
      } else throw new Error("[JSVN] Incorrect \"__mods\" value, must be array of functions returns strings/globals.");
    }
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }

  var pureHTML = _classPrivateFieldGet(this, _pureHTML);

  if (pureHTML && typeof pureHTML === 'function') pureHTML = pureHTML.apply(void 0, _toConsumableArray(envs));
  return render(_classPrivateFieldGet(this, _tagName), classes, params, style, events, renderedChildren, pureHTML);
};

var _parseBaseItem2 = function _parseBaseItem2(baseItem, baseNode, dependencies, parentData) {
  if (!baseItem) return false;

  if (typeof baseItem === 'string') {
    if (baseItem.startsWith('<>')) {
      _classPrivateFieldSet(this, _tagName, baseItem.slice(2));
    } else if (baseItem.startsWith('/')) {
      _classPrivateFieldSet(this, _tagName, baseItem.slice(1));

      _classPrivateFieldSet(this, _children, null);
    } else if (baseItem.startsWith('.')) {
      _classPrivateFieldGet(this, _classes).push(baseItem.slice(1));

      console.warn(WARN_UNSAFE_GLOBAL(this.className, baseItem));
    } else {
      _classPrivateFieldGet(this, _classes).push((0, _nameModificator.default)(baseItem));
      /*if (parentData) {
      	if (parentData.subclasses.includes(baseItem)) {
      		this.#classes.push((this.#rootName + '__' + baseItem));
      	} else {
      		this.#classes.push((parentData.baseViewName + '__' + baseItem));
      	}
      } else throw new Error(`[JSVN] Root node of "${this.className}" cannot be based on local classes, import class "${baseItem}" before using.`);*/

    }

    return true;
  }

  if (baseItem instanceof SourceNode || baseItem.isSubNode) {
    if (baseNode) throw new Error("[JSVN] Node is based on multiple views: \"".concat(baseNode.className, "\", \"").concat(baseItem.className, "\". Multiple inheritance is not allowed."));
    baseNode = baseItem.isSubNode && baseItem.value || baseItem;

    _classPrivateFieldSet(this, _tagName, baseNode.tagName);

    var _iterator7 = _createForOfIteratorHelper(_classPrivateFieldGet(baseNode, _classes)),
        _step7;

    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        var baseViewClass = _step7.value;

        _classPrivateFieldGet(this, _classes).push(baseViewClass);
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }

    _classPrivateFieldGet(this, _classes).push(baseNode.className);

    if (baseItem instanceof SourceNode) dependencies.add(baseNode);
    return baseNode;
  }

  if (baseItem instanceof _Pointer.default) {
    if (baseItem.type === _Pointer.default.types.BASE_NODE) throw new Error("[JSVN] Base node named \"".concat(baseItem.value, "\" was not found in the base View."));
    if (baseItem.type === _Pointer.default.types.CLASS_IMPORT) _classPrivateFieldGet(this, _classes).push(baseItem.value);
    return true;
  }

  if (baseItem === _$$.default.__) throw new Error("[JSVN] Base node named \"".concat(_classPrivateFieldGet(this, _nodeName), "\" was not found in the parent node of the base View."));

  if (typeof baseItem === 'function') {
    _classPrivateFieldGet(this, _classes).push(baseItem);

    return true;
  }

  return false;
};

var _parseBases2 = function _parseBases2(bases, dependencies, parentData) {
  bases.reverse();
  var baseNode = null;

  var _iterator8 = _createForOfIteratorHelper(bases),
      _step8;

  try {
    for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
      var baseItem = _step8.value;

      var result = _classPrivateMethodGet(this, _parseBaseItem, _parseBaseItem2).call(this, baseItem, baseNode, dependencies, parentData);

      if (result instanceof SourceNode) baseNode = result;
      if (!result) throw new Error('[JSVN] Node base must be string, global, base child or View.');
    }
  } catch (err) {
    _iterator8.e(err);
  } finally {
    _iterator8.f();
  }

  return baseNode;
};

var _basedOn2 = function _basedOn2(baseNode) {
  _classPrivateFieldSet(this, _preset, _objectSpread({}, _classPrivateFieldGet(baseNode, _preset)));

  _classPrivateFieldSet(this, _params, _objectSpread({}, _classPrivateFieldGet(baseNode, _params)));

  _classPrivateFieldSet(this, _inline, _objectSpread({}, _classPrivateFieldGet(baseNode, _inline)));

  _classPrivateFieldSet(this, _events, _objectSpread({}, _classPrivateFieldGet(baseNode, _events)));

  _classPrivateFieldSet(this, _envGens, _objectSpread({}, _classPrivateFieldGet(baseNode, _envGens)));

  _classPrivateFieldSet(this, _envVals, _objectSpread({}, _classPrivateFieldGet(baseNode, _envVals)));

  _classPrivateFieldSet(this, _condition, _classPrivateFieldGet(baseNode, _condition));

  _classPrivateFieldSet(this, _repeatFor, _classPrivateFieldGet(baseNode, _repeatFor) && _objectSpread({}, _classPrivateFieldGet(baseNode, _repeatFor)));

  _classPrivateFieldSet(this, _envMod, _classPrivateFieldGet(baseNode, _envMod));

  _classPrivateFieldSet(this, _pureHTML, _classPrivateFieldGet(baseNode, _pureHTML));

  if (_classPrivateFieldGet(this, _children) && _classPrivateFieldGet(baseNode, _children)) _classPrivateFieldSet(this, _children, _toConsumableArray(_classPrivateFieldGet(baseNode, _children)));
};

var _parseBodyItem2 = function _parseBodyItem2(css, key, value, selector, isRootNode, subclasses, baseViewName, typeMixing, dependencies) {
  if (key === '$') key = {
    type: _symbols.default.TEXT,
    isSimple: true
  };

  if (key === '$$') {
    _classPrivateFieldSet(this, _pureHTML, value);

    return true;
  } //sys param


  if (typeof key === 'string') {
    if (key.startsWith('__')) {
      key = key.slice(2);

      if (key === 'IF') {
        if (isRootNode) throw new Error(ERROR_TOP_PROPS(this.className));
        if (typeof value !== 'function') throw new Error("[JSVN] Incorrect value type for key '__IF' in node '".concat(this.className, "'. Must be function."));

        _classPrivateFieldSet(this, _condition, value);

        return true;
      }

      if (key === 'EACH' || key === 'EACH_invert') {
        if (isRootNode) throw new Error(ERROR_TOP_PROPS(this.className));
        if (_classPrivateFieldGet(this, _repeatFor)) throw new Error("[JSVN] Duplicate '__EACH(_invert)' key in node '".concat(this.className, "'."));

        if (_typeof(value) === 'object') {
          if (typeof value.list === 'function') {
            _classPrivateFieldSet(this, _repeatFor, {
              list: value,
              invert: key.length === 11
            });

            return true;
          }
        } else if (typeof value === 'function') {
          _classPrivateFieldSet(this, _repeatFor, {
            list: value,
            invert: key.length === 11
          });

          return true;
        }

        throw new Error("[JSVN] Incorrect value type for key '__EACH(_invert)' in node '".concat(this.className, "'. Must be function or object with 'list' function."));
      }

      if (key === 'env') {
        if (isRootNode) throw new Error(ERROR_TOP_PROPS(this.className));
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

      if (key === 'mods') {
        if (Array.isArray(value)) {
          _classPrivateFieldSet(this, _mods, [].concat(_toConsumableArray(_classPrivateFieldGet(this, _mods)), _toConsumableArray(value)));

          return true;
        } else throw new Error("[JSVN] Incorrect '__mods' value in node '".concat(this.className, "', must be array of functions returns strings/globals."));
      }

      if (key.startsWith('on') && typeof value === 'function') {
        _classPrivateFieldGet(this, _events)[key.slice(2)] = value;
        return true;
      }

      return false;
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
    /*if (key.startsWith('--')) {
    	key = { type: symbols.MOD, name: key, condition: null };
    } else */


    if (key.startsWith('#')) {
      key = {
        type: _symbols.default.SOURCE,
        name: key.slice(1),
        isSimple: true
      };
    }
  } //styleNodeParsers


  var parser = (0, _styleParsers.default)(css, key, value, selector, this.viewName);

  if (parser) {
    if (typeof parser === 'string') {
      //if (subclasses[parser]) throw new Error(`[JSVN] Duplicate class name "${parser}". If you need to set common styles for multiple nodes, inherit nodes from a local class.`);
      subclasses[parser] = {
        isNode: false
      };
    } else if (typeof parser === 'function') {
      _classPrivateFieldGet(this, _mods).push(function () {
        return parser.apply(void 0, arguments) && key;
      }); //else throw new Error(`[JSVN] Modificator "${classMod}" without condition. Add condition ("__ON:") to modificator.`);

    }

    return true;
  } //inline style


  if (typeof key === 'string' && typeof value === 'function') {
    _classPrivateFieldGet(this, _inline)[key] = value;
    return true;
  }

  if (Array.isArray(key)) {
    //view / custom component
    if (typeof value === 'function') {
      if (key[0] instanceof SourceNode) dependencies.add(key[0]);

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
      if (key.isSimple) typeMixing.haveSimple = true;else typeMixing.haveSymbol = true;

      _classPrivateFieldGet(this, _children).push(value);

      return true;
    }

    if (key.type === _symbols.default.SOURCE) {
      //sourceNode
      if (_classPrivateFieldGet(this, _children)) {
        if (key.name) {
          if (subclasses[key.name]) throw new Error("[JSVN] Duplicate node name \"".concat(key.name, "\". If you need to set common styles for multiple nodes, inherit nodes from a local class."));
          subclasses[key.name] = {
            isNode: true
          };
          if (key.isSimple) typeMixing.haveSimple = true;else typeMixing.haveSymbol = true;
        }

        var basePointer = _classStaticPrivateMethodGet(SourceNode, SourceNode, _getBaseIndex).call(SourceNode, key, _classPrivateFieldGet(this, _children));

        var childCSS;

        var getCSS = function getCSS(v) {
          return childCSS = v;
        };

        if (basePointer >= 0) key.base.push({
          value: _classPrivateFieldGet(this, _children)[basePointer],
          isSubNode: true
        });
        var childNode = new SourceNode(dependencies, getCSS, value, key.base, key.name, selector, this.viewName, {
          subclasses: subclasses,
          baseViewName: baseViewName
        });
        if (basePointer >= 0) _classPrivateFieldGet(this, _children)[basePointer] = childNode;else _classPrivateFieldGet(this, _children).push(childNode);
        if (childCSS) css.childs += childCSS;
      } else throw new Error('[JSVN] Child node in self-closing tag. Self-closing tag must not have children.');

      return true;
    }
    /*if (key.type === symbols.MOD) {
    	const parser = styleParsers(css, key.name, value, selector, this.viewName);
    	if (parser) {
    		console.log('PARSER', parser);
    		const classMod = key.name;
    		if (key.condition) this.#mods.push((...envs)=>key.condition(...envs) && classMod);
    		else if (typeof parser === 'function') this.#mods.push((...envs)=>parser(...envs) && classMod);
    		else throw new Error(`[JSVN] Modificator "${classMod}" without condition. Add condition ("__ON:") to modificator.`);
    		return true;
    	}
    }*/

  } //ERROR


  return false;
};

var _parseContent2 = function _parseContent2(dependencies, content, selector, isRootNode, baseViewName) {
  var css = {
    styles: '',
    childs: ''
  };
  var subclasses = {};
  var contentEntries;
  if (Array.isArray(content)) contentEntries = content;else contentEntries = Object.entries(content);
  var typeMixing = {};

  var _iterator9 = _createForOfIteratorHelper(contentEntries),
      _step9;

  try {
    for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
      var _step9$value = _slicedToArray(_step9.value, 2),
          key = _step9$value[0],
          value = _step9$value[1];

      if (!_classPrivateMethodGet(this, _parseBodyItem, _parseBodyItem2).call(this, css, key, value, selector, isRootNode, subclasses, baseViewName, typeMixing, dependencies)) {
        var keyType = _typeof(key);

        throw new Error("[JSVN] Incorrect key (".concat(keyType, ") '").concat(keyType === 'string' ? key : '*', "' of node '").concat(this.className, "'"));
      }
    }
  } catch (err) {
    _iterator9.e(err);
  } finally {
    _iterator9.f();
  }

  if (typeMixing.haveSimple && typeMixing.haveSymbol) throw new Error("[JSVN] Simple-key nodes ($:, '#name':) and symbol-key nodes ([$$.text]:, [$$`name`]:) are mixed in node \"".concat(this.className, "\" of view \"").concat(this.viewName, "\". Don not mix different types of child nodes in same parent node."));
  return css;
};