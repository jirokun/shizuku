import ShizukuComponent from './ShizukuComponent'
import { generateId } from '../../utils.js'

export default class OutputCsvComponent extends ShizukuComponent {
  constructor(...args) { super(...args); }

  buildTitle() {
    return "CSV出力";
  }

  buildBody() {
    const fields = this.getOutputFields();
    console.log(fields);
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
                ${fields.map((f) => `<label class="vertical-checkbox"><input type="checkbox" name="outputFields" value="${f.field}"/> ${f.label}</label>`).join('\n')}
              </td>
            </tr>
          </tbody>
        </table>
      </form>`;
  }

  getOutputNum() {
    return 0;
  }
}
