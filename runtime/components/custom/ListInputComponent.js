import ShizukuComponent from '../base/ShizukuComponent'
import { decodeField } from '../../../utils.js'

export default class ListInputComponent extends ShizukuComponent {
  constructor(...args) { super(...args); }

  buildTitle() {
    return "リスト入力";
  }

  buildBody() {
    return `
      <form>
        <table class="table-form">
          <tbody>
            <tr>
              <th>対象のMR</th>
              <td><input name="targetMr" type="text"/></td>
            </tr>
            <tr>
              <th>入力するリスト</th>
              <td>
                <select name="listId">
                  <option value="LBC_1123287_DCF_20123">LBC_1123287_DCF_20123</option>
                  <option value="LBC_3213727_DCF_31928">LBC_3213727_DCF_31928</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>リストのタイプ</th>
              <td>
                <select name="listType">
                  <option value="id">ユーザID</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </form>`;
  }

  onRendered() {
  }

  getInputNum() {
    return 0;
  }

  getOriginalOutputFields() {
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
      f.ownerId = this.getId();
      return f;
    });
  }

  buildSQL(fieldSet) {
    return null;
  }
}
