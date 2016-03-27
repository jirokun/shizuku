'use strict';

require('../www/css/shizuku.scss');

var _Shizuku = require('./Shizuku');

var _Shizuku2 = _interopRequireDefault(_Shizuku);

var _ShizukuMenu = require('./ShizukuMenu');

var _ShizukuMenu2 = _interopRequireDefault(_ShizukuMenu);

var _ShizukuComponentManager = require('./ShizukuComponentManager');

var _ShizukuComponentManager2 = _interopRequireDefault(_ShizukuComponentManager);

var _TableInputComponent = require('./components/system/input/TableInputComponent');

var _TableInputComponent2 = _interopRequireDefault(_TableInputComponent);

var _CsvInputComponent = require('./components/system/input/CsvInputComponent');

var _CsvInputComponent2 = _interopRequireDefault(_CsvInputComponent);

var _GeneralFilterComponent = require('./components/system/filter/GeneralFilterComponent');

var _GeneralFilterComponent2 = _interopRequireDefault(_GeneralFilterComponent);

var _OrComponent = require('./components/system/logical/OrComponent');

var _OrComponent2 = _interopRequireDefault(_OrComponent);

var _AndComponent = require('./components/system/logical/AndComponent');

var _AndComponent2 = _interopRequireDefault(_AndComponent);

var _MinusComponent = require('./components/system/logical/MinusComponent');

var _MinusComponent2 = _interopRequireDefault(_MinusComponent);

var _OutputCsvComponent = require('./components/system/output/OutputCsvComponent');

var _OutputCsvComponent2 = _interopRequireDefault(_OutputCsvComponent);

var _DebugSQLComponent = require('./components/system/output/DebugSQLComponent');

var _DebugSQLComponent2 = _interopRequireDefault(_DebugSQLComponent);

var _OutputShellComponent = require('./components/system/output/OutputShellComponent');

var _OutputShellComponent2 = _interopRequireDefault(_OutputShellComponent);

var _AddAttributeByEntryOrderComponent = require('./components/system/decorate/AddAttributeByEntryOrderComponent');

var _AddAttributeByEntryOrderComponent2 = _interopRequireDefault(_AddAttributeByEntryOrderComponent);

var _TransactionByMonthComponent = require('./components/custom/decorate/TransactionByMonthComponent');

var _TransactionByMonthComponent2 = _interopRequireDefault(_TransactionByMonthComponent);

var _EmployeeIsInListComponent = require('./components/custom/decorate/EmployeeIsInListComponent');

var _EmployeeIsInListComponent2 = _interopRequireDefault(_EmployeeIsInListComponent);

var _DesignatingPeriodsTransactionComponent = require('./components/custom/decorate/DesignatingPeriodsTransactionComponent');

var _DesignatingPeriodsTransactionComponent2 = _interopRequireDefault(_DesignatingPeriodsTransactionComponent);

var _CompanyListFilterComponent = require('./components/custom/filter/CompanyListFilterComponent');

var _CompanyListFilterComponent2 = _interopRequireDefault(_CompanyListFilterComponent);

var _EmployeeListFilterComponent = require('./components/custom/filter/EmployeeListFilterComponent');

var _EmployeeListFilterComponent2 = _interopRequireDefault(_EmployeeListFilterComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scm = new _ShizukuComponentManager2.default({
  components: [{
    label: '入力',
    children: [{ label: 'テーブルからの入力', constructor: _TableInputComponent2.default }, { label: 'CSVからの入力', constructor: _CsvInputComponent2.default }]
  }, {
    label: 'フィルタ',
    children: [{ label: '汎用のフィルタ', constructor: _GeneralFilterComponent2.default }, { label: 'リストに含まれている会社', constructor: _CompanyListFilterComponent2.default }, { label: 'リストに含まれている従業員', constructor: _EmployeeListFilterComponent2.default }]
  }, {
    label: '結合・差分',
    children: [{ label: 'Or(どれか一つでも含まれているもの)', constructor: _OrComponent2.default }, { label: 'And(全て入力に存在するもの)', constructor: _AndComponent2.default }, { label: 'Minus(特定の入力からその他の入力を引く)', constructor: _MinusComponent2.default }]
  }, {
    label: '属性追加',
    children: [{ label: '優先順に定数値追加', constructor: _AddAttributeByEntryOrderComponent2.default }, { label: '月毎の取引数追加', constructor: _TransactionByMonthComponent2.default }, { label: '従業員がリストに含まれているか', constructor: _EmployeeIsInListComponent2.default }, { label: '期間内の取引数', constructor: _DesignatingPeriodsTransactionComponent2.default }]
  }, {
    label: '出力',
    children: [{ label: 'SQL DL', constructor: _DebugSQLComponent2.default }, { label: 'CSV DL', constructor: _OutputCsvComponent2.default }, { label: 'シェルスクリプト DL', constructor: _OutputShellComponent2.default }]
  }]
});
var shizuku = new _Shizuku2.default(document.getElementById('shizuku-editor'), scm);
var shizukuMenu = new _ShizukuMenu2.default(document.getElementById('shizuku-menu'), shizuku, scm);
shizukuMenu.render();
window.shizuku = shizuku;