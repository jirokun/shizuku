import React, { Component, PropTypes } from 'react'
import Draggable from 'react-draggable'
import ShizukuComponent from './ShizukuComponent'

export default class MergeComponent extends Component {
  render() {
    const { dataId, state, actions } = this.props;
    return (
      <ShizukuComponent dataId={dataId} actions={actions} state={state} title="結合" inputNum="5">
        <table className="table-form">
          <tbody>
            <tr>
              <th>対象のカラム</th>
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
