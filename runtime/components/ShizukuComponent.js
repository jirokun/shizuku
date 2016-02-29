import { findSourceEndpoint, flatten, isElement, findComponentConstructor, findData } from '../../utils'

/**
 * Componentは必ずShizukuComponentを継承して作ること
 */
export default class ShizukuComponent {
  /** コンストラクタ. 描画するElementをとる */
  constructor(el, shizuku) {
    this._el = el;
    this._shizuku = shizuku;
    this.initialized = false;
  }

  /** renderが呼ばれたあとに実行される */
  onRendered() {
  }

  /** titleを生成して返す。stringまたはElementを返す。子クラスでオーバーライドすることが前提 */
  buildTitle() {
    return "";
  }

  /** bodyを生成して返す。stringまたはElementを返す。子クラスでオーバーライドすることが前提 */
  buildBody() {
    return "";
  }

  /** inputのportの数を返す */
  getInputNum() {
    return 1;
  }

  /** outputのportの数を返す */
  getOutputNum() {
    return 1;
  }

  /** componentのHTMLを生成して返す。Elementを返す */
  buildComponent() {
    const shizukuComponentEl = document.createElement('div');
    shizukuComponentEl.className = 'shizuku-component';
    shizukuComponentEl.innerHTML = `
      <div class="shizuku-header">
        <button type="button" class="close"><span>&times;</span></button>
      </div>
      <div class="shizuku-body"></div>`;
    const shizukuHeader = shizukuComponentEl.querySelector('.shizuku-header');
    const shizukuBody = shizukuComponentEl.querySelector('.shizuku-body');
    const title = this.buildTitle();
    if (isElement(title)) {
      shizukuHeader.insertBefore(title, shizukuHeader.firstChild);
    } else if (typeof title === 'string') {
      const titleEl = document.createElement('span');
      titleEl.innerHTML = title;
      shizukuHeader.insertBefore(titleEl, shizukuHeader.firstChild);
    }

    const body = this.buildBody();
    if (isElement(body)) {
      shizukuBody.insertBefore(body, shizukuBody.firstChild);
    } else if (typeof title === 'string') {
      const bodyEl = document.createElement('span');
      bodyEl.innerHTML = body;
      shizukuBody.insertBefore(bodyEl, shizukuBody.firstChild);
    }
    return shizukuComponentEl;
  }

  getSourceElements() {
    const jp = this._shizuku.getJsPlumb();
    const inputEndpoints = jp.getEndpoints(this._el).filter((ep) => ep.getParameter('type') === 'input');
    const connections = flatten(inputEndpoints.map((ep) => ep.connections));
    const sourceEndpoints = connections.map((con) => findSourceEndpoint(con));
    return sourceEndpoints.map((ep) => ep.element);
  }

  getSourceComponents() {
    return this.getSourceElements().map((el) => this._shizuku.getComponent(el));
  }

  getOriginalOutputFields() {
    return [];
  }

  getOutputFields() {
    return this.getOriginalOutputFields();
  }

  /** formの内容を返す */
  getValue() {
    return {};
  }

  /** formの内容を復元する */
  setValue(value) {
  }

  /** 再描画する */
  refresh() {
    this._el.innerHTML = '';
    this.render();
  }

  /** SQLを作成する */
  buildSQL() {
    const fields = this.getOutputFields().map((f) => f.field).join('\n, ');
    let sql = `select ${fields} from`;
  }

  render() {
    this._el.appendChild(this.buildComponent());
    this._el.dataset.type = this.constructor.name;
    this.initialized = true;
    this.onRendered();
  }
}
