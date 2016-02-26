import React, { Component, PropTypes } from 'react'
import { findComponentConstructor, findData } from '../../utils'

export default class ShizukuComponent extends Component {
  componentDidMount() {
    const inputNum = parseInt(this.props.inputNum, 10);
    const outputNum = parseInt(this.props.outputNum, 10);
    jp.draggable(this.refs.root);
    for (let i = 0; i < inputNum; i++) {
      jp.addEndpoint(this.refs.root, {
        isSource: true,
        isTarget: true,
        endpoint: ['Dot', { radius: 5 }],
        anchor: [(i + 1) / (inputNum + 1), 0, 0, -1],
        //connector: [ "Flowchart", { stub: [40, 60], cornerRadius: 5, alwaysRespectStubs: true } ],
        maxconnections: 1,
      });
    }

    for (let i = 0; i < outputNum; i++) {
      jp.addEndpoint(this.refs.root, {
        isSource: true,
        isTarget: true,
        endpoint: ['Dot', { radius: 5 }],
        anchor: [(i + 1) / (outputNum + 1), 1, 0, 1],
        //connector: [ "Flowchart", { stub: [40, 60], cornerRadius: 5, alwaysRespectStubs: true } ],
        maxConnections: 10,
      });
    }
  }
  render() {
    const { dataId, title, children, state, type } = this.props;
    const data = findData(state, dataId);
    const rootStyle = {
      left: data.x + 'px',
      top: data.y + 'px'
    };
    return (
      <div ref="root" className="shizuku-component" style={rootStyle}>
        <div className="shizuku-header">{title}</div>
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
