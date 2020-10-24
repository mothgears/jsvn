"use strict";

require("core-js/modules/es.array.slice");

require("core-js/modules/es.object.freeze");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactJsvn = _interopRequireDefault(require("./react-jsvn.js"));

var _Button = _interopRequireDefault(require("./Button.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject3() {
  var data = _taggedTemplateLiteral(["item-opts "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["item-name "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["item"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _React = React,
    useMemo = _React.useMemo; //React Function Component with view

var List = function List(props) {
  var view = useMemo(function () {
    var _$$3;

    return new _reactJsvn.default.View(_defineProperty({
      //Memorizes view declaration with useMemo hook
      display: 'table',
      width: '100%'
    }, (0, _reactJsvn.default)(_templateObject()), (_$$3 = {
      __EACH: function __EACH(it) {
        return it.items;
      },
      //Will repeat this node for each item in 'it.items' array
      $key: function $key(item) {
        return item;
      },
      display: 'table-row',
      height: '30px',
      width: '100%',
      '.cell': {
        display: 'table-cell',
        paddingBottom: '5px',
        paddingTop: '5px',
        borderBottom: '1px solid #999'
      }
    }, _defineProperty(_$$3, (0, _reactJsvn.default)(_templateObject2())('.cell'), _defineProperty({}, _reactJsvn.default.text, function (item) {
      return item;
    })), _defineProperty(_$$3, (0, _reactJsvn.default)(_templateObject3())('.cell'), _defineProperty({
      width: '30px'
    }, (0, _reactJsvn.default)(_Button.default), {
      width: '30px',
      _label: 'X',
      //Model overloading
      _action: function _action(item, it) {
        return function () {
          return it.removeItem(item);
        };
      }
    })), _$$3)));
  }, []);
  return view.render(props);
};

var _default = List;
exports.default = _default;