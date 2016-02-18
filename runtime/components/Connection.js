import React, { Component, PropTypes } from 'react'
import Draggable from 'react-draggable'
import Item from './Item'
import {findConnection, findData } from '../../utils'

export default class Connection extends Component {
  render() {
    const { connectionId, state, actions } = this.props;
    const connection = findConnection(state, connectionId);
    const sd = findData(state, connection.sourceId);
    const dd = findData(state, connection.destinationId);
    const path = `M${sd.x + sd.width / 2},${sd.y + sd.height} L${dd.x + dd.width / 2},${dd.y}`;

    return (
      <path d={path} fill="none" stroke="blue"/>
    );
  }
}
