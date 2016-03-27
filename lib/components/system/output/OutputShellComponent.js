'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _OutputComponent2 = require('../../base/OutputComponent');

var _OutputComponent3 = _interopRequireDefault(_OutputComponent2);

var _OutputCsvComponent = require('./OutputCsvComponent');

var _OutputCsvComponent2 = _interopRequireDefault(_OutputCsvComponent);

var _utils = require('../../../utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OutputShellComponent = function (_OutputComponent) {
  _inherits(OutputShellComponent, _OutputComponent);

  function OutputShellComponent() {
    var _Object$getPrototypeO;

    _classCallCheck(this, OutputShellComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(OutputShellComponent)).call.apply(_Object$getPrototypeO, [this].concat(args)));
  }

  _createClass(OutputShellComponent, [{
    key: 'buildTitle',
    value: function buildTitle() {
      return "シェルスクリプト出力";
    }
  }, {
    key: 'buildBody',
    value: function buildBody() {
      var fields = this.getInputFields();
      return '\n      <form>\n        <table class="table-form bordered vertical">\n          <tbody>\n            <tr>\n              <td><input type="checkbox" class="check-all"/></td>\n              <th>出力するフィールド</th>\n            </tr>\n            ' + fields.map(function (f) {
        return '<tr><td><input type="checkbox" name="useFields" value="' + (0, _utils.encodeField)(f) + '"/></td><td>' + f.label + '</td></tr>';
      }).join('\n') + '\n          </tbody>\n        </table>\n      </form>';
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(Object.getPrototypeOf(OutputShellComponent.prototype), 'componentDidMount', this).call(this);
      $(this._el).on('change', '.check-all', this.toggleAllCheckbox.bind(this));
    }
  }, {
    key: 'toggleAllCheckbox',
    value: function toggleAllCheckbox(e) {
      var checked = $(e.target)[0].checked;
      $(this._el).find('form input[name]').prop('checked', checked);
    }

    /** このコンポーネントで使用するフィールドを返す */

  }, {
    key: 'getUsedFields',
    value: function getUsedFields() {
      return _OutputCsvComponent2.default.prototype.getUsedFields.call(this);
    }
  }, {
    key: 'buildSQL',
    value: function buildSQL(fields) {
      return _OutputCsvComponent2.default.prototype.buildSQL.call(this);
    }
  }, {
    key: 'allCheck',
    value: function allCheck(e) {
      return _OutputCsvComponent2.default.prototype.allCheck.call(this, e);
    }
  }, {
    key: 'execute',
    value: function execute(sql, externalComponents) {
      var commands = externalComponents.map(function (c) {
        var value = c.getValue();
        var ids = value.cellId;
        var types = value.cellType;
        var typeLengths = value.cellTypeLength;
        var tableName = c.getRuntimeTableName();
        var command = 'psql -d $db_name -U $user_name -c "drop table if exists ' + tableName + '"\npsql -d $db_name -U $user_name -c "create table ' + tableName + ' (';
        command += ids.map(function (id, i) {
          return ids[i] + ' ' + types[i] + (typeLengths[i] !== '' ? '(' + typeLengths[i] + ')' : '');
        }).join(',');
        command += ')"\n';
        command += 'psql -d $db_name -U $user_name -c"\\copy ' + tableName + ' (' + ids.join(',') + ') from \'$filename\' with csv"';
        return command;
      });

      var script = '#!/bin/bash\nset -eu\n\nfilename=$1\n\n' + commands.join('\n') + '\nSQL="' + sql + '"\necho $SQL | psql -d $db_name -U $user_name\n';
      var dataURI = "data:application/octet-stream," + encodeURIComponent(script);
      var $dlEl = $(this._el).find('a[download]');
      if ($dlEl.length === 0) {
        $dlEl = $('<a download="exec.txt">Shell DL</a>').appendTo($(this._el).find('form'));
      }
      $dlEl.attr('href', dataURI);
    }
  }]);

  return OutputShellComponent;
}(_OutputComponent3.default);

exports.default = OutputShellComponent;