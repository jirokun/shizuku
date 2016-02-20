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
    const startPos = { x: sd.x + sd.width / 2, y: sd.y + sd.height };
    const endPos = { x: dd.x + dd.width / 2, y: dd.y };
    const margin = 50;// Math.abs(endPos.y - startPos.y) / 1.1;
    const path = `M${startPos.x},${startPos.y} C${startPos.x},${startPos.y + margin} ${endPos.x},${endPos.y - margin} ${endPos.x},${endPos.y}`;

    return (
      <path d={path} fill="none" stroke="#ccc" strokeWidth="5"/>
    );
  }
}
