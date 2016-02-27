import state from '../state.js'
import '../www/css/shizuku.scss'
import Shizuku from './Shizuku'

const shizuku = new Shizuku(document.getElementById('shizuku-editor'));
shizuku.load(state);
