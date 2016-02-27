import React, { Component, PropTypes } from 'react'
import ShizukuComponent from './ShizukuComponent'

export default class TranslateDcfSyscdComponent extends Component {
  render() {
    const { dataId, state, actions } = this.props;
    return (
      <ShizukuComponent dataId={dataId} actions={actions} state={state} title="DCFコードをシステムコードに変換" type={this.constructor.name}/>
    );
  }
}
