"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.set");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.weak-map");

require("core-js/modules/esnext.set.add-all");

require("core-js/modules/esnext.set.delete-all");

require("core-js/modules/esnext.set.difference");

require("core-js/modules/esnext.set.every");

require("core-js/modules/esnext.set.filter");

require("core-js/modules/esnext.set.find");

require("core-js/modules/esnext.set.intersection");

require("core-js/modules/esnext.set.is-disjoint-from");

require("core-js/modules/esnext.set.is-subset-of");

require("core-js/modules/esnext.set.is-superset-of");

require("core-js/modules/esnext.set.join");

require("core-js/modules/esnext.set.map");

require("core-js/modules/esnext.set.reduce");

require("core-js/modules/esnext.set.some");

require("core-js/modules/esnext.set.symmetric-difference");

require("core-js/modules/esnext.set.union");

require("core-js/modules/esnext.weak-map.delete-all");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = void 0;

var _$$ = _interopRequireDefault(require("./$$.js"));

var _SourceNode2 = _interopRequireDefault(require("./SourceNode.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var _css = new WeakMap();

var _dependencies = new WeakMap();

var View = /*#__PURE__*/function (_SourceNode) {
  _inherits(View, _SourceNode);

  var _super = _createSuper(View);

  _createClass(View, [{
    key: "css",
    get: function get() {
      return _classPrivateFieldGet(this, _css);
    }
  }, {
    key: "dependencies",
    get: function get() {
      return _classPrivateFieldGet(this, _dependencies);
    }
  }]);

  function View() {
    var _this;

    _classCallCheck(this, View);

    var content = null,
        name = null,
        base = null;

    for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    for (var _i = 0, _params = params; _i < _params.length; _i++) {
      var param = _params[_i];
      if (typeof param === 'string') name = param;else if (Array.isArray(param)) base = param;else content = param;
    }

    if (!content) throw new Error('[JSVN] The View must have at least an argument with jsvn-content.');
    content = _$$.default.arrayFrom(content);
    var css;
    var dependencies = new Set();
    _this = _super.call(this, dependencies, function (val) {
      return css = val;
    }, content, base, name);

    _css.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _dependencies.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(_assertThisInitialized(_this), _css, css);

    _classPrivateFieldSet(_assertThisInitialized(_this), _dependencies, dependencies);

    return _this;
  }

  return View;
}(_SourceNode2.default);

exports.View = View;