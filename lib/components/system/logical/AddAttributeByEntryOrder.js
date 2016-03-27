'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _LogicalComponent2 = require('../../base/LogicalComponent');

var _LogicalComponent3 = _interopRequireDefault(_LogicalComponent2);

var _utils = require('../../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddAttributeByEntryOrder = function (_LogicalComponent) {
  _inherits(AddAttributeByEntryOrder, _LogicalComponent);

  function AddAttributeByEntryOrder() {
    var _Object$getPrototypeO;

    _classCallCheck(this, AddAttributeByEntryOrder);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(AddAttributeByEntryOrder)).call.apply(_Object$getPrototypeO, [this].concat(args)));

    _this.row = ['']; // 描画のためのデータ
    return _this;
  }

  _createClass(AddAttributeByEntryOrder, [{
    key: 'buildTitle',
    value: function buildTitle() {
      return "優先順に属性追加";
    }
  }, {
    key: 'buildBody',
    value: function buildBody() {
      return '<div>\n      <p>入力順に属性を追加します。</p>\n      <form>\n        <div>\n          <button type="button" class="addrow"><i class="fa fa-plus-square"></i> 入力追加</button>\n        </div>\n        <table class="table table-bordered table-condensed define-table">\n          <thead>\n            <tr>\n              <th></th>\n              <th>入力順序</th>\n              <th>付加する値</th>\n            </tr>\n          </thead>\n          <tbody>\n            ' + this.row.map(function (value, i) {
        return '\n            <tr>\n              <td><button type="button" class="close"><span>&times;</span></button></td>\n              <td class"row-num">' + (i + 1) + '</td>\n              <td><input name="additionValue" class="condition-value" type="text" value="' + (0, _utils.escapeHTML)(value) + '"/></td>\n            </tr>';
      }).join('') + '\n          </tbody>\n        </table>\n      </form>\n    </div>';
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      $(this._el).on('click', '.define-table tbody .close', this.deleteRow.bind(this));
      $(this._el).on('click', '.addrow', this.addRow.bind(this));
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      // あらかじめ値がセットできるようにadditionValueの数だけendpointを用意しておく
      var endpointNum = this.getInputEndpoints().length;
      for (var i = endpointNum, len = value.additionValue.length; i < len; i++) {
        this.addRow();
      }
      _get(Object.getPrototypeOf(AddAttributeByEntryOrder.prototype), 'setValue', this).call(this, value);
    }
  }, {
    key: 'deleteRow',
    value: function deleteRow(e) {
      var _this2 = this;

      var $tr = $(e.target).parents('tr');
      var $trs = $tr.parents('tbody').find('tr');
      if ($trs.length === 1) {
        $(this._el).find(':input').val('');
      } else {
        (function () {
          var index = $(_this2._el).find('.define-table tbody > tr').index($tr);
          var jp = _this2._shizuku.getJsPlumb();
          jp.batch(function () {
            _this2.row = _this2.getValue().additionValue;
            _this2.row.splice(index, 1);
            _this2.render(function () {
              var $form = $(_this2._el).parents('form');
              $form.find('input[name="condition-value"]').each(function (i, el) {
                $(el).val(_this2.row[i]);
              });
            });
            _this2.deleteInputEndpoint(index);
            _this2.setEndpointPosition();
          });
        })();
      }
    }
  }, {
    key: 'addRow',
    value: function addRow() {
      var _this3 = this;

      var jp = this._shizuku.getJsPlumb();
      this.row = this.getValue().additionValue;
      jp.batch(function () {
        _this3.row.push('');
        _this3.render();
        _this3.addInputEndpoint();
        _this3.setEndpointPosition();
      });
    }
  }, {
    key: 'getOriginalOutputFields',
    value: function getOriginalOutputFields() {
      return [{ label: '追加カラム' + this.getRuntimeTableName(), field: this.getRuntimeTableName() + '_av', ownerId: this.getRuntimeTableName() }];
    }
  }, {
    key: 'getOutputFields',
    value: function getOutputFields() {
      var fields = _get(Object.getPrototypeOf(AddAttributeByEntryOrder.prototype), 'getOutputFields', this).call(this);
      fields.push.apply(fields, _toConsumableArray(this.getOriginalOutputFields()));
      return fields;
    }
  }, {
    key: 'buildSQL',
    value: function buildSQL(fields) {
      var _this4 = this;

      var usedFields = Array.from(fields).map(_utils.decodeField);
      var outputFields = this.getOutputFields();
      var sourceComponents = this.getSourceComponents();
      var avField = this.getRuntimeTableName() + '_av';
      var sql = 'select ';
      sql += usedFields.map(function (f) {
        if (f.field === avField) {
          return 'min(' + f.field + ') as ' + avField;
        } else {
          return f.field;
        }
      }).join(',');
      sql += ',min(shizuku_order) from (';
      var row = this.getValue().additionValue;
      sql += sourceComponents.map(function (c, i) {
        var id = c.getId();
        var sqlInner = 'select ';
        sqlInner += Array.from(fields).map(_utils.decodeField).map(function (f) {
          if (f.ownerId === _this4.getRuntimeTableName()) {
            return (0, _utils.escapeSQL)(row[i]) + ' as ' + f.field;
          } else {
            return 't1.' + f.field;
          }
        }).join(',');
        sqlInner += ',' + i + ' as shizuku_order from ' + id + ' t1';
        return sqlInner;
      }).join(' union all ');
      sql += ') t0 group by ' + usedFields.filter(function (f) {
        return f.ownerId !== _this4.getRuntimeTableName();
      }).map(function (f) {
        return f.field;
      }).join(',');
      return sql;
    }
  }]);

  return AddAttributeByEntryOrder;
}(_LogicalComponent3.default);

exports.default = AddAttributeByEntryOrder;