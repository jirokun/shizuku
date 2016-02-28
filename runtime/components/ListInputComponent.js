import ShizukuComponent from './ShizukuComponent'

export default class ListInputComponent extends ShizukuComponent {
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
            <th>対象のMR</th>
            <td><input type="text"/></td>
          </tr>
          <tr>
            <th>入力するリスト</th>
            <td>
              <select class="">
                <option value="all">全員</option>
                <option value="only_20">20歳代のみ</option>
              </select>
            </td>
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

  onRendered() {
  }

  getInputNum() {
    return 0;
  }
}
