import ShizukuComponent from './ShizukuComponent'

export default class CsvInputComponent extends ShizukuComponent {
  constructor(el) {
    super(el);
  }
  buildTitle() {
    return "CSVファイル入力";
  }
  buildBody() {
    return `
      <table class="table-form">
        <tbody>
          <tr>
            <th>ファイル</th>
            <td><input type="file"/></td>
          </tr>
          <tr>
            <th>入力タイプ</th>
            <td>
              <select class="">
                <option value="dcf">医師コード</option>
                <option value="system_cd">システムコード</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>`;
  }
}
