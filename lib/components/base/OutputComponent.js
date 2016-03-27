'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ShizukuComponent2 = require('./ShizukuComponent');

var _ShizukuComponent3 = _interopRequireDefault(_ShizukuComponent2);

var _utils = require('../../utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * デザインしたグラフの終端は必ずOutputComponentである必要がある。
 */

var OutputComponent = function (_ShizukuComponent) {
  _inherits(OutputComponent, _ShizukuComponent);

  function OutputComponent() {
    var _Object$getPrototypeO;

    _classCallCheck(this, OutputComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(OutputComponent)).call.apply(_Object$getPrototypeO, [this].concat(args)));
  }

  _createClass(OutputComponent, [{
    key: 'getOutputNum',
    value: function getOutputNum() {
      return 0;
    }
  }, {
    key: 'conbineSQL',
    value: function conbineSQL(sqls) {
      var sqlArr = [];
      for (var i = 0, len = sqls.length - 1; i < len; i++) {
        var obj = sqls[i];
        if (obj.type === 'input') {
          // do nothing
        } else if (obj.type === 'sql') {
            sqlArr.push(obj.id + ' as ( ' + obj.sql + ' )');
          } else {
            throw 'unkown sqls type: ' + obj.type;
          }
      }

      var sql = '';
      if (sqlArr.length > 1) {
        sql += 'with ';
      }

      sql += sqlArr.join('\n, ');
      sql += '\n' + sqls[sqls.length - 1].sql;
      return sql;
    }
  }]);

  return OutputComponent;
}(_ShizukuComponent3.default);

exports.default = OutputComponent;