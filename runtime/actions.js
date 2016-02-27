import * as Constants from '../constants'

export function moveItem(dataId, x, y, width, height) {
  return {
    type: Constants.MOVE_ITEM,
    dataId, x, y, width, height
  };
}

export function loadState(state) {
  return { type: Constants.LOAD_STATE, state };
}

export function addComponent(type) {
  return { type: Constants.ADD_COMPONENT, componentType: type};
}

export function removeComponent(dataId) {
  return { type: Constants.REMOVE_COMPONENT, dataId: dataId};
}
