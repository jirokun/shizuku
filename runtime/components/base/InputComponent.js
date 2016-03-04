import ShizukuComponent from './ShizukuComponent'
import { decodeField, encodeField } from '../../../utils.js'

export default class InputComponent extends ShizukuComponent {
  constructor(...args) { super(...args); }

  getInputNum() {
    return 0;
  }
}
