import LogicalComponent from '../../base/LogicalComponent'
import { decodeField, flatten } from '../../../utils'

export default class OrComponent extends LogicalComponent {
  constructor(...args) { super(...args); }

  buildTitle() {
    return "OR";
  }

  buildBody() {
    return `<div><img width="100" height="100" src="img/or.svg"/></div>`;
  }

  getInputNum() {
    return 5;
  }

  buildSQL() {
    const usedFields = this.getOutputFields();
    const outputFields = this.getOutputFields();
    const sourceComponents = this.getSourceComponents();
    return sourceComponents.map((c) => {
      const id = c.getId();
      return `select ${usedFields.map((f) => 't1.' + f.field).join(',')} from ${id} t1`;
    }).join(' union ');
  }
}
