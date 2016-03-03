import ShizukuComponent from './ShizukuComponent'
import { decodeField, encodeField, generateId } from '../../utils.js'

export default class OutputCsvComponent extends ShizukuComponent {
  constructor(...args) { super(...args); }

  buildTitle() {
    return "CSV出力";
  }

  buildBody() {
    const fields = this.getInputFields();
    return `
      <form>
        <table class="table-form">
          <tbody>
            <tr>
              <th>出力ファイル</th>
              <td><input name="outputFile" type="text"/></td>
            </tr>
            <tr>
              <th>ヘッダー</th>
              <td>
                <label>
                  <input type="radio" value="on" name="header" checked/>
                  有り
                </label>
                <label>
                  <input type="radio" value="off" name="header"/>
                  無し
                </label>
              </td>
            </tr>
            <tr>
              <th>出力するフィールド</th>
              <td>
                ${fields.map((f) => `<label class="vertical-checkbox"><input type="checkbox" name="outputFields" value="${encodeField(f)}"/> ${f.label}</label>`).join('\n')}
              </td>
            </tr>
          </tbody>
        </table>
      </form>`;
  }

  getOutputNum() {
    return 0;
  }

  /** このコンポーネントで使用するフィールドを返す */
  getUsedFields() {
    const els = this._el.querySelectorAll('input[type="checkbox"]:checked');
    return Array.prototype.map.call(els, (el) => el.value);
  }

  buildSQL(fields) {
    const usedFields = this.getUsedFields().map((f) => decodeField(f).field);
    const sourceId = this.getSourceComponents()[0].getId();
    let sql = `select `;
    sql += usedFields.map((f) => sourceId + "." + f).join(',');
    sql += ` from ${sourceId}`;
    return sql;
  }

  onComplete(sqls) {
    const sqlArr = [];
    for (let i = 0, len = sqls.length - 1; i < len; i++) {
      const obj = sqls[i];
      sqlArr.push(`${obj.id} as ( ${obj.sql} )`);
    }

    let sql = `with ` + sqlArr.join('\n, ');
    sql += '\n' + sqls[sqls.length - 1].sql;
    console.log(sql);
  }
}
