import React, { Component, PropTypes } from 'react'
import Draggable from 'react-draggable'
import Item from './Item'

export default class TranslateDcfSyscd extends Component {
  render() {
    const { dataId, state, actions } = this.props;
    return (
      <Item dataId={dataId} actions={actions} state={state} title="DCFコードをシステムコードに変換"/>
    );
  }
}
