import React, { Component, PropTypes } from 'react'
import ShizukuComponent from './ShizukuComponent'

export default class TranslateDcfSyscdComponent extends Component {
  render() {
    const { dataId, state, actions } = this.props;
    return (
      <ShizukuComponent  {...this.props} title="DCFコードをシステムコードに変換" type={this.constructor.name}/>
    );
  }
}
TranslateDcfSyscdComponent.defaultProps = { inputNum: 1, outputNum: 1 };
