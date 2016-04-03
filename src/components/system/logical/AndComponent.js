import LogicalComponent from '../../base/LogicalComponent'
import { decodeField, flatten } from '../../../utils'

export default class AndComponent extends LogicalComponent {
  constructor(...args) { super(...args); }

  buildTitle() {
    return "AND";
  }

  buildBody() {
    const fields = this.getOutputFields();
    return `<div>
      <div class="logical-image"><img width="100" height="100" src="img/and.svg"/></div>
      <table class="table-form vertical">
        <tbody>
          <tr>
            <th>比較フィールド</th>
          </tr>
          <tr>
            <th>
              <select class="compare-field">${fields.map((f) => `<option value="${f.field}">${f.label}</option>`)}</select>
            </th>
          </tr>
        </tbody>
      </table>
    </div>`;
  }

  getInputNum() {
    return 5;
  }

  buildSQL() {
    const usedFields = this.getOutputFields();
    const sourceComponents = this.getSourceComponents();
    const firstTable = sourceComponents[0].getRuntimeTableName();
    const fieldsSQL = usedFields.map((f) => 'f.' + f.field).join(',');
    const compareField = $(this._el).find('.compare-field').val();
    let sql = `select ${fieldsSQL} from ${firstTable} f `;
    for (let i = 1, len = sourceComponents.length; i < len; i++) {
      const table = sourceComponents[i].getRuntimeTableName();
      sql += `inner join ${table} on ${table}.${compareField} = f.${compareField} `;
    }
    return sql;
  }
}
