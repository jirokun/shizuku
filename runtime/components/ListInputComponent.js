import ShizukuComponent from './ShizukuComponent'

export default class ListInputComponent extends ShizukuComponent {
  constructor(...args) { super(...args); }

  buildTitle() {
    return "リスト入力";
  }

  buildBody() {
    return `
      <form>
        <table class="table-form">
          <tbody>
            <tr>
              <th>対象のMR</th>
              <td><input name="targetMr" type="text"/></td>
            </tr>
            <tr>
              <th>入力するリスト</th>
              <td>
                <select name="listId">
                  <option value="LBC_1123287_DCF_20123">LBC_1123287_DCF_20123</option>
                  <option value="LBC_3213727_DCF_31928">LBC_3213727_DCF_31928</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>リストのタイプ</th>
              <td>
                <select name="listType">
                  <option value="dcf">医師コード</option>
                  <option value="system_cd">システムコード</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </form>`;
  }

  onRendered() {
  }

  getInputNum() {
    return 0;
  }

  getOriginalOutputFields() {
    return [
      { label: '医師コード', field: 'dcf_dr_cd' },
      { label: '姓', field: 'sei' },
      { label: '名', field: 'mei' },
      { label: '年齢', field: 'age' },
      { label: '第1診療科', field: 'dcf_specialty1' },
      { label: '第2診療科', field: 'dcf_specialty2' },
      { label: '第3診療科', field: 'dcf_specialty3' },
      { label: '第4診療科', field: 'dcf_specialty4' },
      { label: '第5診療科', field: 'dcf_specialty5' },
      { label: '最大病床数', field: 'dcf_max_bed_facility' },
      { label: '最小病床数', field: 'dcf_min_bed_facility' },
      { label: '最終ログイン日時', field: 'last_login_date' },
    ];
  }
}
