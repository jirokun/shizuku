import ShizukuComponent from './ShizukuComponent'
import { generateId } from '../../utils.js'

export default class OutputCsvComponent extends ShizukuComponent {
  constructor(...args) { super(...args); }

  buildTitle() {
    return "CSV出力";
  }

  buildBody() {
    const name = generateId();
    return `
      <table class="table-form">
        <tbody>
          <tr>
            <th>出力ファイル</th>
            <td><input type="text"/></td>
          </tr>
          <tr>
            <th>ヘッダー</th>
            <td>
              <label>
                <input type="radio" value="on" name="${name}" checked/>
                有り
              </label>
              <label>
                <input type="radio" value="off" name="${name}"/>
                有り
              </label>
            </td>
          </tr>
        </tbody>
      </table>`;

  }

  getOriginalOutputFields() {
    return [
      { label: 'CSVファイル', field: 'csv_file' },
    ];
  }

}
