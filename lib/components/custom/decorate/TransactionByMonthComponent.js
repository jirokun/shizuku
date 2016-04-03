'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DecorateComponent2 = require('../../base/DecorateComponent');

var _DecorateComponent3 = _interopRequireDefault(_DecorateComponent2);

var _utils = require('../../../utils.js');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TransactionByMonthComponent = function (_DecorateComponent) {
  _inherits(TransactionByMonthComponent, _DecorateComponent);

  function TransactionByMonthComponent() {
    var _Object$getPrototypeO;

    _classCallCheck(this, TransactionByMonthComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TransactionByMonthComponent)).call.apply(_Object$getPrototypeO, [this].concat(args)));
  }

  _createClass(TransactionByMonthComponent, [{
    key: 'buildTitle',
    value: function buildTitle() {
      return "月ごと取引回数属性追加";
    }
  }, {
    key: 'buildBody',
    value: function buildBody() {
      var years = [],
          months = [];
      for (var y = 2000, max = new Date().getFullYear(); y <= max; y++) {
        years.push(y);
      }
      for (var m = 1, _max = 12; m <= _max; m++) {
        months.push(m);
      }
      return '\n      <form>\n        <table class="table-form">\n          <tbody>\n            <tr>\n              <th>対象期間</th>\n              <th>\n                <select name="from-year">' + years.map(function (y) {
        return '<option value="' + y + '">' + y + '</option>';
      }) + '</select>\n                <select name="from-month">' + months.map(function (m) {
        return '<option value="' + m + '">' + m + '</option>';
      }) + '</select>\n                〜\n                <select name="to-year">' + years.map(function (y) {
        return '<option value="' + y + '">' + y + '</option>';
      }) + '</select>\n                <select name="to-month">' + months.map(function (m) {
        return '<option value="' + m + '">' + m + '</option>';
      }) + '</select>\n              </th>\n            </tr>\n          </tbody>\n        </table>\n      </form>';
    }
  }, {
    key: 'getOutputFields',
    value: function getOutputFields() {
      // initializedされる前はsourceComponentsなどを取得できない
      if (!this.initialized) {
        return [];
      }
      var sourceComponents = this.getSourceComponents();
      if (sourceComponents.length === 0) {
        return [];
      }
      var outputFields = (0, _utils.cloneObj)(sourceComponents[0].getOutputFields());
      var fromYear = $(this._el).find(':input[name="from-year"]').val();
      var fromMonth = $(this._el).find(':input[name="from-month"]').val();
      var toYear = $(this._el).find(':input[name="to-year"]').val();
      var toMonth = $(this._el).find(':input[name="to-month"]').val();
      var from = new Date(fromYear, fromMonth - 1);
      var to = new Date(toYear, toMonth - 1);
      var yearMonthFields = [];
      while (to.getTime() >= from.getTime()) {
        yearMonthFields.push({
          label: (0, _moment2.default)(from).format('YYYY年MM月'),
          field: 'tbmc' + (0, _moment2.default)(from).format('YYYYMM'),
          ownerId: this.getId()
        });
        from.setMonth(from.getMonth() + 1);
      }
      yearMonthFields.forEach(function (m) {
        return outputFields.push(m);
      });
      return outputFields;
    }
  }, {
    key: 'buildSQL',
    value: function buildSQL() {
      var _this2 = this;

      var sc = this.getSourceComponents()[0];
      var value = this.getValue();
      var sql = 'select ';
      sql += Array.from(fields).map(_utils.decodeField).map(function (f) {
        if (f.ownerId === _this2.getRuntimeTableName()) {
          var m = f.field.match(/tbmc(\d{6})/);
          var ym = m[1];
          var ymMoment = (0, _moment2.default)(ym + '01');
          return 'count((t.created_date >= \'' + ymMoment.format('YYYY-MM-DD') + '\' and t.created_date < \'' + ymMoment.add(1, 'M').format('YYYY-MM-DD') + '\') or null) as ' + f.field;
        } else {
          return 's.' + f.field;
        }
      }).join(',');
      sql += ' from ' + sc.getRuntimeTableName() + ' s';
      sql += ' inner join transactions t on s.id = t.user_id';
      sql += ' group by ' + Array.from(fields).map(_utils.decodeField).filter(function (f) {
        return f.ownerId != _this2.getRuntimeTableName();
      }).map(function (f) {
        return 's.' + f.field;
      }).join(',');
      return sql;
    }
  }]);

  return TransactionByMonthComponent;
}(_DecorateComponent3.default);

exports.default = TransactionByMonthComponent;