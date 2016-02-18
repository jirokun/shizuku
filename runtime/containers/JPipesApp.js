import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Draggable from 'react-draggable'
import { } from '../actions'
import { findItemConstructor } from '../../utils'
import Item from '../components/Item'
import InputListFileItem from '../components/InputListFileItem'
import Connection from '../components/Connection'
import * as EnqueteActions from '../actions'

class JPipesApp extends Component {
  renderItems() {
    const { state, actions } = this.props;
    return state.data.map((data) => {
      const constructor = findItemConstructor(data.itemId);
      return React.createElement(constructor, {dataId: data.id, actions, state});
    });
  }
  renderConnections() {
    const { state } = this.props;
    return state.connections.map((con) => {
      return <Connection connectionId={con.id} state={state} />;
    });
  }
  render() {
    const { state, actions } = this.props;
    return (
      <div className="jpipes">
        <div className="svg-layer">
          <svg>
            {this.renderConnections()}
          </svg>
        </div>
        <div className="html-layer">
          {this.renderItems()}
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
