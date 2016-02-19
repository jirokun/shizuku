import React, { Component, PropTypes } from 'react'
import Draggable from 'react-draggable'
import Item from './Item'

export default class MergeItem extends Component {
  render() {
    const { dataId, state, actions } = this.props;
    return (
      <Item dataId={dataId} actions={actions} state={state} title="結合">
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
      </Item>
    );
  }
}
