'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ShizukuComponentManager = function () {
  function ShizukuComponentManager(options) {
    _classCallCheck(this, ShizukuComponentManager);

    this._options = options;
  }

  /** Menuのためのコンポーネントを返す */


  _createClass(ShizukuComponentManager, [{
    key: 'getComponentsForMenu',
    value: function getComponentsForMenu() {
      return this._options.components;
    }

    /** コンストラクタの名前をキーとしたコンポーネントの一覧を返す */

  }, {
    key: 'getComponentMap',
    value: function getComponentMap() {
      var componentMap = {};
      this._options.components.forEach(function (child) {
        child.children.forEach(function (leaf) {
          componentMap[leaf.constructor.name] = leaf.constructor;
        });
      });
      return componentMap;
    }

    /**
     * Itemを探す
     *
     * まず最初にitemsを探し、その後windowを探す
     */

  }, {
    key: 'findComponentConstructor',
    value: function findComponentConstructor(name) {
      var componentMap = this.getComponentMap();
      var component = componentMap[name];
      if (!component) {
        throw 'Item is not defined: ' + name;
      }
      return component;
    }
  }]);

  return ShizukuComponentManager;
}();

exports.default = ShizukuComponentManager;