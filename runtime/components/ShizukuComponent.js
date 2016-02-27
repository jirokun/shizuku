import React, { Component, PropTypes } from 'react'
import { findComponentConstructor, findData } from '../../utils'

export default class ShizukuComponent extends Component {
  constructor(prop) {
    super(prop);
  }
  componentDidMount() {
    const inputNum = parseInt(this.props.inputNum, 10);
    const outputNum = parseInt(this.props.outputNum, 10);
    jp.draggable(this.refs.root);
    const horizontal = false; // アンカーの配置

    for (let i = 0; i < inputNum; i++) {
      jp.addEndpoint(this.refs.root, {
        isSource: true,
        isTarget: true,
        endpoint: ['Dot', { radius: 6 }],
        anchor: this.inputAnchorPosition(horizontal, i, inputNum),
        //connector: [ "Flowchart", { stub: [40, 60], cornerRadius: 5, alwaysRespectStubs: true } ],
        maxconnections: 1,
      });
    }

    for (let i = 0; i < outputNum; i++) {
      jp.addEndpoint(this.refs.root, {
        isSource: true,
        isTarget: true,
        endpoint: ['Dot', { radius: 6 }],
        anchor: this.outputAnchorPosition(horizontal, i, outputNum),
        //connector: [ "Flowchart", { stub: [40, 60], cornerRadius: 5, alwaysRespectStubs: true } ],
        maxConnections: 10,
      });
    }
  }

  componentWillUnmount() {
    const endpoints = jp.getEndpoints(this.refs.root);
    if (!endpoints) {
      return;
    }
    endpoints.forEach(e => {
      jp.deleteEndpoint(e);
    });
  }

  inputAnchorPosition(horizontal, i, inputNum) {
    if (horizontal) {
      return [(i + 1) / (inputNum + 1), 0, 0, -1];
    } else {
      return [0, (i + 1) / (inputNum + 1), -1, 0];
    }
  }
  outputAnchorPosition(horizontal, i, outputNum) {
    if (horizontal) {
      return [(i + 1) / (outputNum + 1), 1, 0, 1];
    } else {
      return [1, (i + 1) / (outputNum + 1), 1, 0];
    }
  }

  destroy() {
    const { dataId, actions } = this.props;
    actions.removeComponent(dataId);
  }

  render() {
    const { dataId, title, children, state, type } = this.props;
    const data = findData(state, dataId);
    const rootStyle = {};
    if (data) {
      rootStyle.left = data.x + 'px';
      rootStyle.top = data.y + 'px';
    }
    return (
      <div ref="root" className="shizuku-component" style={rootStyle} id={dataId} data-type={type}>
        <div className="shizuku-header">
        {title}
        <button type="button" className="close" onClick={this.destroy.bind(this)}><span>&times;</span></button>
        </div>
        <div className="shizuku-body">
          {children}
        </div>
      </div>
    );
  }
}

ShizukuComponent.defaultProps = {
  inputNum: 1,
  outputNum: 1,
};
