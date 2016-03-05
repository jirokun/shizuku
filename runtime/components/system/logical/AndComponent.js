import LogicalComponent from '../../base/LogicalComponent'
import { flatten } from '../../../../utils'

export default class AndComponent extends LogicalComponent {
  constructor(...args) { super(...args); }

  buildTitle() {
    return "AND";
  }

  buildBody() {
    return `<div><img width="100" height="100" src="img/and.svg"/></div>`;
  }

  getInputNum() {
    return 5;
  }

  buildSQL(fields) {
    const outputFields = this.getOutputFields();
    const sourceComponents = this.getSourceComponents();
    const firstId = sourceComponents[0].getId();
    let sql = `select ${outputFields.map((f) => firstId + '.' + f.field).join(',')} from ${firstId}`;
    for (let i = 1, len = sourceComponents.length; i < len; i++) {
      const id = sourceComponents[i].getId();
      const cf = outputFields[0].field;
      sql += ` inner join ${id} on ${id}.${cf} = ${firstId}.${cf} `;
    }
    return sql;
  }
}
