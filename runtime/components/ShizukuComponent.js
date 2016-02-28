import { isElement, findComponentConstructor, findData } from '../../utils'

/**
 * Componentは必ずShizukuComponentを継承して作ること
 */
export default class ShizukuComponent {
  /** コンストラクタ. 描画するElementをとる */
  constructor(el) {
    this.el = el;
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

  render() {
    this.el.appendChild(this.buildComponent());
    this.el.dataset.type = this.constructor.name;
  }
}
