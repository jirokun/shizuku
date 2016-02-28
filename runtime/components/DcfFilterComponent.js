import ShizukuComponent from './ShizukuComponent'

export default class DcfFilterComponent extends ShizukuComponent {
  constructor(...args) { super(...args); }

  buildTitle() {
    return "医師のフィルタ";
  }

  buildBody() {
    return `
      <div>
        条件は全てand条件です。
        <table class="table table-bordered table-condensed">
          <thead>
            <tr>
              <th></th>
              <th>条件</th>
              <th>値</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><button type="button" class="btn btn-mini btn-danger">削除</button></td>
              <td>
                <select>
                  <option>診療科</option>
                  <option>年齢</option>
                  <option>病床数</option>
                  <option>役職</option>
                </select>
              </td>
              <td>
                <div>
                  対象<br/>
                  <label><input type="checkbox"/> 第1診療科</label><br/>
                  <label><input type="checkbox"/> 第2診療科</label><br/>
                  <label><input type="checkbox"/> 第3診療科</label><br/>
                  <label><input type="checkbox"/> 第4診療科</label><br/>
                  <label><input type="checkbox"/> 第5診療科</label><br/>
                </div>
                <div>
                  診療科コード<br/>
                  <input type="text"/>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>`;
  }

  getOutputFields() {
    const source = this.getSourceComponents()[0];
    return source.getOutputFields();
  }
}
