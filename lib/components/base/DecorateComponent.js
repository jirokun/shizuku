'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ShizukuComponent2 = require('./ShizukuComponent');

var _ShizukuComponent3 = _interopRequireDefault(_ShizukuComponent2);

var _utils = require('../../utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DecorateComponent = function (_ShizukuComponent) {
  _inherits(DecorateComponent, _ShizukuComponent);

  function DecorateComponent() {
    var _Object$getPrototypeO;

    _classCallCheck(this, DecorateComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DecorateComponent)).call.apply(_Object$getPrototypeO, [this].concat(args)));
  }

  return DecorateComponent;
}(_ShizukuComponent3.default);

exports.default = DecorateComponent;