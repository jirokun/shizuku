import InputComponent from '../../base/InputComponent'
import OutputComponent from '../../base/OutputComponent'
import OutputCsvComponent from './OutputCsvComponent'
import { decodeField, encodeField, generateId } from '../../../utils.js'

export default class OutputShellComponent extends OutputComponent {
  constructor(...args) { super(...args); }

  buildTitle() {
    return "シェルスクリプト出力";
  }

  buildBody() {
    const fields = this.getInputFields();
    return `
      <form>
        <table class="table-form bordered vertical">
          <tbody>
            <tr>
              <td><input type="checkbox" class="check-all"/></td>
              <th>出力するフィールド</th>
            </tr>
            ${fields.map((f) => `<tr><td><input type="checkbox" name="useFields" value="${encodeField(f)}"/></td><td>${f.label}</td></tr>`).join('\n')}
          </tbody>
        </table>
      </form>`;
  }

  componentDidMount() {
    super.componentDidMount();
    $(this._el).on('change', '.check-all', this.toggleAllCheckbox.bind(this));
  }

  toggleAllCheckbox(e) {
    const checked = $(e.target)[0].checked;
    $(this._el).find('form input[name]').prop('checked', checked);
  }

  /** このコンポーネントで使用するフィールドを返す */
  getUsedFields() {
    return OutputCsvComponent.prototype.getUsedFields.call(this);
  }

  buildSQL() {
    return OutputCsvComponent.prototype.buildSQL.call(this);
  }

  allCheck(e) {
    return OutputCsvComponent.prototype.allCheck.call(this, e);
  }

  buildPartialSQL(components) {
    let sql;
    if (components.length > 1) {
      const lastComponent = components.pop();
      sql = 'with ' + components.map((c) => `${c.getRuntimeTableName()} as (${c.buildSQL()})\n`);
      sql += lastComponent.buildSQL();
    } else {
      sql = components[0].buildSQL();
    }
    return sql;
  }

  // TODO 外部コマンドを実行するスクリプトを生成する
  generateExternalCommand() {
    return "";
    const components = this.getParentComponentOrderByProcess()
      .filter((c) => c.isExternalCompoent());
    const script = components.map((c) => {
      if (c instanceof InputComponent) {
        // InputComponentはなにも入力がない
      } else {
        // InputComponent以外は前段までのSQLが入力になる
        const partialComponents = this.getParentComponentOrderByProcess()
        const sql = this.buildPartialSQL(partialComponents);
        return `echo "${sql}" | psql -h $db_host -d $db_name -U $user_name | ${c.getExternalCommandName()}`;
      }
    }).join('\n');
    return script;
  }

  execute() {

    const components = this.getParentComponentOrderByProcess()
      .filter((c) => !(c instanceof InputComponent));

    const sql = this.buildPartialSQL(components);
    const script = `#!/bin/bash
set -eu

db_host=$\{1:-localhost}
db_name=$\{2:-test}
user_name=$\{3:-$(whoami)}

${this.generateExternalCommand()}
SQL="${sql}"

echo $SQL | psql -h $db_host -d $db_name -U $user_name
`;
    let $dlEl = $(this._el).find('a[download]');
    if ($dlEl.length === 0) {
      $dlEl = $('<a download="exec.txt">Shell DL</a>').appendTo($(this._el).find('form'));
    }
    var blob = new Blob([script], { "type" : "text/plain" });
    const URL = window.URL || window.webkitURL;
    $dlEl.attr("href", URL.createObjectURL(blob));
  }
}
