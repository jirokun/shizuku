import { findTargetEndpoint, findSourceEndpoint, flatten, isElement, findComponentConstructor, findData } from '../../../utils'

const ENDPOINT_OPS = {
  isSource: true,
  isTarget: true,
  endpoint: ['Dot', { radius: 6 }],
  //connector: ["Flowchart", { stub: [30, 30], cornerRadius: 5, alwaysRespectStubs: true }],
  connectorOverlays:[[ "Arrow", { location:1 } ]],
  maxconnections: 1,
};

/**
 * Componentは必ずShizukuComponentを継承して作ること
 *
 * 必ずgetOutputFieldsを実装すること。
 * このコンポーネントを実行して後続のフィールドで取得できる
 * フィールドの一覧を記載する。
 */
export default class ShizukuComponent {
  /** コンストラクタ. 描画するElementをとる */
  constructor(el, shizuku) {
    this._el = el;
    this._shizuku = shizuku;
    this.initialized = false;
    this.horintal = false; // アンカーの配置
  }

  initJsPlumb() {
    const jp = this._shizuku.getJsPlumb();
    const draggable = jp.draggable(this._el);
    const inputNum = this.getInputNum();
    const outputNum = this.getOutputNum();

    for (let i = 0; i < inputNum; i++) {
      const ep = jp.addEndpoint(this._el, ENDPOINT_OPS, {
        anchor: this.inputAnchorPosition(i, inputNum),
      });
      ep.setParameter('endpointId', 'input-' + i);
      ep.setParameter('type', 'input');
    }

    for (let i = 0; i < outputNum; i++) {
      const ep = jp.addEndpoint(this._el, ENDPOINT_OPS, {
        anchor: this.outputAnchorPosition(i, outputNum),
        maxConnections: 10,
      });
      ep.setParameter('endpointId', 'output-' + i);
      ep.setParameter('type', 'output');
    }
  }

  /**
   * 指定したインデックスのAnchorを削除する
   */
  deleteInputEndpoint(index) {
    const jp = this._shizuku.getJsPlumb();
    const endpoints = jp.getEndpoints(this._el);
    const targetEndpoint = endpoints.findIndex((e) => e.getParameter('endpointId') === 'input-' + index);
    // TODO 残っているparameterのendpointIdを整える必要がある。
    console.log(endpoints[targetEndpoint]);
    jp.deleteEndpoint(endpoints[targetEndpoint]);
  }

  /**
   * 指定したインデックスのAnchorを削除する
   */
  addInputEndpoint() {
    const jp = this._shizuku.getJsPlumb();
    const endpoints = this.getSourceEndpoints();
    const i = endpoints.length;
    endpoints.forEach((e) => {
      console.log(e);
    });
    const ep = jp.addEndpoint(this._el, ENDPOINT_OPS, {
      anchor: this.inputAnchorPosition(this._horizontal, i, i),
    });
    ep.setParameter('endpointId', 'input-' + i);
    ep.setParameter('type', 'input');
  }

  /** type === 'input'のendpointsを取得する */
  getSourceEndpoints() {
    const jp = this._shizuku.getJsPlumb();
    console.log(jp.getEndpoints(this._el));
    return jp.getEndpoints(this._el).filter((e) => {
      console.log(e.getParameter('type'));
      return e.getParameter('type') === 'input'
    });
  }

  /**
   * endpointの位置をまとめて設定する
   */
  setEndpointPosition() {
    const jp = this._shizuku.getJsPlumb();
    const endpoints = this.getSourceEndpoints();
    endpoints.forEach((e, i) => e.setAnchor(this.inputAnchorPosition(i, endpoints.length)));
  }

  inputAnchorPosition(i, inputNum) {
    if (this._horizontal) {
      return [(i + 1) / (inputNum + 1), 0, 0, -1];
    } else {
      return [0, (i + 1) / (inputNum + 1), -1, 0];
    }
  }

  outputAnchorPosition(i, outputNum) {
    if (this._horizontal) {
      return [(i + 1) / (outputNum + 1), 1, 0, 1];
    } else {
      return [1, (i + 1) / (outputNum + 1), 1, 0];
    }
  }

  /** DOMに追加された時一度だけ呼ばれる */
  componentDidMount() {
    // 入力項目が変更された時は自動的にchangeFormが呼ばれるが、
    // 独自の入力項目を定義するような場合には独自にchangeFormを呼び出す必要がある。
    $(this._el).on('change', ':input', this.changeForm.bind(this));
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

  /** SQLを作成するときに使用するTableName */
  getRuntimeTableName() {
    return this._el.id;
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
    const fieldSet = new Set(this.getInputFields());
    this.getOriginalOutputFields().forEach((f) => fieldSet.add(f));
    return Array.from(fieldSet);
  }

  getInputFields() {
    // initializedされる前はsourceComponentsなどを取得できない
    if (!this.initialized) {
      return [];
    }
    // sourcesのfieldsを取得
    const sourceComponents = this.getSourceComponents();
    const sources = sourceComponents.map((sc) => sc.getOutputFields());
    const fieldSet = new Set(flatten(sources));
    return Array.from(fieldSet);
  }

  /** 使用するフィールドを返す */
  getUsedFields() {
    return [];
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

  /** SQLを作成する */
  buildSQL() {
    throw 'not impletented yet';
  }

  /** フォームの値が変わった時に呼び出す。関連するtargetComponentを更新し、さらにchangeFormを呼び出す。 */
  changeForm() {
    this.getTargetComponents().forEach((c) => {
      const value = c.getValue(); // backup
      c.render();
      c.setValue(value); // restore
      c.changeForm();
    });
  }

  /** 描画する */
  render() {
    if (!this.initialized) {
      this.initJsPlumb();
    }
    const jp = this._shizuku.getJsPlumb();
    jp.batch(() => {
      this._el.innerHTML = '';
      this._el.appendChild(this.buildComponent());
      this._el.dataset.type = this.constructor.name;
      this.initialized = true;
      this.onRendered();
    });
  }
}
