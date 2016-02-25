import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Draggable from 'react-draggable'
import { } from '../actions'
import { findComponentConstructor } from '../../utils'
import * as EnqueteActions from '../actions'

class JPipesApp extends Component {
  componentDidMount() {
  }
  renderJPipeComponents() {
    const { state, actions } = this.props;
    return state.data.map((c) => {
      return React.createElement(findComponentConstructor(c.type), {
        dataId: c.id,
        state,
        actions
      });
    });
  }
  render() {
    const { state, actions } = this.props;
    return (
      <div className="jpipes">
        <div ref="jsplumbContainer" className="jsplumb-container">
          { this.renderJPipeComponents() }
        </div>
      </div>
    )
  }
}

JPipesApp.propTypes = {
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
)(JPipesApp)
