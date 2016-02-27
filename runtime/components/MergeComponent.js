import React, { Component, PropTypes } from 'react'
import Draggable from 'react-draggable'
import ShizukuComponent from './ShizukuComponent'

export default class MergeComponent extends Component {
  render() {
    const { dataId, state, actions } = this.props;
    console.log();
    return (
      <ShizukuComponent {...this.props} title="結合" inputNum="5" type={this.constructor.name}>
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
MergeComponent.defaultProps = { inputNum: 5, outputNum: 1 };
