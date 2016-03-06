import OutputComponent from '../../base/OutputComponent'
import OutputCsvComponent from './OutputCsvComponent'
import { decodeField, encodeField, generateId } from '../../../../utils.js'

export default class DebugSQLComponent extends OutputComponent {
  constructor(...args) { super(...args); }

  buildTitle() {
    return "Debug SQL";
  }

  buildBody() {
    const fields = this.getInputFields();
    return `
      <form>
        <table class="table-form">
          <tbody>
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
        <button type="button" class="generate-debug-sql">SQL生成</button>
      </form>`;
  }

  componentDidMount() {
    super.componentDidMount();
    $(this._el).on('click', '.generate-debug-sql', () => this._shizuku.buildSQL());
  }

  /** このコンポーネントで使用するフィールドを返す */
  getUsedFields() {
    return OutputCsvComponent.prototype.getUsedFields.call(this);
  }

  buildSQL(fields) {
    return OutputCsvComponent.prototype.buildSQL.call(this);
  }

  allCheck(e) {
    return OutputCsvComponent.prototype.allCheck.call(this, e);
  }

  onComplete(sqls) {
    const sql = super.onComplete(sqls);
    const dataURI = "data:application/octet-stream," + encodeURIComponent(sql);
    let $dlEl = $(this._el).find('a[download]');
    if ($dlEl.length === 0) {
      $dlEl = $('<a download="debug.sql">SQL DL</a>').appendTo($(this._el).find('form'));
    }
    $dlEl.attr('href', dataURI);
  }
}
