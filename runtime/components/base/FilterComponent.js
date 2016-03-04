import ShizukuComponent from './ShizukuComponent'
import { decodeField, encodeField } from '../../../utils.js'

export default class FilterComponent extends ShizukuComponent {
  constructor(...args) { super(...args); }

  getOutputFields() {
    // initializedされる前はsourceComponentsなどを取得できない
    if (!this.initialized) {
      return [];
    }
    const source = this.getSourceComponents()[0];
    if (source) {
      return source.getOutputFields();
    }
    return [];
  }
}
