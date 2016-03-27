'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('jquery.panzoom');

var _jquery2 = _interopRequireDefault(_jquery);

var _utils = require('./utils');

var _InputComponent = require('./components/base/InputComponent');

var _InputComponent2 = _interopRequireDefault(_InputComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Shizuku = function () {
  function Shizuku(el, shizukuComponentManager) {
    _classCallCheck(this, Shizuku);

    this._el = el;
    this._shizukuComponentManager = shizukuComponentManager;
    el.style.width = '30000px';
    el.style.height = '30000px';
    this._jp = jsPlumb.getInstance(this._el);
    this._initializeEvents();
    this._componentMap = new Map();
  }

  /************* Events ***************/


  _createClass(Shizuku, [{
    key: 'onConnect',
    value: function onConnect(info, originalEvent) {
      var tep = (0, _utils.findTargetEndpoint)(info.connection);
      var component = this.getComponent(tep.element).render();
    }
  }, {
    key: 'onDisConnect',
    value: function onDisConnect(info, originalEvent) {
      var tep = (0, _utils.findTargetEndpoint)(info.connection);
      var component = this.getComponent(tep.element).render();
    }
  }, {
    key: '_initializeEvents',
    value: function _initializeEvents() {
      var _this = this;

      // ShizukuComponentの削除ボタンのイベント
      $(this._el).on('click', '.shizuku-component .shizuku-header .close', function (e) {
        return _this.removeComponent($(e.target).parents('.shizuku-component-container')[0]);
      });
      // ShizukuComponentの情報ポップアップ用
      $(this._el).on('mouseover', '.shizuku-component .shizuku-header .input-info', function (e) {
        return _this.getComponent($(e.target).parents('.shizuku-component-container')[0]).popupInputComponentInfo();
      });
      $(this._el).on('mouseover', '.shizuku-component .shizuku-header .output-info', function (e) {
        return _this.getComponent($(e.target).parents('.shizuku-component-container')[0]).popupOutputComponentInfo();
      });
      this._initializeJsPlumbEvents();
      this._initializePanzoom();
    }
  }, {
    key: '_initializePanzoom',
    value: function _initializePanzoom() {
      var _this2 = this;

      var $panzoom = $(this._el).panzoom({
        contain: 'invert',
        minScale: 0.1,
        maxScale: 2,
        onZoom: function onZoom(e, panzoom) {
          var currentZoom = parseFloat(panzoom.getMatrix()[0]);
          // jsPlumbにも設定しておく
          _this2._jp.setZoom(currentZoom);
        }
      });
      $panzoom.parent().on('mousewheel.focal', function (e) {
        e.preventDefault();
        var delta = e.delta || e.originalEvent.wheelDelta;
        var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
        console.log(zoomOut);
        $panzoom.panzoom('zoom', zoomOut, {
          increment: 0.1,
          animate: true,
          focal: e
        });
      });
      // componentは選択できるようにイベントをキャンセル
      // see http://codepen.io/timmywil/pen/bFiqy
      $(this._el).on('mousedown touchstart', '.shizuku-component', function (e) {
        e.stopImmediatePropagation();
      });
    }
  }, {
    key: '_initializeJsPlumbEvents',
    value: function _initializeJsPlumbEvents() {
      this._jp.bind('connection', this.onConnect.bind(this));
      this._jp.bind('connectionDetached', this.onDisConnect.bind(this));
    }

    /**
     * keyにひもつくComponentを取得する
     * keyはelementまたはid
     */

  }, {
    key: 'getComponent',
    value: function getComponent(key) {
      if ((0, _utils.isElement)(key)) {
        return this._componentMap.get(key);
      } else {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this._componentMap[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2);

            var mapKey = _step$value[0];
            var mapValue = _step$value[1];

            if (key === mapKey.id) {
              return mapValue;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }
  }, {
    key: 'getZoom',
    value: function getZoom() {
      return this._jp.getZoom();
    }
  }, {
    key: 'load',
    value: function load(state) {
      var _this3 = this;

      this._jp.reset();
      this._initializeJsPlumbEvents();
      this._el.innerHTML = '';
      this._jp.batch(function () {
        state.data.forEach(function (c) {
          return _this3.addComponent(c);
        });
        // 一度endpointを作成するために値を復元。後でもう一度値を復元する
        _this3.descendingOrderProcess(function (currentComponent, parentComponents, fieldSet) {
          // formの内容をロード
          var data = state.data.find(function (d) {
            return d.id === currentComponent.getId();
          });
          currentComponent.setValue(data.value);
        });

        // コネクションをはる
        state.connections.forEach(function (c) {
          var sourceEndpoints = _this3._jp.getEndpoints(c.sourceId);
          var sep = sourceEndpoints.find(function (e) {
            return e.getParameter('endpointId') === c.sourceEndpointId;
          });
          var targetEndpoints = _this3._jp.getEndpoints(c.targetId);
          var tep = targetEndpoints.find(function (e) {
            return e.getParameter('endpointId') === c.targetEndpointId;
          });
          _this3._jp.connect({
            source: sep,
            target: tep
          });
        });
        _this3.descendingOrderProcess(function (currentComponent, parentComponents, fieldSet) {
          // レンダリング
          currentComponent.render();
          // formの内容をロード
          var data = state.data.find(function (d) {
            return d.id === currentComponent.getId();
          });
          currentComponent.setValue(data.value);
        });
      });
    }

    /**
     * コンポーネントを追加する
     *
     * @param c string | object stringの場合はtype, objectの場合はid, x, y, type
     */

  }, {
    key: 'addComponent',
    value: function addComponent(c) {
      var container = document.createElement('div');
      if ((0, _utils.isString)(c)) {
        container.id = (0, _utils.generateId)();
        container.style.left = '100px';
        container.style.top = '100px';
      } else {
        container.id = c.id;
        container.style.left = c.x + 'px';
        container.style.top = c.y + 'px';
      }
      var type = c.type || c;
      container.className = 'shizuku-component-container';
      this._el.appendChild(container);
      var constructor = this._shizukuComponentManager.findComponentConstructor(type);
      var component = new constructor(container, this);
      // レンダリング
      component.render();
      component.componentDidMount();
      this._componentMap.set(container, component);
    }
  }, {
    key: 'removeComponent',
    value: function removeComponent(el) {
      this._jp.remove(el);
      this._componentMap.delete(el);
    }
  }, {
    key: 'getJsPlumb',
    value: function getJsPlumb() {
      return this._jp;
    }

    /** jsPlumbからstateのconnectionを作成する */

  }, {
    key: 'getConnectionsDef',
    value: function getConnectionsDef() {
      return this._jp.getAllConnections().map(function (c) {
        var te = (0, _utils.findTargetEndpoint)(c);
        var se = (0, _utils.findSourceEndpoint)(c);
        return {
          sourceId: se.elementId,
          sourceEndpointId: se.getParameter('endpointId'),
          targetId: te.elementId,
          targetEndpointId: te.getParameter('endpointId')
        };
      });
    }
  }, {
    key: 'getDataDef',
    value: function getDataDef() {
      var _this4 = this;

      var shizukucomponentMap = this._el.querySelectorAll('.shizuku-component-container');
      return Array.prototype.map.call(shizukucomponentMap, function (el) {
        var left = parseInt(el.style.left);
        var top = parseInt(el.style.top);
        var type = el.dataset.type;
        var component = _this4.getComponent(el);
        var value = component.getValue();
        return { id: el.id, x: isNaN(left) ? 0 : left, y: isNaN(top) ? 0 : top, type: type, value: value };
      });
    }
  }, {
    key: '_findComponent',
    value: function _findComponent(firstOrLast) {
      var _this5 = this;

      function recurse(c) {
        var components = firstOrLast === 'first' ? c.getSourceComponents() : c.getTargetComponents();
        if (components.length === 0) return c;
        return components.map(function (s) {
          return recurse(s);
        });
      }
      var shizukucomponentMap = this._el.querySelectorAll('.shizuku-component-container');
      var allComponents = Array.prototype.map.call(shizukucomponentMap, function (el) {
        return _this5.getComponent(el);
      });
      var startComponentSet = new Set((0, _utils.flatten)(allComponents.map(function (c) {
        return recurse(c);
      })));
      return Array.from(startComponentSet);
    }

    /** 入力がない開始コンポーネントを取得する */

  }, {
    key: 'findFirstComponents',
    value: function findFirstComponents() {
      return this._findComponent('first');
    }

    /** 出力がない終了コンポーネントを取得する */

  }, {
    key: 'findLastComponents',
    value: function findLastComponents() {
      return this._findComponent('last');
    }

    /** 外部コマンドを実行するコンポーネントを取得する */

  }, {
    key: 'findExternalComponent',
    value: function findExternalComponent() {
      var externalComponents = [];
      this.descendingOrderProcess(function (c, sourceComponents, fieldSet) {
        if (c.isExternalCompoent()) {
          externalComponents.push(c);
        }
      });
      return externalComponents;
    }

    /**
     * 降順に処理する
     */

  }, {
    key: 'descendingOrderProcess',
    value: function descendingOrderProcess(func) {
      function checkFieldRecurse(c) {
        c.getUsedFields().forEach(function (f) {
          return usedFields.add(f);
        });
        c.getSourceComponents().forEach(checkFieldRecurse);
      }

      /** ownerIdのfieldSetを取得 */
      function findUsedFields(ownerId) {
        var encodedFieldSet = new Set();
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = usedFields[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var value = _step2.value;

            var field = (0, _utils.decodeField)(value);
            if (field.ownerId === ownerId) {
              encodedFieldSet.add(value);
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        return encodedFieldSet;
      }

      function buildRecurse(c) {
        var parentFieldSet = arguments.length <= 1 || arguments[1] === undefined ? new Set() : arguments[1];

        var id = c.getId();
        var tableName = c.getRuntimeTableName();

        // 実行済みのコンポーネントはパス
        if (builtSet.has(id)) {
          return;
        }

        // 親のコンポーネントが一つでも未実行だったらパス
        var sourceComponents = c.getSourceComponents();
        if (sourceComponents.some(function (pc) {
          return !builtSet.has(pc.getId());
        })) {
          return;
        };

        var fieldSet = new Set(parentFieldSet); // clone
        findUsedFields(tableName).forEach(function (f) {
          return fieldSet.add(f);
        });

        func(c, sourceComponents, fieldSet);

        builtSet.add(id);
        c.getTargetComponents().forEach(function (c) {
          return buildRecurse(c, fieldSet);
        });
      }

      // 使用するフィールドをマーク lastからたどる
      var usedFields = new Set();
      var lastComponents = this.findLastComponents();
      lastComponents.forEach(checkFieldRecurse);

      var builtSet = new Set(); // 生成済みのSet
      this.findFirstComponents().forEach(function (c) {
        return buildRecurse(c);
      });
    }

    /** SQLを作成する */

  }, {
    key: 'run',
    value: function run() {
      var _this6 = this;

      // TODO ロジックが間違っているので直す必要がある。
      // OutputComponentが複数あった場合、複数のsqlsが生成される必要があるが
      // ここではひとつしか生成されていない。明らかな謝り。
      // SQLを生成 firstからたどる
      var sqls = [];
      this.descendingOrderProcess(function (currentComponent, parentComponents, fieldSet) {
        var id = currentComponent.getId();
        if (currentComponent instanceof _InputComponent2.default) {
          sqls.push({
            id: id,
            type: 'input',
            tableName: currentComponent.getRuntimeTableName()
          });
        } else {
          var sql = currentComponent.buildSQL(fieldSet);
          if (sql !== null) {
            sqls.push({
              id: id,
              type: 'sql',
              sql: sql
            });
          }
        }
      });

      // 終了処理
      this.findLastComponents().forEach(function (c) {
        var sql = c.conbineSQL(sqls);
        c.execute(sql, _this6.findExternalComponent());
      });
    }

    /** 定義されている情報をdumpする */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        connections: this.getConnectionsDef(),
        data: this.getDataDef()
      };
    }
  }]);

  return Shizuku;
}();

exports.default = Shizuku;