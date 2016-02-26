import React, { Component, PropTypes } from 'react'
import ShizukuComponent from './ShizukuComponent'

export default class DcfFilterComponent extends Component {
  render() {
    const { dataId, state, actions } = this.props;
    return (
      <ShizukuComponent dataId={dataId} actions={actions} state={state} title="DCF医師のフィルタ" type="DcfFilterComponent">
        <div>
          条件は全てand条件です。
          <table className="table table-bordered table-condensed">
            <thead>
              <tr>
                <th></th>
                <th>条件</th>
                <th>値</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><button type="button" className="btn btn-mini btn-danger">削除</button></td>
                <td>
                  <select>
                    <option>診療科</option>
                    <option>年齢</option>
                    <option>病床数</option>
                    <option>役職</option>
                  </select>
                </td>
                <td>
                  <div>
                    対象<br/>
                    <label><input type="checkbox"/> 第1診療科</label><br/>
                    <label><input type="checkbox"/> 第2診療科</label><br/>
                    <label><input type="checkbox"/> 第3診療科</label><br/>
                    <label><input type="checkbox"/> 第4診療科</label><br/>
                    <label><input type="checkbox"/> 第5診療科</label><br/>
                  </div>
                  <div>
                    診療科コード
                    <input type="text"/>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ShizukuComponent>
    );
  }
}
