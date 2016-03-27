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

  buildSQL(fields) {
    return OutputCsvComponent.prototype.buildSQL.call(this);
  }

  allCheck(e) {
    return OutputCsvComponent.prototype.allCheck.call(this, e);
  }

  execute(sql, externalComponents) {
    const commands = externalComponents.map((c) => {
      const value = c.getValue();
      const ids = value.cellId;
      const types = value.cellType;
      const typeLengths = value.cellTypeLength;
      const tableName = c.getRuntimeTableName();
      let command = `psql -d $db_name -U $user_name -c "drop table if exists ${tableName}"
psql -d $db_name -U $user_name -c "create table ${tableName} (`;
      command += ids.map((id, i) => `${ids[i]} ${types[i]}` + (typeLengths[i] !== '' ? `(${typeLengths[i]})` : '')).join(',');
      command += ')"\n';
      command += `psql -d $db_name -U $user_name -c"\\copy ${tableName} (${ids.join(',')}) from '$filename' with csv"`;
      return command;
    });

    const script = `#!/bin/bash
set -eu

filename=$1

${commands.join('\n')}
SQL="${sql}"
echo $SQL | psql -d $db_name -U $user_name
`;
    console.log(script);
    const dataURI = "data:application/octet-stream," + encodeURIComponent(script);
    let $dlEl = $(this._el).find('a[download]');
    if ($dlEl.length === 0) {
      $dlEl = $('<a download="exec.txt">Shell DL</a>').appendTo($(this._el).find('form'));
    }
    $dlEl.attr('href', dataURI);
  }
}
