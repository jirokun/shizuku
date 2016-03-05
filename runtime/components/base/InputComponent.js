import ShizukuComponent from './ShizukuComponent'
import { decodeField, encodeField } from '../../../utils.js'

/**
 * デザインしたグラフの先端は必ずInputComponentである必要がある。
 * InputComponentはShizukuComponentのgetOutputFieldsに加え
 * getOutputTableNameを実装する必要がある。
 * getOutputTableNameではデータを格納するテーブル名を指定する。
 */
export default class InputComponent extends ShizukuComponent {
  constructor(...args) { super(...args); }

  getInputNum() {
    return 0;
  }

  getOutputTableName() {
    throw 'not impletented yet';
  }

  /** SQL組み立て時に使用する。どこのテーブルからデータを取得するかを明示する */
  getRuntimeTableName() {
    return this.getOutputTableName();
  }
}
