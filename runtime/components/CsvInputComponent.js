import React, { Component, PropTypes } from 'react'
import ShizukuComponent from './ShizukuComponent'

export default class CsvInputComponent extends Component {
  render() {
    const { dataId, state, actions } = this.props;
    return (
      <ShizukuComponent dataId={dataId} actions={actions} state={state} title="ファイル入力" type={this.constructor.name}>
        <table className="table-form">
          <tbody>
            <tr>
              <th>ファイル</th>
              <td><input type="file"/></td>
            </tr>
            <tr>
              <th>入力タイプ</th>
              <td>
                <select className="">
                  <option value="dcf">医師コード</option>
                  <option value="system_cd">システムコード</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </ShizukuComponent>
    );
  }
}
