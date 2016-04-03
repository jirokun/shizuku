'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _InputComponent2 = require('../../base/InputComponent');

var _InputComponent3 = _interopRequireDefault(_InputComponent2);

var _utils = require('../../../utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableInputComponent = function (_InputComponent) {
  _inherits(TableInputComponent, _InputComponent);

  function TableInputComponent() {
    var _Object$getPrototypeO;

    _classCallCheck(this, TableInputComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TableInputComponent)).call.apply(_Object$getPrototypeO, [this].concat(args)));
  }

  _createClass(TableInputComponent, [{
    key: 'buildTitle',
    value: function buildTitle() {
      return "汎用テーブルローダー";
    }
  }, {
    key: 'buildBody',
    value: function buildBody() {
      return '\n      <form>\n        <table class="table-form">\n          <tbody>\n            <tr>\n              <th>対象のテーブル</th>\n              <th>\n                <select name="targetValue" class="target-table">\n                  <option value="users">ユーザ情報</option>\n                  <option value="transactions">取引情報</option>\n                </select>\n              </th>\n            </tr>\n          </tbody>\n        </table>\n      </form>';
    }
  }, {
    key: 'getOriginalOutputFields',
    value: function getOriginalOutputFields() {
      var _this2 = this;

      // initializedされる前はsourceComponentsなどを取得できない
      if (!this.initialized) {
        return [];
      }
      var targetTable = this._el.querySelector('.target-table').value;
      if (targetTable === 'users') {
        return [{ label: 'ユーザID', field: 'id' }, { label: '姓', field: 'sei' }, { label: '名', field: 'mei' }, { label: '年齢', field: 'age' }, { label: '会社名', field: 'employment' }, { label: '従業員数', field: 'employee_number' }, { label: '専門コード', field: 'specialty' }, { label: '最終ログイン日時', field: 'last_login' }].map(function (f) {
          f.ownerId = _this2.getRuntimeTableName();
          return f;
        });
      } else if (targetTable === 'transactions') {
        return [{ label: 'ユーザID', field: 'user_id' }, { label: '金額', field: 'amount' }, { label: '取引日時', field: 'created_date' }].map(function (f) {
          f.ownerId = _this2.getRuntimeTableName();
          return f;
        });
      }
    }
  }, {
    key: 'getUsedFields',
    value: function getUsedFields() {
      return $.map($(this._el).find('select.condition-field'), function (el) {
        return $(el).val();
      });
    }
  }, {
    key: 'getOutputTableName',
    value: function getOutputTableName() {
      return this._el.querySelector('.target-table').value;
    }
  }, {
    key: 'buildSQL',
    value: function buildSQL() {
      var sc = this.getSourceComponents()[0];
      var id = sc.getId();
      var value = this.getValue();
      var sql = 'select ';
      sql += Array.from(fields).map(_utils.decodeField).map(function (f) {
        return f.ownerId + '.' + f.field;
      }).join(',');
      sql += ' from ' + id + ' ';
      sql += ' where ';
      sql += value.map(function (v) {
        return v.field.replace(/:/, '.') + ' ' + v.type + ' \'' + v.value + '\'';
      }).join(",");
      return sql;
    }
  }]);

  return TableInputComponent;
}(_InputComponent3.default);

exports.default = TableInputComponent;