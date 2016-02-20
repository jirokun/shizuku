import React, { Component, PropTypes } from 'react'
import Draggable from 'react-draggable'
import { findData } from '../../utils'

export default class Item extends Component {
  componentDidMount() {
    this.forceUpdate();
  }
  onDrag(e) {
    const { dataId, actions } = this.props;
    const r = this.refs.root.getBoundingClientRect();
    actions.moveItem(dataId, window.scrollX + r.left, window.scrollY + r.top, r.width, r.height);
  }
  getTitle() {
  }
  renderInputPort(data) {
    const portStyle = {
      left: (data.width - 10) / 2 - 5 + 'px'
    };
    return (
      <div className="top-port-container">
        <div className="port-input" style={portStyle}/>
      </div>
    );
  }
  renderOutputPort(data) {
    const portStyle = {
      left: (data.width - 10) / 2 - 5 + 'px'
    };
    return (
      <div className="bottom-port-container">
        <div className="port-output" style={portStyle}/>
      </div>
    );
  }
  renderBody() {
  }
  render() {
    const { dataId, title, children, state } = this.props;
    const data = findData(state, dataId);
    const pos = {x: data.x, y: data.y};
    const rootStyle = {
      width: data.width + 'px',
      height: data.height + 'px'
    };
    return (
      <Draggable handle=".header" onDrag={this.onDrag.bind(this)} onStop={this.onDrag.bind(this)} start={pos}>
        <div ref="root" className="jpipes-dialog jpipes-input" style={rootStyle}>
          <div className="header">{title ? title : this.getTitle()}</div>
          <div className="body">
            {children ? children : this.renderBody()}
          </div>
          {this.renderInputPort(data)}
          {this.renderOutputPort(data)}
        </div>
      </Draggable>
    );
  }
}
