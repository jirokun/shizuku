import FilterComponent from '../../base/FilterComponent'
import { decodeField, encodeField } from '../../../../utils.js'

export default class GeneralFilterComponent extends FilterComponent {
  constructor(...args) { super(...args); }

  buildTitle() {
    return "汎用フィルタ";
  }

  buildBody() {
    const fields = this.getOutputFields();
    return `
      <div>
        条件は全てand条件です。
        <div>
          <button class="addrow"><i class="fa fa-plus-square"></i> 条件追加</button>
        </div>
        <table class="table table-bordered table-condensed filter-table">
          <thead>
            <tr>
              <th></th>
              <th>フィールド</th>
              <th>比較種別</th>
              <th>値</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><button type="button" class="close"><span>&times;</span></button></td>
              <td>
                <select class="condition-field">
                  ${fields.map((f) => `<option value="${encodeField(f)}">${f.label}</option>`)}
                </select>
              </td>
              <td>
                <select class="condition-type">
                  <option value="=">=</option>
                  <option value="!=">!=</option>
                  <option value="<">&lt;</option>
                  <option value=">">&gt;</option>
                  <option value="<=">&lt;=</option>
                  <option value=">=">&gt;=</option>
                  <option value="contains">含む</option>
                  <option value="begin_with">前方一致</option>
                </select>
              </td>
              <td>
                <input class="condition-value" type="text"/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>`;
  }

  componentDidMount() {
    $(this._el).on('click', '.filter-table tbody .close', this.deleteRow.bind(this));
    $(this._el).on('click', '.addrow', this.addRow.bind(this));
  }

  deleteRow(e) {
    if ($(this._el).find('.filter-table tbody > tr').length === 1) {
      $(this._el).find(':input').val('');
    } else {
      $(e.target).parents('tr').remove();
      this._shizuku.getJsPlumb().repaintEverything();
    }
  }

  addRow() {
    const trEl = $(this._el).find('.filter-table tbody > tr')[0];
    const clonedNode = $(trEl.cloneNode(true));
    clonedNode.find(':input').val('');
    clonedNode.appendTo($(this._el).find('.filter-table tbody'));
    this._shizuku.getJsPlumb().repaintEverything();
  }

  getValue() {
    return $.map($(this._el).find('tbody tr'), (el) => {
      return {
        field: $(el).find('.condition-field').val(),
        type: $(el).find('.condition-type').val(),
        value: $(el).find('.condition-value').val()
      }
    });
  }

  setValue(value) {
    for (let i = $(this._el).find('tbody tr').length, len = value.length; i < len; i++) {
      this.addRow();
    }
    const trs = $(this._el).find('tbody tr');
    value.forEach((row, i) => {
      $(trs[i]).find('.condition-field').val(row.field),
      $(trs[i]).find('.condition-type').val(row.type),
      $(trs[i]).find('.condition-value').val(row.value)
    });
  }

  getUsedFields() {
    return $.map($(this._el).find('select.condition-field'), (el) => $(el).val());
  }

  buildSQL(fields) {
    const sc = this.getSourceComponents()[0];
    const tableName = sc.getRuntimeTableName();
    const value = this.getValue();
    let sql = 'select ';
    sql += Array.from(fields).map(decodeField).map((f) => `${tableName}.${f.field}`).join(',');
    sql += ` from ${tableName} `;
    sql += ` where `;
    sql += value.map((v) => `${v.field.replace(/:/, '.')} ${v.type} '${v.value}'`).join(" and ");
    return sql;
  }
}
