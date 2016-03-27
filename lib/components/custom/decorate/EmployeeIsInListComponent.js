'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DecorateComponent2 = require('../../base/DecorateComponent');

var _DecorateComponent3 = _interopRequireDefault(_DecorateComponent2);

var _utils = require('../../../utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EmployeeIsInListComponent = function (_DecorateComponent) {
  _inherits(EmployeeIsInListComponent, _DecorateComponent);

  function EmployeeIsInListComponent() {
    var _Object$getPrototypeO;

    _classCallCheck(this, EmployeeIsInListComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(EmployeeIsInListComponent)).call.apply(_Object$getPrototypeO, [this].concat(args)));
  }

  _createClass(EmployeeIsInListComponent, [{
    key: 'buildTitle',
    value: function buildTitle() {
      return "従業員リストに含まれているかどうかフラグ追加";
    }
  }, {
    key: 'buildBody',
    value: function buildBody() {
      return '\n      <form>\n        <table class="table-form">\n          <tbody>\n            <tr>\n              <th>リストID</th>\n              <td>\n                <input type="text" name="listId"/>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n      </form>';
    }
  }, {
    key: 'getOriginalOutputFields',
    value: function getOriginalOutputFields() {
      var value = this.getValue();
      return [{ label: 'リストに含まれているかどうか', field: 'employeeIsInList', ownerId: this.getRuntimeTableName() }];
    }
  }, {
    key: 'buildSQL',
    value: function buildSQL(fields) {
      return "";
    }
  }]);

  return EmployeeIsInListComponent;
}(_DecorateComponent3.default);

exports.default = EmployeeIsInListComponent;