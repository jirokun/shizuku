import InputComponent from '../base/InputComponent'
import { decodeField, encodeField } from '../../../utils.js'

export default class TableInputComponent extends InputComponent {
  constructor(...args) { super(...args); }

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
              <th>対象のテーブル</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><button type="button" class="btn btn-mini btn-danger">削除</button></td>
              <td>
                <select class="condition-field">
                  <option value="users">users</option>
                </select>
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
    const sc = this.getSourceComponents()[0];
    const id = sc.getId();
    const value = this.getValue();
    let sql = 'select ';
    sql += Array.from(fields).map(decodeField).map((f) => `${f.ownerId}.${f.field}`).join(',');
    sql += ` from ${id} `;
    sql += ` where `;
    sql += value.map((v) => `${v.field.replace(/:/, '.')} ${v.type} '${v.value}'`).join(",");
    return sql;
  }
}
