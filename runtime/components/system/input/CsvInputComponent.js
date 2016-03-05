import ShizukuComponent from '../../base/ShizukuComponent'

export default class CsvInputComponent extends ShizukuComponent {
  constructor(...args) { super(...args); }

  buildTitle() {
    return "CSVファイル入力";
  }
  buildBody() {
    return `
      <table class="table-form">
        <tbody>
          <tr>
            <th>ファイル</th>
            <td><input class="file" type="file"/></td>
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
    ].map((f) => {
      f.ownerId = this.getRuntimeTableName();
      return f;
    });
  }
}
