import ShizukuComponent from './ShizukuComponent'
import { decodeField, encodeField } from '../../utils.js'

export default class DcfFilterComponent extends ShizukuComponent {
  constructor(...args) { super(...args); }

  getKey() {
    return 'dcf_dr_cd';
  }

  buildTitle() {
    return "医師のフィルタ";
  }

  buildBody() {
    const fields = this.getOutputFields();
    return `
      <div>
        条件は全てand条件です。
        <table class="table table-bordered table-condensed">
          <thead>
            <tr>
              <th></th>
              <th>フィールド</th>
              <th>比較種別</th>
              <th>値</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><button type="button" class="btn btn-mini btn-danger">削除</button></td>
              <td>
                <select class="condition-field">
                  ${fields.map((f) => `<option value="${encodeField(f)}">${f.label}</option>`)}
                </select>
              </td>
              <td>
                <select class="condition-type">
                  <option value="=">=</option>
                  <option value="!=">!=</option>
                  <option value="<">&lt;</option>
                  <option value=">">&gt;</option>
                  <option value="<=">&lt;=</option>
                  <option value=">=">&gt;=</option>
                  <option value="contains">含む</option>
                  <option value="begin_with">前方一致</option>
                </select>
              </td>
              <td>
                <input class="condition-value" type="text"/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>`;
  }

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

  getValue() {
    return $.map($(this._el).find('tbody tr'), (el) => {
      return {
        field: $(el).find('.condition-field').val(),
        type: $(el).find('.condition-type').val(),
        value: $(el).find('.condition-value').val()
      }
    });
  }

  setValue(value) {
    const trs = $(this._el).find('tbody tr');
    value.forEach((row, i) => {
      $(trs[i]).find('.condition-field').val(row.field),
      $(trs[i]).find('.condition-type').val(row.type),
      $(trs[i]).find('.condition-value').val(row.value)
    });
  }

  getUsedFields() {
    return $.map($(this._el).find('select.condition-field'), (el) => $(el).val());
  }

  buildSQL(fields) {
    const id = this.getId();
    const key = this.getKey();
    const otherTables = Array.from(new Set(Array.from(fields).map(decodeField).map((f) => `${f.ownerId}`)));
    const value = this.getValue();
    let sql = 'select ';
    sql += Array.from(fields).map(decodeField).map((f) => `${f.ownerId}.${f.field}`).join(',');
    sql += ` from ${id} `;
    sql += otherTables.map((t) => `inner join ${t} on ${t}.${key} = ${id}.${key}`).join('\n');
    sql += ` where `;
    sql += value.map((v) => `${v.field.replace(/:/, '.')} ${v.type} '${v.value}'`).join(",");
    return sql;
  }
}
