"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.array.some");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.freeze");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

var _reactJsvn = _interopRequireDefault(require("./react-jsvn.js"));

var _Input = _interopRequireDefault(require("./Input.js"));

var _Button = _interopRequireDefault(require("./Button.js"));

var _ListComponent = _interopRequireDefault(require("./ListComponent.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject4() {
  var data = _taggedTemplateLiteral(["item-name "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["item-name-cnt "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["active-block"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["form"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _React = React,
    useMemo = _React.useMemo,
    useState = _React.useState;

var RootComponent = function RootComponent() {
  var _useState = useState(['alpha', 'gamma']),
      _useState2 = _slicedToArray(_useState, 2),
      items = _useState2[0],
      setItems = _useState2[1];

  var _useState3 = useState(''),
      _useState4 = _slicedToArray(_useState3, 2),
      newName = _useState4[0],
      setNewName = _useState4[1]; //Memorizes controller


  var ctrl = useMemo(function () {
    return {
      addToList: function addToList() {
        if (!newName) alert("Empty value!");else if (!items.some(function (item) {
          return item === newName;
        })) {
          setItems([].concat(_toConsumableArray(items), [newName]));
          setNewName('');
        } else alert("Item ".concat(newName, " already exist!"));
      },
      removeItem: function removeItem(item) {
        setItems(items.filter(function (i) {
          return i !== item;
        }));
      }
    };
  }, [newName, items]);
  var view = useMemo(function () {
    var _$$3, _$$5, _$$$View;

    return new _reactJsvn.default.View((_$$$View = {
      width: '100%'
    }, _defineProperty(_$$$View, (0, _reactJsvn.default)(_templateObject()), (_$$5 = {
      position: 'absolute',
      left: '50%',
      marginLeft: '-320px',
      width: '640px',
      background: '#eee',
      marginTop: '20px'
    }, _defineProperty(_$$5, (0, _reactJsvn.default)(_templateObject2()), (_$$3 = {
      display: 'table',
      width: '100%',
      marginTop: '20px',
      '.cell': {
        display: 'table-cell'
      }
    }, _defineProperty(_$$3, (0, _reactJsvn.default)(_templateObject3())('.cell'), _defineProperty({
      paddingLeft: '20px'
    }, (0, _reactJsvn.default)(_templateObject4())(_Input.default), {
      width: '520px',
      __bind: [function (it) {
        return it.newName;
      }, function (it) {
        return it.setNewName;
      }] //Bind variable to this input

    })), _defineProperty(_$$3, (0, _reactJsvn.default)('.cell'), {
      width: '20px'
    }), _defineProperty(_$$3, (0, _reactJsvn.default)('.cell'), _defineProperty({
      paddingRight: '20px'
    }, (0, _reactJsvn.default)(_Button.default), function (it) {
      return {
        //Set model for this view
        action: it.addToList,
        label: 'Add'
      };
    })), _$$3)), _defineProperty(_$$5, (0, _reactJsvn.default)(), _defineProperty({
      width: '100%',
      padding: '20px',
      boxSizing: 'border-box'
    }, (0, _reactJsvn.default)(_ListComponent.default), function (it) {
      return it;
    })), _$$5)), _defineProperty(_$$$View, "background", '#eee'), _$$$View));
  }, []);
  return view.render(_objectSpread(_objectSpread({}, ctrl), {}, {
    items: items,
    setItems: setItems,
    newName: newName,
    setNewName: setNewName
  }));
};

ReactDOM.render(React.createElement(RootComponent, {}), document.getElementById("root"));