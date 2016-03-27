'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('../../utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ENDPOINT_OPS = {
  isSource: true,
  isTarget: true,
  endpoint: ['Dot', { radius: 6 }],
  //connector: ["Flowchart", { stub: [30, 30], cornerRadius: 5, alwaysRespectStubs: true }],
  connectorOverlays: [["Arrow", { location: 1 }]],
  maxconnections: 1
};

/**
 * Componentは必ずShizukuComponentを継承して作ること
 *
 * 必ずgetOutputFieldsを実装すること。
 * このコンポーネントを実行して後続のフィールドで取得できる
 * フィールドの一覧を記載する。
 */

var ShizukuComponent = function () {
  /** コンストラクタ. 描画するElementをとる */

  function ShizukuComponent(el, shizuku) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    _classCallCheck(this, ShizukuComponent);

    this._el = el;
    this._shizuku = shizuku;
    this.initialized = false;
    this.horintal = false; // アンカーの配置
    this._options = Object.assign({
      externalCommand: false // 外部コマンドを実行する必要があるかどうか
    }, options);
  }

  _createClass(ShizukuComponent, [{
    key: 'initJsPlumb',
    value: function initJsPlumb() {
      var jp = this._shizuku.getJsPlumb();
      var draggable = jp.draggable(this._el);
      var inputNum = this.getInputNum();
      var outputNum = this.getOutputNum();

      for (var i = 0; i < inputNum; i++) {
        var ep = jp.addEndpoint(this._el, ENDPOINT_OPS, {
          anchor: this.inputAnchorPosition(i, inputNum)
        });
        ep.setParameter('endpointId', 'input-' + i);
        ep.setParameter('type', 'input');
      }

      for (var _i = 0; _i < outputNum; _i++) {
        var _ep = jp.addEndpoint(this._el, ENDPOINT_OPS, {
          anchor: this.outputAnchorPosition(_i, outputNum),
          maxConnections: 10
        });
        _ep.setParameter('endpointId', 'output-' + _i);
        _ep.setParameter('type', 'output');
      }
    }

    /**
     * 指定したインデックスのAnchorを削除する
     */

  }, {
    key: 'deleteInputEndpoint',
    value: function deleteInputEndpoint(index) {
      var jp = this._shizuku.getJsPlumb();
      var endpoints = this.getInputEndpoints();
      var targetEndpoint = endpoints.find(function (e) {
        return e.getParameter('endpointId') === 'input-' + index;
      });
      if (!targetEndpoint) {
        throw 'invalid index: ' + index;
      }
      jp.deleteEndpoint(targetEndpoint);
      this.getInputEndpoints().forEach(function (e, i) {
        return e.setParameter('endpointId', 'input-' + i);
      });
    }

    /**
     * 指定したインデックスのAnchorを削除する
     */

  }, {
    key: 'addInputEndpoint',
    value: function addInputEndpoint() {
      var jp = this._shizuku.getJsPlumb();
      var endpoints = this.getInputEndpoints();
      var i = endpoints.length;
      var ep = jp.addEndpoint(this._el, ENDPOINT_OPS, {
        anchor: this.inputAnchorPosition(this._horizontal, i, i)
      });
      ep.setParameter('endpointId', 'input-' + i);
      ep.setParameter('type', 'input');
    }

    /** type === 'input'のendpointsを取得する */

  }, {
    key: 'getInputEndpoints',
    value: function getInputEndpoints() {
      var jp = this._shizuku.getJsPlumb();
      return jp.getEndpoints(this._el).filter(function (e) {
        return e.getParameter('type') === 'input';
      });
    }

    /**
     * endpointの位置をまとめて設定する
     */

  }, {
    key: 'setEndpointPosition',
    value: function setEndpointPosition() {
      var _this = this;

      var jp = this._shizuku.getJsPlumb();
      var endpoints = this.getInputEndpoints();
      endpoints.forEach(function (e, i) {
        return e.setAnchor(_this.inputAnchorPosition(i, endpoints.length));
      });
    }

    /** 外部コマンドの実行を必要とするかどうか */

  }, {
    key: 'isExternalCompoent',
    value: function isExternalCompoent() {
      return this._options.externalCommand;
    }
  }, {
    key: 'inputAnchorPosition',
    value: function inputAnchorPosition(i, inputNum) {
      if (this._horizontal) {
        return [(i + 1) / (inputNum + 1), 0, 0, -1];
      } else {
        return [0, (i + 1) / (inputNum + 1), -1, 0];
      }
    }
  }, {
    key: 'outputAnchorPosition',
    value: function outputAnchorPosition(i, outputNum) {
      if (this._horizontal) {
        return [(i + 1) / (outputNum + 1), 1, 0, 1];
      } else {
        return [1, (i + 1) / (outputNum + 1), 1, 0];
      }
    }

    /** DOMに追加された時一度だけ呼ばれる */

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // 入力項目が変更された時は自動的にchangeFormが呼ばれるが、
      // 独自の入力項目を定義するような場合には独自にchangeFormを呼び出す必要がある。
      $(this._el).on('change', ':input', this.changeForm.bind(this));
    }

    /** renderが呼ばれたあとに実行される */

  }, {
    key: 'onRendered',
    value: function onRendered() {}

    /** titleを生成して返す。stringまたはElementを返す。子クラスでオーバーライドすることが前提 */

  }, {
    key: 'buildTitle',
    value: function buildTitle() {
      return "";
    }

    /** bodyを生成して返す。stringまたはElementを返す。子クラスでオーバーライドすることが前提 */

  }, {
    key: 'buildBody',
    value: function buildBody() {
      return "";
    }

    /** SQLを作成するときに使用するTableName */

  }, {
    key: 'getRuntimeTableName',
    value: function getRuntimeTableName() {
      return this._el.id;
    }
  }, {
    key: 'getId',
    value: function getId() {
      return this._el.id;
    }

    /** inputのportの数を返す */

  }, {
    key: 'getInputNum',
    value: function getInputNum() {
      return 1;
    }

    /** outputのportの数を返す */

  }, {
    key: 'getOutputNum',
    value: function getOutputNum() {
      return 1;
    }

    /** componentのHTMLを生成して返す。Elementを返す */

  }, {
    key: 'buildComponent',
    value: function buildComponent() {
      var shizukuComponentEl = document.createElement('div');
      shizukuComponentEl.className = 'shizuku-component';
      shizukuComponentEl.innerHTML = '\n      <div class="shizuku-header">\n        <button type="button" class="close"><span>&times;</span></button>\n        <span class="output-info info"><i class="glyphicon glyphicon-info-sign"></i>出</span>\n        <span class="input-info info"><i class="glyphicon glyphicon-info-sign"></i>入</span>\n      </div>\n      <div class="shizuku-body"></div>';
      var shizukuHeader = shizukuComponentEl.querySelector('.shizuku-header');
      var shizukuBody = shizukuComponentEl.querySelector('.shizuku-body');
      var title = this.buildTitle() + ' <span class="element-id">(' + this.getId() + ')</span>';
      if ((0, _utils.isElement)(title)) {
        shizukuHeader.insertBefore(title, shizukuHeader.firstChild);
      } else if (typeof title === 'string') {
        var titleEl = document.createElement('span');
        titleEl.innerHTML = title;
        shizukuHeader.insertBefore(titleEl, shizukuHeader.firstChild);
      }

      var body = this.buildBody();
      if ((0, _utils.isElement)(body)) {
        shizukuBody.insertBefore(body, shizukuBody.firstChild);
      } else if (typeof title === 'string') {
        var bodyEl = document.createElement('span');
        bodyEl.innerHTML = body;
        shizukuBody.insertBefore(bodyEl, shizukuBody.firstChild);
      }
      this._outputInfoEl = shizukuComponentEl.querySelector('.output-info');
      this._inputInfoEl = shizukuComponentEl.querySelector('.input-info');
      return shizukuComponentEl;
    }

    /**
     * sourceまたはtargetのelementを取得する
     *
     * @param sourceOrTarget 'source' or 'target'
     */

  }, {
    key: '_getElements',
    value: function _getElements(sourceOrTarget) {
      var jp = this._shizuku.getJsPlumb();
      var type = sourceOrTarget === 'source' ? 'input' : 'output';
      var endpoints = jp.getEndpoints(this._el).filter(function (ep) {
        return ep.getParameter('type') === type;
      });
      var connections = (0, _utils.flatten)(endpoints.map(function (ep) {
        return ep.connections;
      }));
      var finder = sourceOrTarget === 'source' ? _utils.findSourceEndpoint : _utils.findTargetEndpoint;
      var sourceEndpoints = connections.map(function (con) {
        return finder(con);
      });
      return sourceEndpoints.map(function (ep) {
        return ep.element;
      });
    }
  }, {
    key: 'getSourceElements',
    value: function getSourceElements() {
      return this._getElements('source');
    }
  }, {
    key: 'getSourceComponents',
    value: function getSourceComponents() {
      var _this2 = this;

      return this.getSourceElements().map(function (el) {
        return _this2._shizuku.getComponent(el);
      });
    }
  }, {
    key: 'getTargetElements',
    value: function getTargetElements() {
      return this._getElements('target');
    }
  }, {
    key: 'getTargetComponents',
    value: function getTargetComponents() {
      var _this3 = this;

      return this.getTargetElements().map(function (el) {
        return _this3._shizuku.getComponent(el);
      });
    }
  }, {
    key: 'getOriginalOutputFields',
    value: function getOriginalOutputFields() {
      return [];
    }
  }, {
    key: 'getOutputFields',
    value: function getOutputFields() {
      // initializedされる前はsourceComponentsなどを取得できない
      if (!this.initialized) {
        return [];
      }
      // sourcesのfieldsを取得
      var fieldSet = new Set(this.getInputFields());
      this.getOriginalOutputFields().forEach(function (f) {
        return fieldSet.add(f);
      });
      return Array.from(fieldSet);
    }
  }, {
    key: 'getInputFields',
    value: function getInputFields() {
      // initializedされる前はsourceComponentsなどを取得できない
      if (!this.initialized) {
        return [];
      }
      // sourcesのfieldsを取得
      var sourceComponents = this.getSourceComponents();
      var sources = sourceComponents.map(function (sc) {
        return sc.getOutputFields();
      });
      var fieldSet = new Set((0, _utils.flatten)(sources));
      return Array.from(fieldSet);
    }

    /** 使用するフィールドを返す */

  }, {
    key: 'getUsedFields',
    value: function getUsedFields() {
      return [];
    }

    /** formの内容を返す */

  }, {
    key: 'getValue',
    value: function getValue() {
      var $form = $(this._el).find('form');
      return $form.values();
    }

    /** formの内容を復元する */

  }, {
    key: 'setValue',
    value: function setValue(value) {
      var $form = $(this._el).find('form');
      return $form.values(value);
    }

    /** SQLを作成する */

  }, {
    key: 'buildSQL',
    value: function buildSQL() {
      throw 'not impletented yet';
    }

    /** フォームの値が変わった時に呼び出す。関連するtargetComponentを更新し、さらにchangeFormを呼び出す。 */

  }, {
    key: 'changeForm',
    value: function changeForm() {
      this.getTargetComponents().forEach(function (c) {
        var value = c.getValue(); // backup
        c.render();
        c.setValue(value); // restore
        c.changeForm();
      });
    }

    /** 出力情報をポップアップする */

  }, {
    key: 'popupInputComponentInfo',
    value: function popupInputComponentInfo() {
      var inputTable = this.getSourceComponents().length === 0 ? '<p>None</p>' : this.getSourceComponents().map(function (c) {
        return '<h5>' + c.getId() + '</h5>\n<table class="table table-condensed component-info">\n<thead>\n  <th>生成元</th>\n  <th>ラベル</th>\n  <th>フィールドID</th>\n</thead>\n<tbody>\n  ' + c.getOutputFields().map(function (f) {
          return '<tr><td>' + f.ownerId + '</td><td>' + f.label + '</td><td>' + f.field + '</td></tr>';
        }).join('') + '\n</tbody>\n</table>';
      }).join('');

      var content = '<h4>入力情報</h4>' + inputTable;

      // popoverの作成
      var $popoverEl = $(this._inputInfoEl).popover({
        html: true,
        content: content,
        container: 'body',
        trigger: 'hover'
      });
      // 初回は表示されないためマニュアルで表示
      $popoverEl.popover('show');
    }

    /** 出力情報をポップアップする */

  }, {
    key: 'popupOutputComponentInfo',
    value: function popupOutputComponentInfo() {
      var originalOutputFields = this.getOriginalOutputFields();
      var originalOutputFieldsTable = originalOutputFields.length === 0 ? '<p>None</p>' : '\n<table class="table table-condensed component-info">\n<thead>\n  <th>生成元</th>\n  <th>ラベル</th>\n  <th>フィールドID</th>\n</thead>\n<tbody>\n  ' + originalOutputFields.map(function (f) {
        return '<tr><td>' + f.ownerId + '</td><td>' + f.label + '</td><td>' + f.field + '</td></tr>';
      }).join('') + '\n</tbody>\n</table>';

      var outputFields = this.getOutputFields();
      var outptuFieldTable = outputFields.length === 0 ? '<p>None</p>' : '\n<table class="table table-condensed component-info">\n<thead>\n  <th>生成元</th>\n  <th>ラベル</th>\n  <th>フィールドID</th>\n</thead>\n<tbody>\n  ' + outputFields.map(function (f) {
        return '<tr><td>' + f.ownerId + '</td><td>' + f.label + '</td><td>' + f.field + '</td></tr>';
      }).join('') + '\n</tbody>\n</table>';

      var content = '<h4>出力情報</h4>\n<h5>生成するフィールド</h5>\n' + originalOutputFieldsTable + '\n<h5>出力するフィールド</h5>\n' + outptuFieldTable;

      // popoverの作成
      var $popoverEl = $(this._outputInfoEl).popover({
        html: true,
        content: content,
        container: 'body',
        trigger: 'hover'
      });
      // 初回は表示されないためマニュアルで表示
      $popoverEl.popover('show');
    }

    /** 描画する */

  }, {
    key: 'render',
    value: function render(callback) {
      var _this4 = this;

      if (!this.initialized) {
        this.initJsPlumb();
      }
      var jp = this._shizuku.getJsPlumb();
      jp.batch(function () {
        _this4._el.innerHTML = '';
        _this4._el.appendChild(_this4.buildComponent());
        _this4._el.dataset.type = _this4.constructor.name;
        _this4.initialized = true;
        _this4.onRendered();
        if (callback) {
          callback();
        }
      });
    }
  }]);

  return ShizukuComponent;
}();

exports.default = ShizukuComponent;