import LogicalComponent from '../../base/LogicalComponent'
import { decodeField, flatten } from '../../../../utils'

export default class AddAttributeByEntryOrder extends LogicalComponent {
  constructor(...args) { super(...args); }

  buildTitle() {
    return "優先順に属性追加";
  }

  buildBody() {
    return `<div>
      <p>入力順に属性を追加します。</p>
      <form>
        <div>
          <button type="button" class="addrow"><i class="fa fa-plus-square"></i> 入力追加</button>
        </div>
        <table class="table table-bordered table-condensed define-table">
          <thead>
            <tr>
              <th></th>
              <th>入力順序</th>
              <th>付加する値</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><button type="button" class="close"><span>&times;</span></button></td>
              <td class"row-num">1</td>
              <td><input class="condition-value" type="text"/></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>`;
  }

  componentDidMount() {
    $(this._el).on('click', '.define-table tbody .close', this.deleteRow.bind(this));
    $(this._el).on('click', '.addrow', this.addRow.bind(this));
  }

  deleteRow(e) {
    const $tr = $(e.target).parents('tr');
    const $trs = $tr.parents('tbody').find('tr');
    if ($trs.length === 1) {
      $(this._el).find(':input').val('');
    } else {
      const index = $(this._el).find('.define-table tbody > tr').index($tr);
      $tr.remove();
      this.deleteInputEndpoint(index);
      this.setEndpointPosition();
      setTimeout(() => {
        this._shizuku.getJsPlumb().repaintEverything();
      }, 1);
    }
  }

  addRow(e) {
    console.log(e);
    const $trEls = $(this._el).find('.define-table tbody > tr');
    const trEl = $trEls[0];
    const clonedNode = $(trEl.cloneNode(true));
    clonedNode.find(':input').val('');
    clonedNode.appendTo($(this._el).find('.define-table tbody'));
    clonedNode.find('.row-num').text($trEls.length);
    this.addInputEndpoint();
    this.setEndpointPosition();
    setTimeout(() => {
      this._shizuku.getJsPlumb().repaintEverything();
    }, 1);
  }

  buildSQL(fields) {
    const usedFields = Array.from(fields).map(decodeField);
    const outputFields = this.getOutputFields();
    const sourceComponents = this.getSourceComponents();
    return sourceComponents.map((c) => {
      const id = c.getId();
      return `select ${usedFields.map((f) => 't1.' + f.field).join(',')} from ${id} t1`;
    }).join(' union ');
  }
}
