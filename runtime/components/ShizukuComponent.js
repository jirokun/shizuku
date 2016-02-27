import React, { Component, PropTypes } from 'react'
import { findComponentConstructor, findData } from '../../utils'

export default class ShizukuComponent extends Component {
  constructor(prop) {
    super(prop);
  }
  componentDidMount() {
    /*
    const inputNum = parseInt(this.props.inputNum, 10);
    const outputNum = parseInt(this.props.outputNum, 10);
    jp.draggable(this.refs.root);
    const horizontal = false; // アンカーの配置

    const endpointOps = {
      isSource: true,
      isTarget: true,
      endpoint: ['Dot', { radius: 6 }],
      maxconnections: 1,
    };

    for (let i = 0; i < inputNum; i++) {
      const ep = jp.addEndpoint(this.refs.root, endpointOps, {
        anchor: this.inputAnchorPosition(horizontal, i, inputNum),
      });
      ep.setParameter('endpointId', 'input-' + i);
      ep.setParameter('type', 'input');
    }

    for (let i = 0; i < outputNum; i++) {
      const ep = jp.addEndpoint(this.refs.root, endpointOps, {
        anchor: this.outputAnchorPosition(horizontal, i, outputNum),
        maxConnections: 10,
      });
      ep.setParameter('endpointId', 'output-' + i);
      ep.setParameter('type', 'output');
    }
    */
  }

  componentWillUnmount() {
    /*
    const endpoints = jp.getEndpoints(this.refs.root);
    if (!endpoints) {
      return;
    }
    endpoints.forEach(e => {
      jp.deleteEndpoint(e);
    });
    */
  }

  destroy() {
    const { dataId, actions } = this.props;
    jp.getEndpoints(this.refs.root).forEach((ep) => ep.detachAll());
    actions.removeComponent(dataId);
  }

  render() {
    const { id, type, title, children } = this.props;
    return (
      <div ref="root" className="shizuku-component">
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
