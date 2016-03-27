import '../www/css/shizuku.scss'
import Shizuku from './Shizuku'
import ShizukuMenu from './ShizukuMenu'
import ShizukuComponentManager from './ShizukuComponentManager'

import TableInputComponent from './components/system/input/TableInputComponent'
import CsvInputComponent from './components/system/input/CsvInputComponent'
import GeneralFilterComponent from './components/system/filter/GeneralFilterComponent'
import OrComponent from './components/system/logical/OrComponent'
import AndComponent from './components/system/logical/AndComponent'
import MinusComponent from './components/system/logical/MinusComponent'
import AddAttributeByEntryOrder from './components/system/logical/AddAttributeByEntryOrder'
import OutputCsvComponent from './components/system/output/OutputCsvComponent'
import DebugSQLComponent from './components/system/output/DebugSQLComponent'
import OutputShellComponent from './components/system/output/OutputShellComponent'
import TransactionByMonthComponent from './components/custom/decorate/TransactionByMonthComponent'
import EmployeeIsInListComponent from './components/custom/decorate/EmployeeIsInListComponent'
import DesignatingPeriodsTransactionComponent from './components/custom/decorate/DesignatingPeriodsTransactionComponent'
import CompanyListFilterComponent from './components/custom/filter/CompanyListFilterComponent'
import EmployeeListFilterComponent from './components/custom/filter/EmployeeListFilterComponent'

const scm = new ShizukuComponentManager({
  components: [
    {
      label: '入力',
      children: [
        { label: 'テーブルからの入力', constructor: TableInputComponent },
        { label: 'CSVからの入力', constructor: CsvInputComponent },
      ]
    },
    {
      label: 'フィルタ',
      children: [
        { label: '汎用のフィルタ', constructor: GeneralFilterComponent },
        { label: 'リストに含まれている会社', constructor: CompanyListFilterComponent},
        { label: 'リストに含まれている従業員', constructor: EmployeeListFilterComponent},
      ]
    },
    {
      label: '結合・差分',
      children: [
        { label: 'Or(どれか一つでも含まれているもの)', constructor: OrComponent},
        { label: 'And(全て入力に存在するもの)', constructor: AndComponent},
        { label: 'Minus(特定の入力からその他の入力を引く)', constructor: MinusComponent},
      ]
    },
    {
      label: '属性追加',
      children: [
        { label: '優先順に定数値追加', constructor: AddAttributeByEntryOrder},
        { label: '月毎の取引数追加', constructor: TransactionByMonthComponent},
        { label: '従業員がリストに含まれているか', constructor: EmployeeIsInListComponent},
        { label: '期間内の取引数', constructor: DesignatingPeriodsTransactionComponent},
      ]
    },
    {
      label: '出力',
      children: [
        { label: 'SQL DL', constructor: DebugSQLComponent},
        { label: 'CSV DL', constructor: OutputCsvComponent},
        { label: 'シェルスクリプト DL', constructor: OutputShellComponent},
      ]
    },
  ]
});
const shizuku = new Shizuku(document.getElementById('shizuku-editor'), scm);
const shizukuMenu = new ShizukuMenu(document.getElementById('shizuku-menu'), shizuku, scm);
shizukuMenu.render();
window.shizuku = shizuku;
