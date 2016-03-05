import OutputComponent from '../../base/OutputComponent'
import { decodeField, encodeField, generateId } from '../../../../utils.js'

export default class OutputCsvComponent extends OutputComponent {
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
                <label class="vertical-checkbox check-all"><input type="checkbox"/> 全てチェック</label>
                <div class="use-field" style="max-height: 400px; overflow: auto;">
                  ${fields.map((f) => `<label class="vertical-checkbox"><input type="checkbox" name="outputFields" value="${encodeField(f)}"/> ${f.label}</label>`).join('\n')}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </form>`;
  }

  /** このコンポーネントで使用するフィールドを返す */
  getUsedFields() {
    const els = this._el.querySelectorAll('.use-field input[type="checkbox"]:checked');
    return Array.prototype.map.call(els, (el) => el.value);
  }

  buildSQL(fields) {
    const usedFields = this.getUsedFields().map((f) => decodeField(f).field);
    const tableName = this.getSourceComponents()[0].getRuntimeTableName();
    let sql = `select `;
    sql += usedFields.map((f) => tableName + "." + f).join(',');
    sql += ` from ${tableName}`;
    return sql;
  }

  componentDidMount() {
    $(this._el).on('change', '.check-all', this.allCheck.bind(this));
  }

  allCheck(e) {
    const checked = e.target.checked;
    $(this._el).find('.use-field input[type="checkbox"]').prop('checked', checked);
  }
}
