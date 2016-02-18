import InputListFileItem from './runtime/components/InputListFileItem'
import TranslateDcfSyscd from './runtime/components/TranslateDcfSyscd'

export function flatten(ary) {
  return ary.reduce((p, c) => {
    return Array.isArray(c) ? p.concat(flatten(c)) : p.concat(c);
  }, []);
}
/**
 * Itemを探す
 *
 * まず最初にitemsを探し、その後windowを探す
 */
export function findItemConstructor(name) {
  let items = {
    InputListFileItem,
    TranslateDcfSyscd,
  };
  if (items[name]) {
    return items[name];
  } else if (typeof window !== 'undefined' && window[name]) {
    return window[name];
  }
  throw 'Item is not defined: ' + name;
}

export function findData(state, dataId) {
  return state.data.find((def) => def.id === dataId);
}
export function findConnection(state, connectionId) {
  return state.connections.find((def) => def.id === connectionId);
}
/** オブジェクトをcloneする */
export function cloneObj(obj) {
  return JSON.parse(JSON.stringify(obj));
}
