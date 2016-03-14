import LogicalComponent from '../../base/LogicalComponent'
import { decodeField, flatten, escapeHTML } from '../../../../utils'

export default class AddAttributeByEntryOrder extends LogicalComponent {
  constructor(...args) {
    super(...args);
    this.row = ['']; // 描画のためのデータ
  }

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
            ${this.row.map((value, i) => `
            <tr>
              <td><button type="button" class="close"><span>&times;</span></button></td>
              <td class"row-num">${i}</td>
              <td><input name="additionValue" class="condition-value" type="text" value="${escapeHTML(value)}"/></td>
            </tr>`).join('')}
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
      const jp = this._shizuku.getJsPlumb();
      jp.batch(() => {
        this.row = this.getValue().additionValue;
        this.row.splice(index, 1);
        this.render(() => {
          const $form = $(this._el).parents('form');
          $form.find('input[name="condition-value"]').each((i, el) => {
            $(el).val(this.row[i]);
          })
        });
        this.deleteInputEndpoint(index);
        this.setEndpointPosition();
      });
    }
  }

  addRow(e) {
    const jp = this._shizuku.getJsPlumb();
    this.row = this.getValue().additionValue;
    jp.batch(() => {
      this.row.push('');
      this.render();
      this.addInputEndpoint();
      this.setEndpointPosition();
    });
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
