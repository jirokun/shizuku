import DecorateComponent from '../../base/DecorateComponent'
import { decodeField, encodeField, cloneObj } from '../../../utils.js'
import moment from 'moment'

export default class TransactionByMonthComponent extends DecorateComponent {
  constructor(...args) { super(...args); }

  buildTitle() {
    return "月ごと取引回数属性追加";
  }

  buildBody() {
    const years = [], months = [];
    for (let y = 2000, max = new Date().getFullYear(); y <= max; y++) { years.push(y); }
    for (let m = 1, max = 12; m <= max; m++) { months.push(m); }
    return `
      <form>
        <table class="table-form">
          <tbody>
            <tr>
              <th>対象期間</th>
              <th>
                <select name="from-year">${years.map((y) => `<option value="${y}">${y}</option>` )}</select>
                <select name="from-month">${months.map((m) => `<option value="${m}">${m}</option>` )}</select>
                〜
                <select name="to-year">${years.map((y) => `<option value="${y}">${y}</option>` )}</select>
                <select name="to-month">${months.map((m) => `<option value="${m}">${m}</option>` )}</select>
              </th>
            </tr>
          </tbody>
        </table>
      </form>`;
  }

  getOutputFields() {
    // initializedされる前はsourceComponentsなどを取得できない
    if (!this.initialized) {
      return [];
    }
    const sourceComponents = this.getSourceComponents();
    if (sourceComponents.length === 0) {
      return [];
    }
    const outputFields = cloneObj(sourceComponents[0].getOutputFields());
    const fromYear = $(this._el).find(':input[name="from-year"]').val();
    const fromMonth = $(this._el).find(':input[name="from-month"]').val();
    const toYear = $(this._el).find(':input[name="to-year"]').val();
    const toMonth = $(this._el).find(':input[name="to-month"]').val();
    const from = new Date(fromYear, fromMonth - 1);
    const to = new Date(toYear, toMonth - 1);
    const yearMonthFields = [];
    while (to.getTime() >= from.getTime()) {
      yearMonthFields.push({
        label: moment(from).format('YYYY年MM月'),
        field: 'tbmc' + moment(from).format('YYYYMM'),
        ownerId: this.getId()
      });
      from.setMonth(from.getMonth() + 1);
    }
    yearMonthFields.forEach((m) => outputFields.push(m));
    return outputFields;
  }

  buildSQL(fields) {
    const sc = this.getSourceComponents()[0];
    const value = this.getValue();
    let sql = `select `;
    sql += Array.from(fields).map(decodeField).map((f) => {
      if (f.ownerId === this.getRuntimeTableName()) {
        const m = f.field.match(/tbmc(\d{6})/);
        const ym = m[1];
        const ymMoment = moment(ym + '01');
        return `count((t.created_date >= '${ymMoment.format('YYYY-MM-DD')}' and t.created_date < '${ymMoment.add(1, 'M').format('YYYY-MM-DD')}') or null) as ${f.field}`;
      } else {
        return `s.${f.field}`;
      }
    }).join(',');
    sql += ` from ${sc.getRuntimeTableName()} s`;
    sql += ` inner join transactions t on s.id = t.user_id`;
    sql += ` group by ${Array.from(fields).map(decodeField).filter((f) => f.ownerId != this.getRuntimeTableName()).map((f) => `s.${f.field}`).join(',')}`;
    return sql;
  }
}
