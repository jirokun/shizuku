import React, { Component, PropTypes } from 'react'
import Draggable from 'react-draggable'
import Item from './Item'

export default class MergeItem extends Item {
  getTitle() {
    return '結合';
  }
  renderInputPort(data) {
    const portStyle = {
      left: (data.width - 10) / 2 - 5 + 'px'
    };
    return (
      <div className="top-port-container">
        <div className="port-input" style={portStyle}/>
        <div className="port-input" style={portStyle}/>
      </div>
    );
  }
  renderBody() {
    return (
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
    );
  }
}
