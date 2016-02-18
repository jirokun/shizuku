import { MOVE_ITEM } from '../constants'
export function moveItem(dataId, x, y, width, height) {
  return {
    type: MOVE_ITEM,
    dataId, x, y, width, height
  };
}
