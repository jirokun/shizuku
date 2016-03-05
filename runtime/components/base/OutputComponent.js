import ShizukuComponent from './ShizukuComponent'
import { decodeField, encodeField, generateId } from '../../../utils.js'


/**
 * デザインしたグラフの終端は必ずOutputComponentである必要がある。
 */
export default class OutputComponent extends ShizukuComponent {
  constructor(...args) { super(...args); }

  getOutputNum() {
    return 0;
  }

  onComplete(sqls) {
    const sqlArr = [];
    for (let i = 0, len = sqls.length - 1; i < len; i++) {
      const obj = sqls[i];
      if (obj.type === 'input') {
        // do nothing
      } else if (obj.type === 'sql') {
        sqlArr.push(`${obj.id} as ( ${obj.sql} )`);
      } else {
        throw 'unkown sqls type: ' + obj.type;
      }
    }

    let sql = `with ` + sqlArr.join('\n, ');
    sql += '\n' + sqls[sqls.length - 1].sql;
    console.log(sql);
  }
}
