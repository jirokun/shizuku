import OutputComponent from '../../base/OutputComponent'
import { decodeField, encodeField, generateId } from '../../../utils.js'

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
                  ${fields.map((f) => `<label class="vertical-checkbox"><input type="checkbox" name="useFields" value="${encodeField(f)}"/> ${f.label}</label>`).join('\n')}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </form>`;
  }

  /** このコンポーネントで使用するフィールドを返す */
  getUsedFields() {
    const els = this._el.querySelectorAll('input[name="useFields"]:checked');
    return Array.prototype.map.call(els, (el) => el.value);
  }

  buildSQL() {
    const usedFields = this.getUsedFields().map((f) => decodeField(f).field);
    const tableName = this.getSourceComponents()[0].getRuntimeTableName();
    let sql = `select `;
    sql += usedFields.map((f) => "t1." + f).join(',');
    sql += ` from ${tableName} t1`;
    return sql;
  }

  componentDidMount() {
    super.componentDidMount();
    $(this._el).on('change', '.check-all', this.allCheck.bind(this));
  }

  allCheck(e) {
    const checked = e.target.checked;
    $(this._el).find('.use-field input[type="checkbox"]').prop('checked', checked);
  }

  execute(sql) {
    $.blockUI();
    $.ajax({
      method: 'post',
      url: 'executeSQL',
      data: {
        sql: sql,
        fields: this.getUsedFields().map((f) => decodeField(f).field)
      },
      dataType: 'json'
    }).done((json) => {
      $.unblockUI();
      let $dlEl = $(this._el).find('a');
      if ($dlEl.length === 0) {
        $dlEl = $('<a>CSV DL</a>').appendTo($(this._el).find('form'));
      }
      $dlEl.attr('href', json.file);
    });
  }
}
