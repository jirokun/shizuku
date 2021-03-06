'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _InputComponent = require('../../base/InputComponent');

var _InputComponent2 = _interopRequireDefault(_InputComponent);

var _OutputComponent2 = require('../../base/OutputComponent');

var _OutputComponent3 = _interopRequireDefault(_OutputComponent2);

var _OutputCsvComponent = require('./OutputCsvComponent');

var _OutputCsvComponent2 = _interopRequireDefault(_OutputCsvComponent);

var _utils = require('../../../utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OutputShellComponent = function (_OutputComponent) {
  _inherits(OutputShellComponent, _OutputComponent);

  function OutputShellComponent() {
    var _Object$getPrototypeO;

    _classCallCheck(this, OutputShellComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(OutputShellComponent)).call.apply(_Object$getPrototypeO, [this].concat(args)));
  }

  _createClass(OutputShellComponent, [{
    key: 'buildTitle',
    value: function buildTitle() {
      return "シェルスクリプト出力";
    }
  }, {
    key: 'buildBody',
    value: function buildBody() {
      var fields = this.getInputFields();
      return '\n      <form>\n        <table class="table-form bordered vertical">\n          <tbody>\n            <tr>\n              <td><input type="checkbox" class="check-all"/></td>\n              <th>出力するフィールド</th>\n            </tr>\n            ' + fields.map(function (f) {
        return '<tr><td><input type="checkbox" name="useFields" value="' + (0, _utils.encodeField)(f) + '"/></td><td>' + f.label + '</td></tr>';
      }).join('\n') + '\n          </tbody>\n        </table>\n      </form>';
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(Object.getPrototypeOf(OutputShellComponent.prototype), 'componentDidMount', this).call(this);
      $(this._el).on('change', '.check-all', this.toggleAllCheckbox.bind(this));
    }
  }, {
    key: 'toggleAllCheckbox',
    value: function toggleAllCheckbox(e) {
      var checked = $(e.target)[0].checked;
      $(this._el).find('form input[name]').prop('checked', checked);
    }

    /** このコンポーネントで使用するフィールドを返す */

  }, {
    key: 'getUsedFields',
    value: function getUsedFields() {
      return _OutputCsvComponent2.default.prototype.getUsedFields.call(this);
    }
  }, {
    key: 'buildSQL',
    value: function buildSQL() {
      return _OutputCsvComponent2.default.prototype.buildSQL.call(this);
    }
  }, {
    key: 'allCheck',
    value: function allCheck(e) {
      return _OutputCsvComponent2.default.prototype.allCheck.call(this, e);
    }
  }, {
    key: 'buildPartialSQL',
    value: function buildPartialSQL(components) {
      var sql = void 0;
      if (components.length > 1) {
        var lastComponent = components.pop();
        sql = 'with ' + components.map(function (c) {
          return c.getRuntimeTableName() + ' as (' + c.buildSQL() + ')\n';
        });
        sql += lastComponent.buildSQL();
      } else {
        sql = components[0].buildSQL();
      }
      return sql;
    }

    // TODO 外部コマンドを実行するスクリプトを生成する

  }, {
    key: 'generateExternalCommand',
    value: function generateExternalCommand() {
      var _this2 = this;

      return "";
      var components = this.getParentComponentOrderByProcess().filter(function (c) {
        return c.isExternalCompoent();
      });
      var script = components.map(function (c) {
        if (c instanceof _InputComponent2.default) {
          // InputComponentはなにも入力がない
        } else {
            // InputComponent以外は前段までのSQLが入力になる
            var partialComponents = _this2.getParentComponentOrderByProcess();
            var sql = _this2.buildPartialSQL(partialComponents);
            return 'echo "' + sql + '" | psql -h $db_host -d $db_name -U $user_name | ' + c.getExternalCommandName();
          }
      }).join('\n');
      return script;
    }
  }, {
    key: 'execute',
    value: function execute() {

      var components = this.getParentComponentOrderByProcess().filter(function (c) {
        return !(c instanceof _InputComponent2.default);
      });

      var sql = this.buildPartialSQL(components);
      var script = '#!/bin/bash\nset -eu\n\ndb_host=${1:-localhost}\ndb_name=${2:-test}\nuser_name=${3:-$(whoami)}\n\n' + this.generateExternalCommand() + '\nSQL="' + sql + '"\n\necho $SQL | psql -h $db_host -d $db_name -U $user_name\n';
      var $dlEl = $(this._el).find('a[download]');
      if ($dlEl.length === 0) {
        $dlEl = $('<a download="exec.txt">Shell DL</a>').appendTo($(this._el).find('form'));
      }
      var blob = new Blob([script], { "type": "text/plain" });
      var URL = window.URL || window.webkitURL;
      $dlEl.attr("href", URL.createObjectURL(blob));
    }
  }]);

  return OutputShellComponent;
}(_OutputComponent3.default);

exports.default = OutputShellComponent;