'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ShizukuComponent2 = require('../base/ShizukuComponent');

var _ShizukuComponent3 = _interopRequireDefault(_ShizukuComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TranslateDcfSyscdComponent = function (_ShizukuComponent) {
  _inherits(TranslateDcfSyscdComponent, _ShizukuComponent);

  function TranslateDcfSyscdComponent() {
    var _Object$getPrototypeO;

    _classCallCheck(this, TranslateDcfSyscdComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TranslateDcfSyscdComponent)).call.apply(_Object$getPrototypeO, [this].concat(args)));
  }

  _createClass(TranslateDcfSyscdComponent, [{
    key: 'buildTitle',
    value: function buildTitle() {
      return "DCFコードをシステムコードに変換";
    }
  }, {
    key: 'getOriginalOutputFields',
    value: function getOriginalOutputFields() {
      var _this2 = this;

      return [{ label: 'システムコード', field: 'system_cd' }, { label: '姓', field: 'sei' }, { label: '名', field: 'mei' }, { label: '年齢', field: 'age' }, { label: '第1診療科', field: 'dcf_specialty1' }, { label: '第2診療科', field: 'dcf_specialty2' }, { label: '第3診療科', field: 'dcf_specialty3' }, { label: '第4診療科', field: 'dcf_specialty4' }, { label: '第5診療科', field: 'dcf_specialty5' }, { label: '最大病床数', field: 'dcf_max_bed_facility' }, { label: '最小病床数', field: 'dcf_min_bed_facility' }, { label: '最終ログイン日時', field: 'last_login_date' }].map(function (f) {
        f.ownerId = _this2.getId();
        return f;
      });
    }
  }]);

  return TranslateDcfSyscdComponent;
}(_ShizukuComponent3.default);

exports.default = TranslateDcfSyscdComponent;