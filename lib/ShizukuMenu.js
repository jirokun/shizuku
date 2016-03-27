'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils');

var _ComponentList = require('./components/ComponentList');

var _ComponentList2 = _interopRequireDefault(_ComponentList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ShizukuMenu = function () {
  function ShizukuMenu(el, shizuku, shizukuComponentManager) {
    _classCallCheck(this, ShizukuMenu);

    this._el = el;
    this._shizuku = shizuku;
    this._shizukuComponentManager = shizukuComponentManager;
    this.initializeEvents();
  }

  _createClass(ShizukuMenu, [{
    key: 'initializeEvents',
    value: function initializeEvents() {
      $(this._el).on('click', '.file-dropdown', this.createSaveLink.bind(this));
      $(this._el).on('change', '.load-file', this.onFileSelected.bind(this));
      $(this._el).on('click', '.add-component', this.onClickAddComponent.bind(this));
      $(this._el).on('click', '.run', this.run.bind(this));
    }
  }, {
    key: 'run',
    value: function run() {
      this._shizuku.run();
    }
  }, {
    key: 'createSaveLink',
    value: function createSaveLink() {
      var json = this._shizuku.toJSON();
      var dataURI = "data:application/octet-stream," + encodeURIComponent(JSON.stringify(json, null, 2));
      this.saveEl.setAttribute('href', dataURI);
    }
  }, {
    key: 'onClickAddComponent',
    value: function onClickAddComponent(e) {
      var type = e.target.dataset.type;
      this._shizuku.addComponent(type);
    }
  }, {
    key: 'onFileSelected',
    value: function onFileSelected(e) {
      var _this = this;

      if (e.target.files.length !== 1) {
        return;
      }

      // 一度要素をクリア
      var reader = new FileReader();
      reader.onload = function (e) {
        var state = JSON.parse(e.target.result);
        _this._shizuku.load(state);
      };
      var file = e.target.files[0];
      reader.readAsText(file, 'UTF-8');
    }
  }, {
    key: 'buildMenu',
    value: function buildMenu() {
      return '\n      <nav class="shizuku-menu navbar navbar-inverse">\n        <div class="container-fluid">\n          <div class="navbar-header">\n            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar">\n              <span class="sr-only"> Toggle navigation</span>\n              <span class="icon-bar"></span>\n              <span class="icon-bar"></span>\n              <span class="icon-bar"></span>\n            </button>\n            <a class="navbar-brand">SHIZUKU - 雫 -</a>\n          </div>\n          <div id="navbar" class="navbar-collapse collapse">\n            <ul class="nav navbar-nav">\n              <li class="dropdown">\n                <a href="#" class="file-dropdown dropdown-toggle" data-toggle="dropdown"> <span>File </span> <span class="caret"></span></a>\n                <ul class="dropdown-menu inverse-dropdown">\n                  <li><a class="save-link" download="dump.json">Save</a></li>\n                  <li><label><input class="load-file" type="file" accept=".json"><span>Load</span></label></li>\n                </ul>\n              </li>\n              <li class="dropdown">\n                <a href="#" class="dropdown-toggle" data-toggle="dropdown"><span>Add </span><span class="caret"></span></a>\n                <ul class="add-component-list dropdown-menu inverse-dropdown"></ul>\n              </li>\n              <li><a class="run" href="#">Run</a></li>\n            </ul>\n          </div>\n        </div>\n      </nav>';
    }
  }, {
    key: 'render',
    value: function render() {
      this._el.innerHTML = this.buildMenu();
      var menu = this._shizukuComponentManager.getComponentsForMenu();
      var addMenu = this._el.querySelector('.add-component-list');
      menu.forEach(function (childMenu) {
        var $li = $('<li class="dropdown-submenu"><a href="#" class="dropdown-toggle" data-toggle="dropdown">' + childMenu.label + '</li>').appendTo(addMenu);
        var dropdown = $('<ul class="add-component-list dropdown-menu inverse-dropdown"></ul>').appendTo($li);
        childMenu.children.forEach(function (child) {
          $('<li><a href="#" class="add-component" data-type="' + child.constructor.name + '">' + child.label + '</a></li>').appendTo(dropdown);
        });
      });
      this.saveEl = this._el.querySelector('.save-link');
    }
  }]);

  return ShizukuMenu;
}();

exports.default = ShizukuMenu;