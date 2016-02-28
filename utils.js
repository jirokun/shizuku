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

/** jsPlumbからstateのconnectionを作成する */
export function createConnectionState(jp) {
  return jp.getAllConnections().map((c) => {
    const te = c.endpoints.find((ep) => ep.getParameter('type') === 'input');
    const se = c.endpoints.find((ep) => ep.getParameter('type') === 'output');
    return {
      sourceId: se.elementId,
      sourceEndpointId: se.getParameter('endpointId'),
      targetId: te.elementId,
      targetEndpointId: te.getParameter('endpointId'),
    };
  });
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
