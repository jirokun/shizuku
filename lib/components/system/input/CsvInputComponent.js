'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _InputComponent2 = require('../../base/InputComponent');

var _InputComponent3 = _interopRequireDefault(_InputComponent2);

var _commaSeparatedValues = require('comma-separated-values');

var _commaSeparatedValues2 = _interopRequireDefault(_commaSeparatedValues);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CsvInputComponent = function (_InputComponent) {
  _inherits(CsvInputComponent, _InputComponent);

  function CsvInputComponent() {
    var _Object$getPrototypeO;

    _classCallCheck(this, CsvInputComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(CsvInputComponent)).call.apply(_Object$getPrototypeO, [this].concat(args, [{ externalCommand: true }])));
  }

  _createClass(CsvInputComponent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      $(this._el).on('change', 'input[type="file"]', this._onFileChange.bind(this));
      $(this._el).on('click', '.generate-output-define-elments', this._onClickGenerateOutputDefineElements.bind(this));
    }
  }, {
    key: 'getOutputTableName',
    value: function getOutputTableName() {
      return this.getId();
    }
  }, {
    key: '_onFileChange',
    value: function _onFileChange(e) {
      var _this = this;
      var file = e.target.files[0];
      if (!file) {
        $('.generate-output-define-elments').prop('disabled', true);
        return;
      }
      $('.generate-output-define-elments').prop('disabled', false);
      var reader = new FileReader();
      reader.onload = function (fileEvent) {
        var result = fileEvent.target.result;
        var csv = _commaSeparatedValues2.default.parse(result);
        _this._csv = csv;
      };
      reader.readAsBinaryString(file);
    }

    /** 読み込んだCSVファイルから出力を定義するエレメントを生成する */

  }, {
    key: '_onClickGenerateOutputDefineElements',
    value: function _onClickGenerateOutputDefineElements(e) {
      if (!this._csv) {
        return;
      }
      var firstLine = this._csv[0];
      this._buildOutputFieldElements(firstLine);
    }
  }, {
    key: '_buildOutputFieldElements',
    value: function _buildOutputFieldElements(firstLine) {
      var _this3 = this;

      var $tbody = $(this._el).find('.csv-info tbody');
      $tbody.empty();
      firstLine.forEach(function (cell, i) {
        var $tr = $('<tr>\n        <td>' + (i + 1) + '列目</td>\n        <td><span class="cell-sample-value"></span><input type="hidden" name="cellSampleValue"/></td>\n        <td><input type="checkbox" name="isOutput"/></td>\n        <td><input type="text" name="cellId"/></td>\n        <td><input type="text" name="cellLabel"/></td>\n        <td class="cell-type">\n          <select name="cellType">\n            <option value="varchar">文字列</option>\n            <option value="numeric">数値型</option>\n            <option value="date">日付型</option>\n          </select>\n        </td>\n        <td class="cell-type-length"><input type="text" name="cellTypeLength" size="5"/></td>').appendTo($tbody);
        $tr.find('.cell-sample-value').text(cell);
        $tr.find('input[name="cellSampleValue"]').val(cell);
        var selectValue = void 0;
        switch ($.type(cell)) {
          case 'string':
            selectValue = 'varchar';
            break;
          case 'number':
            selectValue = 'numeric';
            break;
          case 'date':
            selectValue = 'date';
            break;
        }
        $tr.find('input[name="cellType"]').val(selectValue);
        _this3._shizuku.getJsPlumb().repaintEverything();
      });
    }
  }, {
    key: 'buildTitle',
    value: function buildTitle() {
      return "CSVファイル入力";
    }
  }, {
    key: 'buildBody',
    value: function buildBody() {
      return '\n      <form>\n        <table class="table-form">\n          <tbody>\n            <tr>\n              <th>ファイル</th>\n              <td><input name="" class="file" type="file"/></td>\n            </tr>\n            <tr>\n              <th></th>\n              <td><button class="generate-output-define-elments" type="button" disabled>CSVから出力フィールドを生成</button></td>\n            <tr>\n            </tr>\n              <th>列の定義</th>\n              <td>\n                <table class="table-form bordered csv-info vertical">\n                  <thead>\n                    <tr>\n                      <th></th>\n                      <th>1行目のサンプル値</th>\n                      <th>出力対象</th>\n                      <th>フィールドID</th>\n                      <th>ラベル名</th>\n                      <th>型</th>\n                      <th>桁情報</th>\n                    </tr>\n                  </thead>\n                  <tbody>\n                  </tbody>\n                </table>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n      </form>';
    }
  }, {
    key: 'getInputNum',
    value: function getInputNum() {
      return 0;
    }
  }, {
    key: 'buildSQL',
    value: function buildSQL() {
      return "";
    }
  }, {
    key: 'getOriginalOutputFields',
    value: function getOriginalOutputFields() {
      var _this4 = this;

      var values = this.getValue();
      var fields = [];
      // ファイルを読み込んでない場合は空配列を返す
      if (!values.cellLabel) {
        return [];
      }
      for (var i = 0, len = values.cellLabel.length; i < len; i++) {
        if (!values['isOutput:on'][i]) {
          continue;
        }
        fields.push({ label: values.cellLabel[i], field: values.cellId[i] });
      }
      return fields.map(function (f) {
        f.ownerId = _this4.getRuntimeTableName();
        return f;
      });
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      // あらかじめ値がセットできるように要素を作成しておく
      this._buildOutputFieldElements(value.cellSampleValue);
      _get(Object.getPrototypeOf(CsvInputComponent.prototype), 'setValue', this).call(this, value);
    }
  }]);

  return CsvInputComponent;
}(_InputComponent3.default);

exports.default = CsvInputComponent;