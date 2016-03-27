'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _OutputComponent2 = require('../../base/OutputComponent');

var _OutputComponent3 = _interopRequireDefault(_OutputComponent2);

var _utils = require('../../../utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OutputCsvComponent = function (_OutputComponent) {
  _inherits(OutputCsvComponent, _OutputComponent);

  function OutputCsvComponent() {
    var _Object$getPrototypeO;

    _classCallCheck(this, OutputCsvComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(OutputCsvComponent)).call.apply(_Object$getPrototypeO, [this].concat(args)));
  }

  _createClass(OutputCsvComponent, [{
    key: 'buildTitle',
    value: function buildTitle() {
      return "CSV出力";
    }
  }, {
    key: 'buildBody',
    value: function buildBody() {
      var fields = this.getInputFields();
      return '\n      <form>\n        <table class="table-form">\n          <tbody>\n            <tr>\n              <th>出力ファイル</th>\n              <td><input name="outputFile" type="text"/></td>\n            </tr>\n            <tr>\n              <th>ヘッダー</th>\n              <td>\n                <label>\n                  <input type="radio" value="on" name="header" checked/>\n                  有り\n                </label>\n                <label>\n                  <input type="radio" value="off" name="header"/>\n                  無し\n                </label>\n              </td>\n            </tr>\n            <tr>\n              <th>出力するフィールド</th>\n              <td>\n                <label class="vertical-checkbox check-all"><input type="checkbox"/> 全てチェック</label>\n                <div class="use-field" style="max-height: 400px; overflow: auto;">\n                  ' + fields.map(function (f) {
        return '<label class="vertical-checkbox"><input type="checkbox" name="useFields" value="' + (0, _utils.encodeField)(f) + '"/> ' + f.label + '</label>';
      }).join('\n') + '\n                </div>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n      </form>';
    }

    /** このコンポーネントで使用するフィールドを返す */

  }, {
    key: 'getUsedFields',
    value: function getUsedFields() {
      var els = this._el.querySelectorAll('input[name="useFields"]:checked');
      return Array.prototype.map.call(els, function (el) {
        return el.value;
      });
    }
  }, {
    key: 'buildSQL',
    value: function buildSQL(fields) {
      var usedFields = this.getUsedFields().map(function (f) {
        return (0, _utils.decodeField)(f).field;
      });
      var tableName = this.getSourceComponents()[0].getRuntimeTableName();
      var sql = 'select ';
      sql += usedFields.map(function (f) {
        return "t1." + f;
      }).join(',');
      sql += ' from ' + tableName + ' t1';
      return sql;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(Object.getPrototypeOf(OutputCsvComponent.prototype), 'componentDidMount', this).call(this);
      $(this._el).on('change', '.check-all', this.allCheck.bind(this));
    }
  }, {
    key: 'allCheck',
    value: function allCheck(e) {
      var checked = e.target.checked;
      $(this._el).find('.use-field input[type="checkbox"]').prop('checked', checked);
    }
  }, {
    key: 'execute',
    value: function execute(sql) {
      var _this2 = this;

      $.blockUI();
      $.ajax({
        method: 'post',
        url: 'executeSQL',
        data: {
          sql: sql,
          fields: this.getUsedFields().map(function (f) {
            return (0, _utils.decodeField)(f).field;
          })
        },
        dataType: 'json'
      }).done(function (json) {
        $.unblockUI();
        var $dlEl = $(_this2._el).find('a');
        if ($dlEl.length === 0) {
          $dlEl = $('<a>CSV DL</a>').appendTo($(_this2._el).find('form'));
        }
        $dlEl.attr('href', json.file);
      });
    }
  }]);

  return OutputCsvComponent;
}(_OutputComponent3.default);

exports.default = OutputCsvComponent;