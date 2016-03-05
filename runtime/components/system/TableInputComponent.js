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
                <select class="target-table">
                  <option value="users">users</option>
                  <option value="transactions">transactions</option>
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
    const targetTable = this._el.querySelector('.target-table').value;
    if (targetTable === 'users') {
      return [
        { label: 'ユーザID', field: 'id' },
        { label: '姓', field: 'sei' },
        { label: '名', field: 'mei' },
        { label: '年齢', field: 'age' },
        { label: '会社名', field: 'employment' },
        { label: '従業員数', field: 'employee_number' },
        { label: '専門コード', field: 'specialty' },
        { label: '最終ログイン日時', field: 'last_login' },
      ];
    } else if (targetTable === 'transactions') {
      return [
        { label: 'ユーザID', field: 'user_id' },
        { label: '金額', field: 'amount' },
        { label: '取引日時', field: 'created_date' },
      ];
    }
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
