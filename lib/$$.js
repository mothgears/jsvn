"use strict";

require("core-js/modules/es.string.ends-with");

require("core-js/modules/es.string.trim");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsman = _interopRequireDefault(require("jsman"));

var _symbols = _interopRequireDefault(require("./symbols.js"));

var _Pointer = _interopRequireDefault(require("./Pointer.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function $$() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  //Node with/out base
  if (Array.isArray(args[0]) && typeof args[0][0] === 'string') {
    var name = args[0][0];

    if (name.endsWith(' ')) {
      return function () {
        for (var _len2 = arguments.length, base = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          base[_key2] = arguments[_key2];
        }

        return (0, _jsman.default)({
          type: _symbols.default.SOURCE,
          name: name.trim(),
          base: base
        });
      };
    } else {
      return (0, _jsman.default)({
        type: _symbols.default.SOURCE,
        name: name
      });
    }
  }

  return (0, _jsman.default)(args);
}

Object.defineProperty($$, 'text', {
  get: function get() {
    return (0, _jsman.default)({
      type: _symbols.default.TEXT
    });
  }
});

$$.__ = function (base) {
  if (Array.isArray(base) && typeof base[0] === 'string') base = base[0];
  if (!base || typeof base !== 'string') throw new Error('[JSVN] Incorrect base name.');
  return new _Pointer.default(base, _Pointer.default.types.BASE_NODE);
};

$$.import = function (className) {
  if (!className || typeof className !== 'string') throw new Error('[JSVN] Incorrect imported className.');
  return new _Pointer.default(className, _Pointer.default.types.CLASS_IMPORT);
};

$$.arrayFrom = function (jsvn) {
  return _jsman.default.arrayFrom(jsvn);
};

$$.mapFrom = function (jsvn) {
  return _jsman.default.mapFrom(jsvn);
};

var _default = $$;
exports.default = _default;