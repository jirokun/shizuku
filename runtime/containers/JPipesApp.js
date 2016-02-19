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
    const height = state.data.reduce((val, data) => {
      return Math.max(data.y + data.height, val);
    }, 0);
    const width = state.data.reduce((val, data) => {
      return Math.max(data.x + data.width, val);
    }, 0);
    const layerStyle = { width: width + 'px', height: height + 'px' };
    return (
      <div className="jpipes">
        <div className="svg-layer">
          <svg style={layerStyle}>
            <defs>
              <marker id="markerArrow" markerWidth="13" markerHeight="13" refX="2" refY="6" orient="auto">
                <path d="M2,2 L2,11 L10,6 L2,2" fill="#000000" />
              </marker>
            </defs>
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
