import { MOVE_ITEM } from '../constants'
import { cloneObj, findData } from '../utils'

export default function reducer(state, action) {
  const newState = cloneObj(state);
  console.log(state);
  try {
    if (action.type === MOVE_ITEM) {
      const data = findData(newState, action.dataId);
      data.x = action.x;
      data.y = action.y;
      data.width = action.width;
      data.height = action.height;
      return newState;
    }
    return newState;
  } catch(e) {
    alert(e);
    return newState;
  }
}
