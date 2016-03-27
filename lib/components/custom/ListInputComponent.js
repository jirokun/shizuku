'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ShizukuComponent2 = require('../base/ShizukuComponent');

var _ShizukuComponent3 = _interopRequireDefault(_ShizukuComponent2);

var _utils = require('../../utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListInputComponent = function (_ShizukuComponent) {
  _inherits(ListInputComponent, _ShizukuComponent);

  function ListInputComponent() {
    var _Object$getPrototypeO;

    _classCallCheck(this, ListInputComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ListInputComponent)).call.apply(_Object$getPrototypeO, [this].concat(args)));
  }

  _createClass(ListInputComponent, [{
    key: 'buildTitle',
    value: function buildTitle() {
      return "リスト入力";
    }
  }, {
    key: 'buildBody',
    value: function buildBody() {
      return '\n      <form>\n        <table class="table-form">\n          <tbody>\n            <tr>\n              <th>対象のMR</th>\n              <td><input name="targetMr" type="text"/></td>\n            </tr>\n            <tr>\n              <th>入力するリスト</th>\n              <td>\n                <select name="listId">\n                  <option value="LBC_1123287_DCF_20123">LBC_1123287_DCF_20123</option>\n                  <option value="LBC_3213727_DCF_31928">LBC_3213727_DCF_31928</option>\n                </select>\n              </td>\n            </tr>\n            <tr>\n              <th>リストのタイプ</th>\n              <td>\n                <select name="listType">\n                  <option value="id">ユーザID</option>\n                </select>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n      </form>';
    }
  }, {
    key: 'onRendered',
    value: function onRendered() {}
  }, {
    key: 'getInputNum',
    value: function getInputNum() {
      return 0;
    }
  }, {
    key: 'getOriginalOutputFields',
    value: function getOriginalOutputFields() {
      var _this2 = this;

      return [{ label: 'ユーザID', field: 'id' }, { label: '姓', field: 'sei' }, { label: '名', field: 'mei' }, { label: '年齢', field: 'age' }, { label: '会社名', field: 'employment' }, { label: '従業員数', field: 'employee_number' }, { label: '専門コード', field: 'specialty' }, { label: '最終ログイン日時', field: 'last_login' }].map(function (f) {
        f.ownerId = _this2.getId();
        return f;
      });
    }
  }, {
    key: 'buildSQL',
    value: function buildSQL(fieldSet) {
      return null;
    }
  }]);

  return ListInputComponent;
}(_ShizukuComponent3.default);

exports.default = ListInputComponent;