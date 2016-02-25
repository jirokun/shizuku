import React, { Component, PropTypes } from 'react'
import JPipeComponent from './JPipeComponent'

export default class TranslateDcfSyscdComponent extends Component {
  render() {
    const { dataId, state, actions } = this.props;
    return (
      <JPipeComponent dataId={dataId} actions={actions} state={state} title="DCFコードをシステムコードに変換"/>
    );
  }
}
