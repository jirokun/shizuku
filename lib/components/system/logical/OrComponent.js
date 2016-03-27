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

var OrComponent = function (_LogicalComponent) {
  _inherits(OrComponent, _LogicalComponent);

  function OrComponent() {
    var _Object$getPrototypeO;

    _classCallCheck(this, OrComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(OrComponent)).call.apply(_Object$getPrototypeO, [this].concat(args)));
  }

  _createClass(OrComponent, [{
    key: 'buildTitle',
    value: function buildTitle() {
      return "OR";
    }
  }, {
    key: 'buildBody',
    value: function buildBody() {
      return '<div><img width="100" height="100" src="img/or.svg"/></div>';
    }
  }, {
    key: 'getInputNum',
    value: function getInputNum() {
      return 5;
    }
  }, {
    key: 'buildSQL',
    value: function buildSQL(fields) {
      var usedFields = Array.from(fields).map(_utils.decodeField);
      var outputFields = this.getOutputFields();
      var sourceComponents = this.getSourceComponents();
      return sourceComponents.map(function (c) {
        var id = c.getId();
        return 'select ' + usedFields.map(function (f) {
          return 't1.' + f.field;
        }).join(',') + ' from ' + id + ' t1';
      }).join(' union ');
    }
  }]);

  return OrComponent;
}(_LogicalComponent3.default);

exports.default = OrComponent;