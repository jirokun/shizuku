'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FilterComponent2 = require('../base/FilterComponent');

var _FilterComponent3 = _interopRequireDefault(_FilterComponent2);

var _utils = require('../../utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GenerarlFilterComponent = function (_FilterComponent) {
  _inherits(GenerarlFilterComponent, _FilterComponent);

  function GenerarlFilterComponent() {
    var _Object$getPrototypeO;

    _classCallCheck(this, GenerarlFilterComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(GenerarlFilterComponent)).call.apply(_Object$getPrototypeO, [this].concat(args)));
  }

  _createClass(GenerarlFilterComponent, [{
    key: 'buildTitle',
    value: function buildTitle() {
      return "汎用フィルタ";
    }
  }, {
    key: 'buildBody',
    value: function buildBody() {
      var fields = this.getOutputFields();
      return '\n      <div>\n        条件は全てand条件です。\n        <table class="table table-bordered table-condensed">\n          <thead>\n            <tr>\n              <th></th>\n              <th>フィールド</th>\n              <th>比較種別</th>\n              <th>値</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td><button type="button" class="btn btn-mini btn-danger">削除</button></td>\n              <td>\n                <select class="condition-field">\n                  ' + fields.map(function (f) {
        return '<option value="' + (0, _utils.encodeField)(f) + '">' + f.label + '</option>';
      }) + '\n                </select>\n              </td>\n              <td>\n                <select class="condition-type">\n                  <option value="=">=</option>\n                  <option value="!=">!=</option>\n                  <option value="<">&lt;</option>\n                  <option value=">">&gt;</option>\n                  <option value="<=">&lt;=</option>\n                  <option value=">=">&gt;=</option>\n                  <option value="contains">含む</option>\n                  <option value="begin_with">前方一致</option>\n                </select>\n              </td>\n              <td>\n                <input class="condition-value" type="text"/>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n      </div>';
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return $.map($(this._el).find('tbody tr'), function (el) {
        return {
          field: $(el).find('.condition-field').val(),
          type: $(el).find('.condition-type').val(),
          value: $(el).find('.condition-value').val()
        };
      });
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      var trs = $(this._el).find('tbody tr');
      value.forEach(function (row, i) {
        $(trs[i]).find('.condition-field').val(row.field), $(trs[i]).find('.condition-type').val(row.type), $(trs[i]).find('.condition-value').val(row.value);
      });
    }
  }, {
    key: 'getUsedFields',
    value: function getUsedFields() {
      return $.map($(this._el).find('select.condition-field'), function (el) {
        return $(el).val();
      });
    }
  }, {
    key: 'buildSQL',
    value: function buildSQL(fields) {
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

  return GenerarlFilterComponent;
}(_FilterComponent3.default);

exports.default = GenerarlFilterComponent;