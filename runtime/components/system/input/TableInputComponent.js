import InputComponent from '../../base/InputComponent'
import { decodeField, encodeField } from '../../../../utils.js'

export default class TableInputComponent extends InputComponent {
  constructor(...args) { super(...args); }

  buildTitle() {
    return "汎用テーブルローダー";
  }

  buildBody() {
    const fields = this.getOutputFields();
    return `
      <div>
        <table class="table-form">
          <tbody>
            <tr>
              <th>対象のテーブル</th>
              <th>
                <select class="target-table">
                  <option value="users">ユーザ情報</option>
                  <option value="transactions">取引情報</option>
                </select>
              </th>
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
      ].map((f) => {
        f.ownerId = this.getRuntimeTableName();
        return f;
      });
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

  getOutputTableName() {
    return this._el.querySelector('.target-table').value;
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
