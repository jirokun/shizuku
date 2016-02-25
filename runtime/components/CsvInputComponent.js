import React, { Component, PropTypes } from 'react'
import JPipeComponent from './JPipeComponent'

export default class CsvInputComponent extends Component {
  render() {
    const { dataId, state, actions } = this.props;
    return (
      <JPipeComponent dataId={dataId} actions={actions} state={state} title="ファイル入力" type="CsvInputComponent">
        <form className="form-horizontal">
          <div className="form-group">
            <label className="col-sm-2 control-label">ファイル</label>
            <div className="col-sm-10">
              <input type="file" className="form-control"/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">ファイル</label>
            <div className="col-sm-10">
              <select className="form-control">
                <option value="dcf">DCF医師コード</option>
                <option value="system_cd">システムコード</option>
              </select>
            </div>
          </div>
        </form>
      </JPipeComponent>
    );
  }
}
