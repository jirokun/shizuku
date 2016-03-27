'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _LogicalComponent2 = require('../../base/LogicalComponent');

var _LogicalComponent3 = _interopRequireDefault(_LogicalComponent2);

var _utils = require('../../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MinusComponent = function (_LogicalComponent) {
  _inherits(MinusComponent, _LogicalComponent);

  function MinusComponent() {
    var _Object$getPrototypeO;

    _classCallCheck(this, MinusComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(MinusComponent)).call.apply(_Object$getPrototypeO, [this].concat(args)));
  }

  _createClass(MinusComponent, [{
    key: 'buildTitle',
    value: function buildTitle() {
      return "MINUS";
    }
  }, {
    key: 'buildBody',
    value: function buildBody() {
      var fields = this.getOutputFields();
      return '<div>\n      <div class="logical-image"><img width="100" height="100" src="img/minus.svg"/></div>\n      <table class="table-form vertical">\n        <tbody>\n          <tr>\n            <th>比較フィールド</th>\n          </tr>\n          <tr>\n            <th>\n              <select class="compare-field">' + fields.map(function (f) {
        return '<option value="' + f.field + '">' + f.label + '</option>';
      }) + '</select>\n            </th>\n          </tr>\n        </tbody>\n      </table>\n    </div>';
    }
  }, {
    key: 'getInputNum',
    value: function getInputNum() {
      return 2;
    }
  }, {
    key: 'buildSQL',
    value: function buildSQL(fields) {
      var usedFields = Array.from(fields).map(_utils.decodeField);
      var sourceComponents = this.getSourceComponents();
      var plusTable = sourceComponents[0].getRuntimeTableName();
      var minusTable = sourceComponents[1].getRuntimeTableName();
      var fieldsSQL = usedFields.map(function (f) {
        return 'p.' + f.field;
      }).join(',');
      var compareField = $(this._el).find('.compare-field').val();

      var sql = 'select ' + fieldsSQL + ' from ' + plusTable + ' p ';
      sql += 'left outer join ' + minusTable + ' m on p.' + compareField + ' = m.' + compareField + ' ';
      sql += 'where m.' + compareField + ' is null';
      return sql;
    }
  }]);

  return MinusComponent;
}(_LogicalComponent3.default);

exports.default = MinusComponent;