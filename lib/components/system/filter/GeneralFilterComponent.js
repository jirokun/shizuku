'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FilterComponent2 = require('../../base/FilterComponent');

var _FilterComponent3 = _interopRequireDefault(_FilterComponent2);

var _utils = require('../../../utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GeneralFilterComponent = function (_FilterComponent) {
  _inherits(GeneralFilterComponent, _FilterComponent);

  function GeneralFilterComponent() {
    var _Object$getPrototypeO;

    _classCallCheck(this, GeneralFilterComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(GeneralFilterComponent)).call.apply(_Object$getPrototypeO, [this].concat(args)));
  }

  _createClass(GeneralFilterComponent, [{
    key: 'buildTitle',
    value: function buildTitle() {
      return "汎用フィルタ";
    }
  }, {
    key: 'buildBody',
    value: function buildBody() {
      var fields = this.getOutputFields();
      return '\n      <div>\n        条件は全てand条件です。\n        <div>\n          <button class="addrow"><i class="fa fa-plus-square"></i> 条件追加</button>\n        </div>\n        <table class="table table-bordered table-condensed filter-table">\n          <thead>\n            <tr>\n              <th></th>\n              <th>フィールド</th>\n              <th>比較種別</th>\n              <th>値</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td><button type="button" class="close"><span>&times;</span></button></td>\n              <td>\n                <select class="condition-field">\n                  ' + fields.map(function (f) {
        return '<option value="' + (0, _utils.encodeField)(f) + '">' + f.field + ': ' + f.label + '</option>';
      }) + '\n                </select>\n              </td>\n              <td>\n                <select class="condition-type">\n                  <option value="=">=</option>\n                  <option value="!=">!=</option>\n                  <option value="<">&lt;</option>\n                  <option value=">">&gt;</option>\n                  <option value="<=">&lt;=</option>\n                  <option value=">=">&gt;=</option>\n                  <option value="contains">含む</option>\n                  <option value="begin_with">前方一致</option>\n                </select>\n              </td>\n              <td>\n                <input class="condition-value" type="text"/>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n      </div>';
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      $(this._el).on('click', '.filter-table tbody .close', this.deleteRow.bind(this));
      $(this._el).on('click', '.addrow', this.addRow.bind(this));
    }
  }, {
    key: 'deleteRow',
    value: function deleteRow(e) {
      if ($(this._el).find('.filter-table tbody > tr').length === 1) {
        $(this._el).find(':input').val('');
      } else {
        $(e.target).parents('tr').remove();
        this._shizuku.getJsPlumb().repaintEverything();
      }
    }
  }, {
    key: 'addRow',
    value: function addRow() {
      var trEl = $(this._el).find('.filter-table tbody > tr')[0];
      var clonedNode = $(trEl.cloneNode(true));
      clonedNode.find(':input').val('');
      clonedNode.appendTo($(this._el).find('.filter-table tbody'));
      this._shizuku.getJsPlumb().repaintEverything();
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
      for (var i = $(this._el).find('tbody tr').length, len = value.length; i < len; i++) {
        this.addRow();
      }
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
    value: function buildSQL() {
      var sc = this.getSourceComponents()[0];
      var tableName = sc.getRuntimeTableName();
      var value = this.getValue();
      var sql = 'select ';
      sql += sc.getOutputFields().map(function (f) {
        return 't1.' + f.field;
      }).join(',');
      sql += ' from ' + tableName + ' t1';
      sql += ' where ';
      sql += value.filter(function (v) {
        return v.field !== null;
      }).map(function (v) {
        if (v.type === 'contains') {
          return 't1.' + v.field.split(/:/)[1] + ' like ' + (0, _utils.escapeSQL)(v.value, '%', '%');
        } else if (v.type === 'begin_with') {
          return 't1.' + v.field.split(/:/)[1] + ' like ' + (0, _utils.escapeSQL)(v.value, '%');
        } else {
          return 't1.' + v.field.split(/:/)[1] + ' ' + v.type + ' \'' + v.value + '\'';
        }
      }).join(" and ");
      return sql;
    }
  }]);

  return GeneralFilterComponent;
}(_FilterComponent3.default);

exports.default = GeneralFilterComponent;