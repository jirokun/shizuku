import { findTargetEndpoint, findSourceEndpoint, flatten, isElement, findComponentConstructor, findData } from '../../utils'

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

  getId() {
    return this._el.id;
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

  /**
   * sourceまたはtargetのelementを取得する
   *
   * @param sourceOrTarget 'source' or 'target'
   */
  _getElements(sourceOrTarget) {
    const jp = this._shizuku.getJsPlumb();
    const type = sourceOrTarget === 'source' ? 'input' : 'output';
    const endpoints = jp.getEndpoints(this._el).filter((ep) => ep.getParameter('type') === type);
    const connections = flatten(endpoints.map((ep) => ep.connections));
    const finder = sourceOrTarget === 'source' ? findSourceEndpoint : findTargetEndpoint;
    const sourceEndpoints = connections.map((con) => finder(con));
    return sourceEndpoints.map((ep) => ep.element);
  }

  getSourceElements() {
    return this._getElements('source');
  }

  getSourceComponents() {
    return this.getSourceElements().map((el) => this._shizuku.getComponent(el));
  }

  getTargetElements() {
    return this._getElements('target');
  }

  getTargetComponents() {
    return this.getTargetElements().map((el) => this._shizuku.getComponent(el));
  }

  getOriginalOutputFields() {
    return [];
  }

  getOutputFields() {
    // initializedされる前はsourceComponentsなどを取得できない
    if (!this.initialized) {
      return [];
    }
    // sourcesのfieldsを取得
    const sourceComponents = this.getSourceComponents();
    const sources = sourceComponents.map((sc) => sc.getOutputFields());
    const fieldSet = new Set(flatten(sources));
    this.getOriginalOutputFields().forEach((f) => fieldSet.add(f));
    return Array.from(fieldSet);
  }

  /** formの内容を返す */
  getValue() {
    const $form = $(this._el).find('form');
    return $form.values();
  }

  /** formの内容を復元する */
  setValue(value) {
    const $form = $(this._el).find('form');
    return $form.values(value);
  }

  /** 再描画する */
  refresh() {
    this._el.innerHTML = '';
    this.render();
  }

  /** SQLを作成する */
  buildSQL() {
    throw 'not impletented yet';
  }

  render() {
    this._el.appendChild(this.buildComponent());
    this._el.dataset.type = this.constructor.name;
    this.initialized = true;
    this.onRendered();
  }
}
