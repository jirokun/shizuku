'use strict';

require('../www/css/shizuku.scss');

var _Shizuku = require('./Shizuku');

var _Shizuku2 = _interopRequireDefault(_Shizuku);

var _ShizukuMenu = require('./ShizukuMenu');

var _ShizukuMenu2 = _interopRequireDefault(_ShizukuMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var shizuku = new _Shizuku2.default(document.getElementById('shizuku-editor'));
var shizukuMenu = new _ShizukuMenu2.default(document.getElementById('shizuku-menu'), shizuku);
shizukuMenu.render();
window.shizuku = shizuku;