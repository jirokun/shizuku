import ShizukuComponent from './ShizukuComponent'

export default class MergeComponent extends ShizukuComponent {
  constructor(el) {
    super(el);
  }
  buildTitle() {
    return "結合";
  }
  buildBody() {
    return `
      <table class="table-form">
        <tbody>
          <tr>
            <th>対象のカラム</th>
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

  getInputNum() {
    return 5;
  }
}
