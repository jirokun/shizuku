import ComponentList from './runtime/components/ComponentList'

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
export function findComponentConstructor(name) {
  const component = ComponentList.find((c) => c.name === name);
  if (component) {
    return component;
  } else if (typeof window !== 'undefined' && window[name]) {
    return window[name];
  }
  throw 'Item is not defined: ' + name;
}

export function isString(obj) {
  return typeof obj === 'string';
}

export function isElement(obj) {
  try {
    return obj instanceof HTMLElement;
  }
  catch(e){
    return (typeof obj==="object") &&
      (obj.nodeType===1) && (typeof obj.style === "object") &&
      (typeof obj.ownerDocument ==="object");
  }
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

/** Connectionに紐付いている2つのendpointのうち、source(output)となるendpointを返す */
export function findSourceEndpoint(connection) {
  return connection.endpoints.find((ep) => ep.getParameter('type') === 'output');
}
