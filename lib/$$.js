"use strict";

require("core-js/modules/es.string.ends-with");

require("core-js/modules/es.string.trim");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsman = _interopRequireDefault(require("jsman"));

var _symbols = _interopRequireDefault(require("./symbols.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  return (0, _jsman.default)(base);
}

Object.defineProperty($$, 'text', {
  get: function get() {
    return (0, _jsman.default)({
      type: _symbols.default.TEXT
    });
  }
});

$$.on = function (event) {
  if (!Array.isArray(event)) event = event[0];
  return (0, _jsman.default)({
    type: _symbols.default.EVENT,
    event: event
  });
};

$$.arrayFrom = function (jsvn) {
  return _jsman.default.arrayFrom(jsvn);
};

$$.mapFrom = function (jsvn) {
  return _jsman.default.mapFrom(jsvn);
};

var _default = $$;
exports.default = _default;