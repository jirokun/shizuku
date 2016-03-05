import LogicalComponent from '../base/LogicalComponent'
import { flatten } from '../../../utils'

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

  /**
   * 全てのsourcesの中に出現するfieldのみ出力する
   */
  getOutputFields() {
    const sourceComponents = this.getSourceComponents();
    const sources = sourceComponents.map((sc) => sc.getOutputFields());
    const fields = {};
    flatten(sources).forEach((field) => {
      const obj = fields[field.field];
      if (obj) {
        obj.count++;
      } else {
        fields[field.field] = { count: 1, field: field };
      }
    });
    const sourcesNum = sources.length;
    const outputFields = [];
    for (const prop in fields) {
      if (fields[prop].count !== sourcesNum) {
        continue;
      }
      outputFields.push(fields[prop].field);
    }
    return outputFields;
  }

  buildSQL(fields) {
    const outputFields = this.getOutputFields();
    const sourceComponents = this.getSourceComponents();
    return sourceComponents.map((c) => {
      const id = c.getId();
      return `select ${outputFields.map((f) => id + '.' + f.field).join(',')} from ${id}`;
    }).join(' union ');
  }
}
