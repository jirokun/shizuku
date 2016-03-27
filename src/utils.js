import ComponentList from './components/ComponentList'
import uuid from 'node-uuid'

export function flatten(ary) {
  return ary.reduce((p, c) => {
    return Array.isArray(c) ? p.concat(flatten(c)) : p.concat(c);
  }, []);
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

/** Connectionに紐付いている2つのendpointのうち、target(input)となるendpointを返す */
export function findTargetEndpoint(connection) {
  return connection.endpoints.find((ep) => ep.getParameter('type') === 'input');
}
let sequence = 1;
export function generateId() {
  let id;
  do {
    id = 'szk' + sequence++;
    console.log(document.getElementById(id));
  } while (document.getElementById(id));
  return id;
}

/** field情報をhtmlのvalue値で持つ際のフォーマットを共通化 */
export function encodeField(f) {
  return f.ownerId + ':' + f.field;
}

/** field情報をhtmlのvalue値で持つ際のフォーマットを共通化 */
export function decodeField(str) {
  const tokens = str.split(/:/);
  return { ownerId: tokens[0], field: tokens[1] };
}

export function escapeHTML(content) {
  var TABLE_FOR_ESCAPE_HTML = {
    "&": "&amp;",
    "\"": "&quot;",
    "<": "&lt;",
    ">": "&gt;"
  };
  return content.replace(/[&"<>]/g, function(match) {
    return TABLE_FOR_ESCAPE_HTML[match];
  });
}

export function escapeSQL(val) {
  if (null == val) return 'NULL';
  if (Array.isArray(val)) {
    var vals = val.map(escapeSQL)
    return "(" + vals.join(", ") + ")"
  }
  var backslash = ~val.indexOf('\\');
  var prefix = backslash ? 'E' : '';
  val = val.replace(/'/g, "''");
  val = val.replace(/\\/g, '\\\\');
  return prefix + "'" + val + "'";
}
