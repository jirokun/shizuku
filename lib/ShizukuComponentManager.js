'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('utils');

var _ComponentList = require('./components/ComponentList');

var _ComponentList2 = _interopRequireDefault(_ComponentList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ShizukuComponentManager = function () {
  function ShizukuComponentManager(options) {
    _classCallCheck(this, ShizukuComponentManager);

    this._options = options.components;
  }

  /** Menuのためのコンポーネントを返す */


  _createClass(ShizukuComponentManager, [{
    key: 'getComponentsForMenu',
    value: function getComponentsForMenu() {
      return this._options.components;
    }

    /** コンストラクタの名前をキーとしたコンポーネントの一覧を返す */

  }, {
    key: 'getComponents',
    value: function getComponents() {
      this._options.components;
    }
  }]);

  return ShizukuComponentManager;
}();

exports.default = ShizukuComponentManager;