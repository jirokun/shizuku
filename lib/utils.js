'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.flatten = flatten;
exports.isString = isString;
exports.isElement = isElement;
exports.findData = findData;
exports.findConnection = findConnection;
exports.cloneObj = cloneObj;
exports.findSourceEndpoint = findSourceEndpoint;
exports.findTargetEndpoint = findTargetEndpoint;
exports.generateId = generateId;
exports.encodeField = encodeField;
exports.decodeField = decodeField;
exports.escapeHTML = escapeHTML;
exports.escapeSQL = escapeSQL;

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function flatten(ary) {
  return ary.reduce(function (p, c) {
    return Array.isArray(c) ? p.concat(flatten(c)) : p.concat(c);
  }, []);
}

function isString(obj) {
  return typeof obj === 'string';
}

function isElement(obj) {
  try {
    return obj instanceof HTMLElement;
  } catch (e) {
    return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === "object" && obj.nodeType === 1 && _typeof(obj.style) === "object" && _typeof(obj.ownerDocument) === "object";
  }
}

function findData(state, dataId) {
  return state.data.find(function (def) {
    return def.id === dataId;
  });
}

function findConnection(state, connectionId) {
  return state.connections.find(function (def) {
    return def.id === connectionId;
  });
}

/** オブジェクトをcloneする */
function cloneObj(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/** Connectionに紐付いている2つのendpointのうち、source(output)となるendpointを返す */
function findSourceEndpoint(connection) {
  return connection.endpoints.find(function (ep) {
    return ep.getParameter('type') === 'output';
  });
}

/** Connectionに紐付いている2つのendpointのうち、target(input)となるendpointを返す */
function findTargetEndpoint(connection) {
  return connection.endpoints.find(function (ep) {
    return ep.getParameter('type') === 'input';
  });
}
var sequence = 1;
function generateId() {
  var id = void 0;
  do {
    id = 'szk' + sequence++;
    console.log(document.getElementById(id));
  } while (document.getElementById(id));
  return id;
}

/** field情報をhtmlのvalue値で持つ際のフォーマットを共通化 */
function encodeField(f) {
  return f.ownerId + ':' + f.field;
}

/** field情報をhtmlのvalue値で持つ際のフォーマットを共通化 */
function decodeField(str) {
  var tokens = str.split(/:/);
  return { ownerId: tokens[0], field: tokens[1] };
}

function escapeHTML(content) {
  var TABLE_FOR_ESCAPE_HTML = {
    "&": "&amp;",
    "\"": "&quot;",
    "<": "&lt;",
    ">": "&gt;"
  };
  return content.replace(/[&"<>]/g, function (match) {
    return TABLE_FOR_ESCAPE_HTML[match];
  });
}

function escapeSQL(val) {
  if (null == val) return 'NULL';
  if (Array.isArray(val)) {
    var vals = val.map(escapeSQL);
    return "(" + vals.join(", ") + ")";
  }
  var backslash = ~val.indexOf('\\');
  var prefix = backslash ? 'E' : '';
  val = val.replace(/'/g, "''");
  val = val.replace(/\\/g, '\\\\');
  return prefix + "'" + val + "'";
}