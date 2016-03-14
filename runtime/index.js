import '../www/css/shizuku.scss'
import Shizuku from './Shizuku'
import ShizukuMenu from './ShizukuMenu'

const shizuku = new Shizuku(document.getElementById('shizuku-editor'));
const shizukuMenu = new ShizukuMenu(document.getElementById('shizuku-menu'), shizuku);
shizukuMenu.render();
window.shizuku = shizuku;
