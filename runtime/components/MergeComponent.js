import React, { Component, PropTypes } from 'react'
import Draggable from 'react-draggable'
import ShizukuComponent from './ShizukuComponent'

export default class MergeComponent extends Component {
  render() {
    const { dataId, state, actions } = this.props;
    return (
      <ShizukuComponent dataId={dataId} actions={actions} state={state} title="結合" inputNum="5">
        <form className="form-horizontal">
          <div className="form-group">
            <label className="col-sm-2 control-label">対象のカラム</label>
            <div className="col-sm-10">
              <select className="form-control">
                <option value="dcf">DCF医師コード</option>
                <option value="system_cd">システムコード</option>
              </select>
            </div>
          </div>
        </form>
      </ShizukuComponent>
    );
  }
}
