import * as Constants from '../constants'
import { MOVE_ITEM } from '../constants'
import { cloneObj, findData } from '../utils'
import uuid from 'node-uuid'


function findDataIndex(state, dataId) {
  return state.data.findIndex((el) => el.id === dataId);
}
function removeComponent(state, dataId) {
  const targetIndex = findDataIndex(state, dataId);
  state.data.splice(targetIndex, 1);
  return state;
}
export default function reducer(state, action) {
  const newState = cloneObj(state);
  switch (action.type) {
    case Constants.ADD_COMPONENT:
      newState.data.push({
        type: action.componentType,
        id: uuid.v1(),
        x: 0,
        y: 0
      });
      return newState;
    case Constants.REMOVE_COMPONENT:
      return removeComponent(newState, action.dataId);
    case Constants.LOAD_STATE:
      return action.state;
    default:
      return newState;
  }
}
