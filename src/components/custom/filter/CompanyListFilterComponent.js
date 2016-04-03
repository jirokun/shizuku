import FilterComponent from '../../base/FilterComponent'
import { decodeField, encodeField } from '../../../utils.js'

export default class CompanyListFilterComponent extends FilterComponent {
  constructor(...args) { super(...args); }

  buildTitle() {
    return "会社リストフィルタ";
  }

  buildBody() {
    return `
      <form>
        <table class="table-form">
          <tbody>
            <tr>
              <th>絞込リストID</th>
              <td>
                <input type="text" name="listId"/>
              </td>
            </tr>
          </tbody>
        </table>
      </form>`;
  }

  buildSQL() {
    return "";
  }
}
