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
        return [{ label: 'ユーザID', field: 'id' }, { label: '姓', field: 'sei' }, { label: '名', field: 'mei' }, { label: '年齢', field: 'age' }, { label: '会社名1', field: 'employment1' }, { label: '会社名2', field: 'employment2' }, { label: '会社名3', field: 'employment3' }, { label: '会社名4', field: 'employment4' }, { label: '会社名5', field: 'employment5' }, { label: '会社名6', field: 'employment6' }, { label: '会社名7', field: 'employment7' }, { label: '会社名8', field: 'employment8' }, { label: '会社名9', field: 'employment9' }, { label: '会社名10', field: 'employment10' }, { label: '会社名11', field: 'employment11' }, { label: '会社名12', field: 'employment12' }, { label: '会社名13', field: 'employment13' }, { label: '会社名14', field: 'employment14' }, { label: '会社名15', field: 'employment15' }, { label: '会社名16', field: 'employment16' }, { label: '会社名17', field: 'employment17' }, { label: '会社名18', field: 'employment18' }, { label: '会社名19', field: 'employment19' }, { label: '会社名20', field: 'employment20' }, { label: '会社名21', field: 'employment21' }, { label: '会社名22', field: 'employment22' }, { label: '会社名23', field: 'employment23' }, { label: '会社名24', field: 'employment24' }, { label: '会社名25', field: 'employment25' }, { label: '会社名26', field: 'employment26' }, { label: '会社名27', field: 'employment27' }, { label: '会社名28', field: 'employment28' }, { label: '会社名29', field: 'employment29' }, { label: '会社名30', field: 'employment30' }, { label: '会社名31', field: 'employment31' }, { label: '会社名32', field: 'employment32' }, { label: '会社名33', field: 'employment33' }, { label: '会社名34', field: 'employment34' }, { label: '会社名35', field: 'employment35' }, { label: '会社名36', field: 'employment36' }, { label: '会社名37', field: 'employment37' }, { label: '会社名38', field: 'employment38' }, { label: '会社名39', field: 'employment39' }, { label: '会社名40', field: 'employment40' }, { label: '会社名41', field: 'employment41' }, { label: '会社名42', field: 'employment42' }, { label: '会社名43', field: 'employment43' }, { label: '会社名44', field: 'employment44' }, { label: '会社名45', field: 'employment45' }, { label: '会社名46', field: 'employment46' }, { label: '会社名47', field: 'employment47' }, { label: '会社名48', field: 'employment48' }, { label: '会社名49', field: 'employment49' }, { label: '会社名50', field: 'employment50' }, { label: '会社名51', field: 'employment51' }, { label: '会社名52', field: 'employment52' }, { label: '会社名53', field: 'employment53' }, { label: '会社名54', field: 'employment54' }, { label: '会社名55', field: 'employment55' }, { label: '会社名56', field: 'employment56' }, { label: '会社名57', field: 'employment57' }, { label: '会社名58', field: 'employment58' }, { label: '会社名59', field: 'employment59' }, { label: '会社名60', field: 'employment60' }, { label: '会社名61', field: 'employment61' }, { label: '会社名62', field: 'employment62' }, { label: '会社名63', field: 'employment63' }, { label: '会社名64', field: 'employment64' }, { label: '会社名65', field: 'employment65' }, { label: '会社名66', field: 'employment66' }, { label: '会社名67', field: 'employment67' }, { label: '会社名68', field: 'employment68' }, { label: '会社名69', field: 'employment69' }, { label: '会社名70', field: 'employment70' }, { label: '会社名71', field: 'employment71' }, { label: '会社名72', field: 'employment72' }, { label: '会社名73', field: 'employment73' }, { label: '会社名74', field: 'employment74' }, { label: '会社名75', field: 'employment75' }, { label: '会社名76', field: 'employment76' }, { label: '会社名77', field: 'employment77' }, { label: '会社名78', field: 'employment78' }, { label: '会社名79', field: 'employment79' }, { label: '会社名80', field: 'employment80' }, { label: '会社名81', field: 'employment81' }, { label: '会社名82', field: 'employment82' }, { label: '会社名83', field: 'employment83' }, { label: '会社名84', field: 'employment84' }, { label: '会社名85', field: 'employment85' }, { label: '会社名86', field: 'employment86' }, { label: '会社名87', field: 'employment87' }, { label: '会社名88', field: 'employment88' }, { label: '会社名89', field: 'employment89' }, { label: '会社名90', field: 'employment90' }, { label: '会社名91', field: 'employment91' }, { label: '会社名92', field: 'employment92' }, { label: '会社名93', field: 'employment93' }, { label: '会社名94', field: 'employment94' }, { label: '会社名95', field: 'employment95' }, { label: '会社名96', field: 'employment96' }, { label: '会社名97', field: 'employment97' }, { label: '会社名98', field: 'employment98' }, { label: '会社名99', field: 'employment99' }, { label: '会社名100', field: 'employment100' }, { label: '会社名101', field: 'employment101' }, { label: '会社名102', field: 'employment102' }, { label: '会社名103', field: 'employment103' }, { label: '会社名104', field: 'employment104' }, { label: '会社名105', field: 'employment105' }, { label: '従業員数', field: 'employee_number' }, { label: '専門コード', field: 'specialty' }, { label: '最終ログイン日時', field: 'last_login' }].map(function (f) {
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