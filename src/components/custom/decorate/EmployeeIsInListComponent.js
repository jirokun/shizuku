import DecorateComponent from '../../base/DecorateComponent'
import { decodeField, encodeField } from '../../../utils.js'

export default class EmployeeIsInListComponent extends DecorateComponent {
  constructor(...args) { super(...args); }

  buildTitle() {
    return "従業員リストに含まれているかどうかフラグ追加";
  }

  buildBody() {
    return `
      <form>
        <table class="table-form">
          <tbody>
            <tr>
              <th>リストID</th>
              <td>
                <input type="text" name="listId"/>
              </td>
            </tr>
          </tbody>
        </table>
      </form>`;
  }

  getOriginalOutputFields() {
    const value = this.getValue();
    return [
      { label: 'リストに含まれているかどうか', field: 'employeeIsInList', ownerId: this.getRuntimeTableName() }
    ];
  }

  buildSQL() {
    return "";
  }
}
