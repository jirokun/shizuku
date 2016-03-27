'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ShizukuComponent2 = require('./ShizukuComponent');

var _ShizukuComponent3 = _interopRequireDefault(_ShizukuComponent2);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LogicalComponent = function (_ShizukuComponent) {
  _inherits(LogicalComponent, _ShizukuComponent);

  function LogicalComponent() {
    var _Object$getPrototypeO;

    _classCallCheck(this, LogicalComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(LogicalComponent)).call.apply(_Object$getPrototypeO, [this].concat(args)));
  }

  /**
   * 全てのsourcesの中に出現するfieldのみ出力する
   */


  _createClass(LogicalComponent, [{
    key: 'getOutputFields',
    value: function getOutputFields() {
      var sourceComponents = this.getSourceComponents();
      var sources = sourceComponents.map(function (sc) {
        return sc.getOutputFields();
      });
      var fields = {};
      (0, _utils.flatten)(sources).forEach(function (field) {
        var obj = fields[field.field];
        if (obj) {
          obj.count++;
        } else {
          fields[field.field] = { count: 1, field: field };
        }
      });
      var sourcesNum = sources.length;
      var outputFields = [];
      for (var prop in fields) {
        if (fields[prop].count !== sourcesNum) {
          continue;
        }
        outputFields.push(fields[prop].field);
      }
      return outputFields;
    }
  }]);

  return LogicalComponent;
}(_ShizukuComponent3.default);

exports.default = LogicalComponent;