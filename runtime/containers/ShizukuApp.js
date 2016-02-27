import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { } from '../actions'
import { findComponentConstructor, createDownloadDataURI, cloneObj } from '../../utils'
import ShizukuMenu from '../components/ShizukuMenu'
import * as EnqueteActions from '../actions'
import uuid from 'node-uuid'

class ShizukuApp extends Component {
  componentDidMount() {
    // jsPlumbのインスタンスは実行時に存在しないといけないので、
    // #rootをデフォルトとして作成する。
    // しかし、実際にはrootではなく、jsplumbContainerにぶら下げるため、
    // 再度ここでsetContainerする。
    jp.setContainer(this.refs.jsplumbContainer);
    jp.repaintEverything();
  }

  componentDidUpdate(prevProps, prevState) {
    setTimeout(function() {
      jp.repaintEverything();
      jp.repaint();
    }, 1000);
  }

  renderShizukuComponents() {
    const { state, actions } = this.props;
    return state.data.map((c) => {
      return React.createElement(findComponentConstructor(c.type), {
        dataId: c.id,
        type: c.type,
        state,
        actions
      });
    });
  }

  createDownloadDataURI() {
    const { state, actions } = this.props;
    const shizukuComponents = this.refs.jsplumbContainer.querySelectorAll('.shizuku-component');
    var data = Array.prototype.map.call(shizukuComponents, function (el) {
      const rect = el.getBoundingClientRect();
      const type = el.dataset.type;
      return { id: el.id, x: parseInt(rect.left), y: parseInt(rect.top), type };
    });
    const clonedState = cloneObj(state);
    clonedState.data = data;
    return "data:application/octet-stream," + encodeURIComponent(JSON.stringify(clonedState, null, 2));
  }

  render() {
    const { state, actions } = this.props;
    console.log(state);
    return (
      <div className="shizuku">
        <ShizukuMenu state={state} actions={actions} createDownloadDataURI={this.createDownloadDataURI.bind(this)}/>
        <div ref="jsplumbContainer" className="jsplumb-container">
          { this.renderShizukuComponents() }
        </div>
      </div>
    )
  }
}

ShizukuApp.propTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

function select(state) {
  return {state};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(EnqueteActions, dispatch)
  }
}

export default connect(
  select,
  mapDispatchToProps
)(ShizukuApp)
