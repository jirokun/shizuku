import LogicalComponent from '../../base/LogicalComponent'
import { decodeField, flatten } from '../../../utils'

export default class MinusComponent extends LogicalComponent {
  constructor(...args) { super(...args); }

  buildTitle() {
    return "MINUS";
  }

  buildBody() {
    const fields = this.getOutputFields();
    return `<div>
      <div class="logical-image"><img width="100" height="100" src="img/minus.svg"/></div>
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
    return 2;
  }

  buildSQL() {
    const usedFields = this.getOutputFields();
    const sourceComponents = this.getSourceComponents();
    const plusTable = sourceComponents[0].getRuntimeTableName();
    const minusTable = sourceComponents[1].getRuntimeTableName();
    const fieldsSQL = usedFields.map((f) => 'p.' + f.field).join(',');
    const compareField = $(this._el).find('.compare-field').val();

    let sql = `select ${fieldsSQL} from ${plusTable} p `;
    sql += `left outer join ${minusTable} m on p.${compareField} = m.${compareField} `;
    sql += `where m.${compareField} is null`;
    return sql;
  }
}
