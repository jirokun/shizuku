import TableInputComponent from './system/input/TableInputComponent'
import CsvInputComponent from './system/input/CsvInputComponent'
import GeneralFilterComponent from './system/filter/GeneralFilterComponent'
import OrComponent from './system/logical/OrComponent'
import AndComponent from './system/logical/AndComponent'
import MinusComponent from './system/logical/MinusComponent'
import AddAttributeByEntryOrder from './system/logical/AddAttributeByEntryOrder'
import OutputCsvComponent from './system/output/OutputCsvComponent'
import DebugSQLComponent from './system/output/DebugSQLComponent'
import OutputShellComponent from './system/output/OutputShellComponent'
import TransactionByMonthComponent from './custom/decorate/TransactionByMonthComponent'

export default [
  TableInputComponent,
  CsvInputComponent,
  GeneralFilterComponent,
  OrComponent,
  AndComponent,
  MinusComponent,
  AddAttributeByEntryOrder,
  OutputCsvComponent,
  DebugSQLComponent,
  OutputShellComponent,
  TransactionByMonthComponent,
];
