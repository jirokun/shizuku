import React, { Component, PropTypes } from 'react'
import Draggable from 'react-draggable'
import { findData } from '../../utils'

export default class Item extends Component {
  onDrag(e) {
    const { dataId, actions } = this.props;
    const r = this.refs.root.getBoundingClientRect();
    actions.moveItem(dataId, r.left, r.top, r.width, r.height);
  }
  render() {
    const { dataId, title, children, state } = this.props;
    const data = findData(state, dataId);
    const pos = {x: data.x, y: data.y};
    const rootStyle = {
      width: data.width + 'px',
      height: data.height + 'px'
    };
    const portStyle = {
      left: (data.width - 10) / 2 - 5 + 'px'
    };
    return (
      <Draggable handle=".header" onDrag={this.onDrag.bind(this)} start={pos}>
        <div ref="root" className="jpipes-input" style={rootStyle}>
          <div className="header">{title}</div>
          <div className="body">
            {children}
          </div>
          <div ref="portInput" className="port-input" style={portStyle}></div>
          <div ref="portOutput" className="port-output" style={portStyle}></div>
        </div>
      </Draggable>
    );
  }
}
