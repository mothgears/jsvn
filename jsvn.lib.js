// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"MUEI":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  SOURCE: Symbol(),
  TEXT: Symbol()
};
exports.default = _default;
},{}],"RVoP":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var _type = new WeakMap();

var _value = new WeakMap();

class Pointer {
  static get types() {
    return _classStaticPrivateFieldSpecGet(this, Pointer, _types);
  }

  get type() {
    return _classPrivateFieldGet(this, _type);
  }

  get value() {
    return _classPrivateFieldGet(this, _value);
  }

  constructor(value, type) {
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

}

exports.default = Pointer;
var _types = {
  writable: true,
  value: {
    CLASS_IMPORT: Symbol(),
    BASE_NODE: Symbol()
  }
};
},{}],"dVQR":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsman = _interopRequireDefault(require("jsman"));

var _symbols = _interopRequireDefault(require("./symbols.js"));

var _Pointer = _interopRequireDefault(require("./Pointer.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function $$(...args) {
  //Node with/out base
  if (Array.isArray(args[0]) && typeof args[0][0] === 'string') {
    const name = args[0][0];

    if (name.endsWith(' ')) {
      return (...base) => (0, _jsman.default)({
        type: _symbols.default.SOURCE,
        name: name.trim(),
        base
      });
    } else {
      return (0, _jsman.default)({
        type: _symbols.default.SOURCE,
        name
      });
    }
  }

  return (0, _jsman.default)(args);
}

Object.defineProperty($$, 'text', {
  get() {
    return (0, _jsman.default)({
      type: _symbols.default.TEXT
    });
  }

});

$$.__ = base => {
  if (Array.isArray(base) && typeof base[0] === 'string') base = base[0];
  if (!base || typeof base !== 'string') throw new Error('[JSVN] Incorrect base name.');
  return new _Pointer.default(base, _Pointer.default.types.BASE_NODE);
};

$$.import = className => {
  if (!className || typeof className !== 'string') throw new Error('[JSVN] Incorrect imported className.');
  return new _Pointer.default(className, _Pointer.default.types.CLASS_IMPORT);
};

$$.arrayFrom = jsvn => _jsman.default.arrayFrom(jsvn);

$$.mapFrom = jsvn => _jsman.default.mapFrom(jsvn);

var _default = $$;
exports.default = _default;
},{"./symbols.js":"MUEI","./Pointer.js":"RVoP"}],"XCHM":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = nodeName =>
/*(this.#rootName?(this.#rootName+'__'):'')*/
'jsvn_' + nodeName;

exports.default = _default;
},{}],"C53G":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = styleNodeBodyParser;

var _nameModificator = _interopRequireDefault(require("./nameModificator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const toKebab = str => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

const types = {
  '.': it => it.parentSelector + '>.' + (0, _nameModificator.default)(it.key.slice(1)),
  ':': it => it.parentSelector + it.key
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

function styleNodeParser(key, content, parentSelector = null, viewName = null) {
  let selector;
  const type = types[key[0]];
  if (type) selector = type({
    key,
    content,
    parentSelector,
    viewName
  });else throw new Error('[JSVN] Unknown selector type.');
  const css = {
    styles: '',
    childs: ''
  };

  for (let [key, value] of Object.entries(content)) {
    if (!styleNodeBodyParser(css, key, value)) {
      const keyType = typeof key;
      throw new Error(`[JSVN] Incorrect key (${keyType}) '${keyType === 'string' ? key : '*'}' of node`);
    }
  }

  return [selector + ' {\n' + css.styles + '}\n\n' + css.childs];
}
},{"./nameModificator.js":"XCHM"}],"vsh3":[function(require,module,exports) {
"use strict";

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

function _classStaticPrivateMethodGet(receiver, classConstructor, method) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } return method; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

let classNamesIndex = 0;

const ERROR_TOP_PROPS = className => `[JSVN] Node "${className}" has a render operator or env modifier, main node must not have "__IF", "__EACH" or '__env' properties.`;

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

var _rootName = new WeakMap();

var _renderOnce = new WeakSet();

var _parseBaseItem = new WeakSet();

var _parseBases = new WeakSet();

var _basedOn = new WeakSet();

var _parseBodyItem = new WeakSet();

var _parseContent = new WeakSet();

class SourceNode {
  get tagName() {
    return _classPrivateFieldGet(this, _tagName);
  }

  get className() {
    return (0, _nameModificator.default)(_classPrivateFieldGet(this, _nodeName));
  }

  get viewName() {
    return _classPrivateFieldGet(this, _rootName) || _classPrivateFieldGet(this, _nodeName);
  }

  constructor(cssReceiver = null, _content = null, base = null, name = null, parentSelector = null, rootName = null, _parentData = null) {
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

    _children.set(this, {
      writable: true,
      value: []
    });

    _rootName.set(this, {
      writable: true,
      value: null
    });

    if (!cssReceiver) return;

    _classPrivateFieldSet(this, _rootName, rootName);

    if (_classPrivateFieldGet(this, _rootName)) _classPrivateFieldSet(this, _nodeName, name || 'node' + _classPrivateFieldGet(this, _classId));else _classPrivateFieldSet(this, _nodeName, name || 'View' + _classPrivateFieldGet(this, _classId));

    const _baseViewName = base && _classPrivateMethodGet(this, _parseBases, _parseBases2).call(this, base, _parentData);

    let _selector = '.' + this.className;

    if (parentSelector) _selector = parentSelector + '>' + _selector;
    let _css = {
      styles: '',
      childs: ''
    };
    if (_content) _classPrivateMethodGet(this, _parseContent, _parseContent2).call(this, _css, _content, _selector, !parentSelector, _baseViewName);
    _css = _selector + ' {\n' + _css.styles + '}\n\n' + _css.childs;
    if (cssReceiver && typeof cssReceiver === 'function') cssReceiver(_css, this.className);
  }

  render(render, ...envs) {
    if (_classPrivateFieldGet(this, _condition) && !_classPrivateFieldGet(this, _condition).call(this, ...envs)) return null;

    if (_classPrivateFieldGet(this, _repeatFor)) {
      const list = _classPrivateFieldGet(this, _repeatFor).call(this, ...envs);

      const renderedNodes = [];

      if (Array.isArray(list)) {
        for (const itemEnv of list) {
          const renderedNode = _classPrivateMethodGet(this, _renderOnce, _renderOnce2).call(this, render, itemEnv, ...envs);

          renderedNodes.push(renderedNode);
        }
      }

      return renderedNodes;
    } else {
      return _classPrivateMethodGet(this, _renderOnce, _renderOnce2).call(this, render, ...envs);
    }
  }

}

exports.default = SourceNode;

var _getBaseIndex = function _getBaseIndex(key, children) {
  let basePointer = null;

  if (key.base) {
    if (!key.base.length) basePointer = key.name;else {
      basePointer = key.base.indexOf(_$$.default.__);

      if (basePointer >= 0) {
        delete key.base[basePointer];
        basePointer = key.name;
      } else {
        basePointer = key.base.findIndex(b => b instanceof _Pointer.default && b.type === _Pointer.default.types.BASE_NODE);

        if (basePointer >= 0) {
          delete key.base[basePointer];
          basePointer = key.name;
        } else basePointer = null;
      }
    }
  }

  if (basePointer) basePointer = children.findIndex(child => {
    if (child instanceof SourceNode) return _classPrivateFieldGet(child, _nodeName) === basePointer;
    return false;
  });else return -1;
  return basePointer;
};

var _renderOnce2 = function _renderOnce2(render, ...envs) {
  if (_classPrivateFieldGet(this, _envMod)) {
    if (typeof _classPrivateFieldGet(this, _envMod) === 'function') envs[0] = _classPrivateFieldGet(this, _envMod).call(this, ...envs);else envs[0] = _classPrivateFieldGet(this, _envMod);
  } else {
    let newEnv = null;

    for (const [key, value] of Object.entries(_classPrivateFieldGet(this, _envVals))) {
      if (!newEnv) newEnv = {};
      newEnv[key] = value;
    }

    for (const [key, lambda] of Object.entries(_classPrivateFieldGet(this, _envGens))) {
      if (!newEnv) newEnv = {};
      newEnv[key] = lambda(...envs);
    }

    if (newEnv) {
      if (typeof envs[0] === 'object') envs[0] = _objectSpread(_objectSpread({}, envs[0]), newEnv);else envs[0] = newEnv;
    }
  }

  let renderedChildren = null;

  if (_classPrivateFieldGet(this, _children)) {
    renderedChildren = [];

    for (const child of _classPrivateFieldGet(this, _children)) {
      let rendered = child;
      if (child instanceof SourceNode) rendered = child.render(render, ...envs);else if (typeof child === 'function') rendered = child(...envs);else if (Array.isArray(child)) {
        const [component, props] = child;
        if (component instanceof _$$.default.View) rendered = component.render(props(...envs));else if (typeof component === 'function') rendered = component(props(...envs));else throw new Error(`[JSVN] Unknown child type: "${typeof component}"`);
      }

      if (Array.isArray(rendered)) {
        for (const renderedNode of rendered) renderedChildren.push(renderedNode);
      } else {
        renderedChildren.push(rendered);
      }
    }
  }

  const params = _objectSpread({}, _classPrivateFieldGet(this, _preset));

  for (const [paramName, lambda] of Object.entries(_classPrivateFieldGet(this, _params))) params[paramName] = lambda(...envs);

  const events = {};

  for (const [paramName, lambda] of Object.entries(_classPrivateFieldGet(this, _events))) events[paramName] = lambda(...envs);

  const style = {};

  for (const [styleName, lambda] of Object.entries(_classPrivateFieldGet(this, _inline))) style[styleName] = lambda(...envs);

  const classes = [..._classPrivateFieldGet(this, _classes), this.className];
  return render(_classPrivateFieldGet(this, _tagName), classes, params, style, events, renderedChildren);
};

var _parseBaseItem2 = function _parseBaseItem2(baseItem, baseNode, parentData) {
  if (typeof baseItem === 'string') {
    if (baseItem.startsWith('<>')) {
      _classPrivateFieldSet(this, _tagName, baseItem.slice(2));
    } else if (baseItem.startsWith('/')) {
      _classPrivateFieldSet(this, _tagName, baseItem.slice(1));

      _classPrivateFieldSet(this, _children, null);
    } else if (baseItem.startsWith('.')) {
      _classPrivateFieldGet(this, _classes).push(baseItem.slice(1));

      console.warn(`[JSVN] Warning: node "${this.className}" is based on the global class "${baseItem}" without "$$.import()". The concise style of inheriting global styles is unsafe and may change in the future.`);
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

  if (baseItem) {
    if (baseItem instanceof SourceNode) {
      if (baseNode) throw new Error(`[JSVN] Node is based on multiple views: "${baseNode.className}", "${baseItem.className}". Multiple inheritance is not allowed.`);
      baseNode = baseItem;

      _classPrivateFieldSet(this, _tagName, baseNode.tagName);

      for (const baseViewClass of _classPrivateFieldGet(baseNode, _classes)) {
        _classPrivateFieldGet(this, _classes).push(baseViewClass);
      }

      _classPrivateFieldGet(this, _classes).push(baseNode.className);

      return baseNode;
    }

    if (baseItem instanceof _Pointer.default) {
      if (baseItem.type === _Pointer.default.types.BASE_NODE) throw new Error(`[JSVN] Base node named "${baseItem.value}" was not found in the base View.`);
      if (baseItem.type === _Pointer.default.types.CLASS_IMPORT) _classPrivateFieldGet(this, _classes).push(baseItem.value);
      return true;
    }

    if (baseItem === _$$.default.__) throw new Error(`[JSVN] Base node named "${_classPrivateFieldGet(this, _nodeName)}" was not found in the parent node of the base View.`);
  }

  return false;
};

var _parseBases2 = function _parseBases2(bases, parentData) {
  bases.reverse();
  let baseNode = null;

  for (let baseItem of bases) {
    const result = _classPrivateMethodGet(this, _parseBaseItem, _parseBaseItem2).call(this, baseItem, baseNode, parentData);

    if (result instanceof SourceNode) baseNode = result;
    if (!result) throw new Error('[JSVN] Node base must be string, import, base child or View.');
  }

  if (baseNode) {
    _classPrivateMethodGet(this, _basedOn, _basedOn2).call(this, baseNode);

    return baseNode.viewName;
  }

  return false;
};

var _basedOn2 = function _basedOn2(baseNode) {
  _classPrivateFieldSet(this, _preset, _objectSpread({}, _classPrivateFieldGet(baseNode, _preset)));

  _classPrivateFieldSet(this, _params, _objectSpread({}, _classPrivateFieldGet(baseNode, _params)));

  _classPrivateFieldSet(this, _inline, _objectSpread({}, _classPrivateFieldGet(baseNode, _inline)));

  _classPrivateFieldSet(this, _events, _objectSpread({}, _classPrivateFieldGet(baseNode, _events)));

  _classPrivateFieldSet(this, _envGens, _objectSpread({}, _classPrivateFieldGet(baseNode, _envGens)));

  _classPrivateFieldSet(this, _envVals, _objectSpread({}, _classPrivateFieldGet(baseNode, _envVals)));

  _classPrivateFieldSet(this, _condition, _classPrivateFieldGet(baseNode, _condition));

  _classPrivateFieldSet(this, _repeatFor, _classPrivateFieldGet(baseNode, _repeatFor));

  _classPrivateFieldSet(this, _envMod, _classPrivateFieldGet(baseNode, _envMod));

  if (_classPrivateFieldGet(this, _children) && _classPrivateFieldGet(baseNode, _children)) _classPrivateFieldSet(this, _children, [..._classPrivateFieldGet(baseNode, _children)]);
};

var _parseBodyItem2 = function _parseBodyItem2(css, key, value, selector, isRootNode, subclasses, baseViewName) {
  //sys param
  if (typeof key === 'string') {
    if (key.startsWith('__')) {
      key = key.slice(2);

      if (typeof value === 'function') {
        if (key === 'IF') {
          if (isRootNode) throw new Error(ERROR_TOP_PROPS(this.className));

          _classPrivateFieldSet(this, _condition, value);

          return true;
        }

        if (key === 'EACH') {
          if (isRootNode) throw new Error(ERROR_TOP_PROPS(this.className));

          _classPrivateFieldSet(this, _repeatFor, value);

          return true;
        }
      }

      if (key === 'env') {
        if (isRootNode) throw new Error(ERROR_TOP_PROPS(this.className));
        if (_classPrivateFieldGet(this, _envGens).length || _classPrivateFieldGet(this, _envVals).length) throw new Error('[JSVN] Mixed use of __env and environment parameters (_*) is not allowed.');

        _classPrivateFieldSet(this, _envMod, value);

        return true;
      }

      if (key === 'bind') {
        if (Array.isArray(value)) {
          const [getValue, setValue] = value;
          _classPrivateFieldGet(this, _params)['value'] = getValue;

          _classPrivateFieldGet(this, _events)['change'] = env => e => setValue(env)(e.target.value);

          return true;
        }

        if (typeof value === 'string') {
          const setValue = 'set' + value[0].toUpperCase() + value.slice(1);

          _classPrivateFieldGet(this, _params)['value'] = env => env[value] || '';

          _classPrivateFieldGet(this, _events)['change'] = env => e => env[setValue](e.target.value);

          return true;
        }
      }

      if (key.startsWith('on') && typeof value === 'function') {
        _classPrivateFieldGet(this, _events)[key.slice(2)] = value;
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


  const parser = (0, _styleParsers.default)(css, key, value, selector, this.viewName);

  if (parser) {
    if (typeof parser === 'string') subclasses.push(parser);
    return true;
  } //inline style


  if (typeof key === 'string' && typeof value === 'function') {
    _classPrivateFieldGet(this, _inline)[key] = value;
    return true;
  }

  if (Array.isArray(key)) {
    //view / custom component
    if (typeof value === 'function') {
      _classPrivateFieldGet(this, _children).push([key[0], value]);

      return true;
    } //base


    key = {
      type: _symbols.default.SOURCE,
      base: key
    };
  }

  if (typeof key === 'object') {
    if (key.type === _symbols.default.TEXT) {
      _classPrivateFieldGet(this, _children).push(value);

      return true;
    }

    if (key.type === _symbols.default.SOURCE) {
      //sourceNode
      if (_classPrivateFieldGet(this, _children)) {
        let basePointer = _classStaticPrivateMethodGet(SourceNode, SourceNode, _getBaseIndex).call(SourceNode, key, _classPrivateFieldGet(this, _children));

        let childCSS;

        const getCSS = v => childCSS = v;

        if (basePointer >= 0) key.base.push(_classPrivateFieldGet(this, _children)[basePointer]);
        const childNode = new SourceNode(getCSS, value, key.base, key.name, selector, this.viewName, {
          subclasses,
          baseViewName
        });
        if (basePointer >= 0) _classPrivateFieldGet(this, _children)[basePointer] = childNode;else _classPrivateFieldGet(this, _children).push(childNode);
        if (childCSS) css.childs += childCSS;
      } else throw new Error('[JSVN] Child node in self-closing tag. Self-closing tag must not have children');

      return true;
    }
  } //ERROR


  return false;
};

var _parseContent2 = function _parseContent2(css, content, selector, isRootNode, baseViewName) {
  const subclasses = [];

  for (let [key, value] of content) {
    if (!_classPrivateMethodGet(this, _parseBodyItem, _parseBodyItem2).call(this, css, key, value, selector, isRootNode, subclasses, baseViewName)) {
      const keyType = typeof key;
      throw new Error(`[JSVN] Incorrect key (${keyType}) '${keyType === 'string' ? key : '*'}' of node '${this.className}'`);
    }
  }
};
},{"./styleParsers.js":"C53G","./symbols.js":"MUEI","./Pointer.js":"RVoP","./$$.js":"dVQR","./nameModificator.js":"XCHM"}],"dWZ4":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = void 0;

var _$$ = _interopRequireDefault(require("./$$.js"));

var _SourceNode = _interopRequireDefault(require("./SourceNode.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

var _render = new WeakMap();

class View extends _SourceNode.default {
  static get decorator() {
    return null;
  }

  constructor(...params) {
    let content = null,
        name = null,
        base = null;

    for (const param of params) {
      if (typeof param === 'string') name = param;else if (Array.isArray(param)) base = param;else content = param;
    }

    if (!content) throw new Error('[JSVN] The View must have at least an argument with jsvn-content.');
    content = _$$.default.arrayFrom(content);
    if (!new.target.render || !new.target.styles) throw new Error('[JSVN] The View inheritor must have static "render" and "styles" methods.');
    super(new.target.styles, content, base, name);

    _render.set(this, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _render, new.target.render);
  }

  render(...envs) {
    return super.render(_classPrivateFieldGet(this, _render), ...envs);
  }

}

exports.View = View;
},{"./$$.js":"dVQR","./SourceNode.js":"vsh3"}],"Focm":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _$$ = _interopRequireDefault(require("./$$.js"));

var _View = require("./View.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_$$.default.View = _View.View;
var _default = _$$.default;
exports.default = _default;
},{"./$$.js":"dVQR","./View.js":"dWZ4"}]},{},["Focm"], null)
//# sourceMappingURL=/jsvn.lib.js.map