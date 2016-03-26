import FilterComponent from '../../base/FilterComponent'
import { decodeField, encodeField } from '../../../../utils.js'

export default class EmployeeListFilterComponent extends FilterComponent {
  constructor(...args) { super(...args); }

  buildTitle() {
    return "従業員リストフィルタ";
  }

  buildBody() {
    return `
      <form>
        <table class="table-form">
          <tbody>
            <tr>
              <th>絞込リスト</th>
              <td>
                <input type="text" name="listId"/>
              </td>
            </tr>
          </tbody>
        </table>
      </form>`;
  }

  buildSQL(fields) {
    return "";
  }
}
