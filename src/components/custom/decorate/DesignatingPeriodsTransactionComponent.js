import DecorateComponent from '../../base/DecorateComponent'
import { decodeField, encodeField } from '../../../utils.js'

export default class DesignatingPeriodsTransactionComponent extends DecorateComponent {
  constructor(...args) { super(...args); }

  buildTitle() {
    return "指定期間の取引";
  }

  buildBody() {
    return `
      <form>
        <table class="table-form">
          <tbody>
            <tr>
              <th>期間</th>
              <td>
                <input type="text" name="from"/>
                〜
                <input type="text" name="to"/>
              </td>
            </tr>
          </tbody>
        </table>
      </form>`;
  }

  getOriginalOutputFields() {
    const value = this.getValue();
    return [
      { label: '指定期間の取引数', field: 'designatingPeriodsTransactionNumber', ownerId: this.getRuntimeTableName() }
    ];
  }

  buildSQL() {
    return "";
  }
}
