import ShizukuComponent from './ShizukuComponent'
import { flatten } from '../../utils'

export default class LogicalComponent extends ShizukuComponent {
  constructor(...args) { super(...args); }

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
}
