"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.object.values");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.weak-map");

require("core-js/modules/esnext.weak-map.delete-all");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var _type = new WeakMap();

var _value = new WeakMap();

var Pointer = /*#__PURE__*/function () {
  _createClass(Pointer, [{
    key: "type",
    get: function get() {
      return _classPrivateFieldGet(this, _type);
    }
  }, {
    key: "value",
    get: function get() {
      return _classPrivateFieldGet(this, _value);
    }
  }], [{
    key: "types",
    get: function get() {
      return _classStaticPrivateFieldSpecGet(this, Pointer, _types);
    }
  }]);

  function Pointer(value, type) {
    _classCallCheck(this, Pointer);

    _type.set(this, {
      writable: true,
      value: void 0
    });

    _value.set(this, {
      writable: true,
      value: void 0
    });

    if (!value || typeof value !== 'string') throw new Error('[JSVN] Pointer incorrect value. Must be not empty string.');

    _classPrivateFieldSet(this, _value, value);

    if (Object.values(_classStaticPrivateFieldSpecGet(Pointer, Pointer, _types)).includes(type)) _classPrivateFieldSet(this, _type, type);else throw new Error('[JSVN] Pointer incorrect type. Must be one of "Pointer.types".');
  }

  return Pointer;
}();

exports.default = Pointer;
var _types = {
  writable: true,
  value: {
    CLASS_IMPORT: Symbol(),
    BASE_NODE: Symbol()
  }
};