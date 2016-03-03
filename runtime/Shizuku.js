import { decodeField, flatten, findTargetEndpoint, findSourceEndpoint, generateId, findComponentConstructor, isString } from '../utils'

export default class Shizuku {
  constructor(el) {
    this._el = el;
    this._jp = jsPlumb.getInstance(this._el);
    this._initializeEvents();
    this._componentMap = new Map();
  }

  /************* Events ***************/
  onConnect(info, originalEvent) {
    const tep = findTargetEndpoint(info.connection);
    const component = this.getComponent(tep.element);
    this._jp.batch(() => component.refresh());
  }

  onDisConnect(info, originalEvent) {
    const tep = findTargetEndpoint(info.connection);
    const component = this.getComponent(tep.element);
    this._jp.batch(() => component.refresh());
  }

  _initializeEvents() {
    $(this._el).on('click', '.shizuku-component .close', (e) => this.removeComponent($(e.target).parents('.shizuku-component-container')[0]));
    $(document).on('mousewheel', (e) => this.setZoom(this.getZoom() * (e.originalEvent.deltaY < 0 ? 1.05 : 0.95)));
    this._initializeJsPlumbEvents();
  }

  _initializeJsPlumbEvents() {
    this._jp.bind('connection', this.onConnect.bind(this));
    this._jp.bind('connectionDetached', this.onDisConnect.bind(this));
  }

  debug() {
    //this.findStartComponent();
    this.buildSQL();
  }

  /** elementにひもつくComponentを取得する */
  getComponent(el) {
    return this._componentMap.get(el);
  }

  getZoom() {
    return this._jp.getZoom();
  }

  setZoom(zoom) {
    this._el.style.transform = `scale(${zoom})`;
    this._jp.setZoom(zoom);
  }

  load(state) {
    this._jp.reset();
    this._initializeJsPlumbEvents();
    this._el.innerHTML = '';
    this._jp.batch(() => {
      state.data.forEach((c) => this.addComponent(c));
      // コネクションをはる
      state.connections.forEach((c) => {
        const sourceEndpoints = this._jp.getEndpoints(c.sourceId);
        const sep = sourceEndpoints.find((e) => e.getParameter('endpointId') === c.sourceEndpointId);
        const targetEndpoints = this._jp.getEndpoints(c.targetId);
        const tep = targetEndpoints.find((e) => e.getParameter('endpointId') === c.targetEndpointId);
        this._jp.connect({
          source: sep,
          target: tep
        });
      });
      // form内容をロード
      state.data.forEach((c) => {
        const el = document.getElementById(c.id);
        const component = this.getComponent(el);
        component.setValue(c.value);
      });
    });
  }

  /**
   * コンポーネントを追加する
   *
   * @param c string | object stringの場合はtype, objectの場合はid, x, y, type
   */
  addComponent(c) {
    const container = document.createElement('div');
    if (isString(c)) {
      container.id = generateId();
      container.style.left = '100px';
      container.style.top = '100px';
    } else {
      container.id = c.id;
      container.style.left = c.x + 'px';
      container.style.top = c.y + 'px';
    }
    const type = c.type || c;
    container.className = 'shizuku-component-container';
    this._el.appendChild(container);
    const constructor = findComponentConstructor(type);
    const component = new constructor(container, this);
    // レンダリング
    component.render();
    this._componentMap.set(container, component);
    this.initJsPlumb(container, component.getInputNum(), component.getOutputNum());
  }

  removeComponent(el) {
    this._jp.remove(el);
    this._componentMap.delete(el);
  }

  getJsPlumb() {
    return this._jp;
  }

  initJsPlumb(container, inputNum, outputNum) {
    const draggable = this._jp.draggable(container);
    const horizontal = false; // アンカーの配置
    const endpointOps = {
      isSource: true,
      isTarget: true,
      endpoint: ['Dot', { radius: 6 }],
      //connector: ["Flowchart", { stub: [30, 30], cornerRadius: 5, alwaysRespectStubs: true }],
      connectorOverlays:[[ "Arrow", { location:1 } ]],
      maxconnections: 1,
    };

    for (let i = 0; i < inputNum; i++) {
      const ep = this._jp.addEndpoint(container, endpointOps, {
        anchor: this.inputAnchorPosition(horizontal, i, inputNum),
      });
      ep.setParameter('endpointId', 'input-' + i);
      ep.setParameter('type', 'input');
    }

    for (let i = 0; i < outputNum; i++) {
      const ep = this._jp.addEndpoint(container, endpointOps, {
        anchor: this.outputAnchorPosition(horizontal, i, outputNum),
        maxConnections: 10,
      });
      ep.setParameter('endpointId', 'output-' + i);
      ep.setParameter('type', 'output');
    }
  }

  inputAnchorPosition(horizontal, i, inputNum) {
    if (horizontal) {
      return [(i + 1) / (inputNum + 1), 0, 0, -1];
    } else {
      return [0, (i + 1) / (inputNum + 1), -1, 0];
    }
  }

  outputAnchorPosition(horizontal, i, outputNum) {
    if (horizontal) {
      return [(i + 1) / (outputNum + 1), 1, 0, 1];
    } else {
      return [1, (i + 1) / (outputNum + 1), 1, 0];
    }
  }

  /** jsPlumbからstateのconnectionを作成する */
  getConnectionsDef() {
    return this._jp.getAllConnections().map((c) => {
      const te = findTargetEndpoint(c);
      const se = findSourceEndpoint(c);
      return {
        sourceId: se.elementId,
        sourceEndpointId: se.getParameter('endpointId'),
        targetId: te.elementId,
        targetEndpointId: te.getParameter('endpointId'),
      };
    });
  }

  getDataDef() {
    const shizukucomponentMap = this._el.querySelectorAll('.shizuku-component-container');
    return Array.prototype.map.call(shizukucomponentMap, (el) => {
      const rect = el.getBoundingClientRect();
      const type = el.dataset.type;
      const component = this.getComponent(el);
      const value = component.getValue();
      return { id: el.id, x: parseInt(rect.left), y: parseInt(rect.top), type, value };
    });
  }

  _findComponent(firstOrLast) {
    function recurse(c) {
      const components = firstOrLast === 'first' ? c.getSourceComponents() : c.getTargetComponents();
      if (components.length === 0) return c;
      return components.map((s) => recurse(s));
    }
    const shizukucomponentMap = this._el.querySelectorAll('.shizuku-component-container');
    const allComponents = Array.prototype.map.call(shizukucomponentMap, (el) => this.getComponent(el) );
    const startComponentSet = new Set(flatten(allComponents.map((c) => recurse(c))));
    return Array.from(startComponentSet);
  }

  /** 入力がない開始コンポーネントを取得する */
  findFirstComponents() {
    return this._findComponent('first');
  }

  /** 出力がない終了コンポーネントを取得する */
  findLastComponents() {
    return this._findComponent('last');
  }

  /** SQLを作成する */
  buildSQL() {
    function checkFieldRecurse(c) {
      c.getUsedFields().forEach((f) => usedFields.add(f));
      c.getSourceComponents().forEach(checkFieldRecurse);
    }
    function findUsedFields(ownerId) {
      const encodedFieldSet = new Set();
      for (let value of usedFields) {
        const field = decodeField(value);
        if (field.ownerId === ownerId) {
          encodedFieldSet.add(value);
        }
      }
      return encodedFieldSet;
    }
    function buildRecurse(c, parentFieldSet = new Set()) {
      const id = c.getId();
      // 実行済みのコンポーネントはパス
      if (builtSet.has(id)) { return; }
      // 親のコンポーネントが一つでも未実行だったらパス
      const sourceComponents = c.getSourceComponents();
      if (sourceComponents.some((pc) => !builtSet.has(pc.getId()))) { return };
      const fieldSet = new Set(parentFieldSet); // clone
      findUsedFields(id).forEach((f) => fieldSet.add(f));
      const sql = c.buildSQL(fieldSet);
      if (sql !== null) {
        sqls.push({
          id: id,
          sql: sql
        });
      }
      builtSet.add(id);
      c.getTargetComponents().forEach((c) => buildRecurse(c, fieldSet));
    }

    // 使用するフィールドをマーク lastからたどる
    const usedFields = new Set();
    const lastComponents = this.findLastComponents();
    lastComponents.forEach(checkFieldRecurse);

    // SQLを生成 firstからたどる
    const builtSet = new Set(); // 生成済みのSet
    const sqls = [];
    this.findFirstComponents().forEach((c) => buildRecurse(c));

    // 終了処理
    lastComponents.forEach((c) => c.onComplete(sqls));
  }

  /** 定義されている情報をdumpする */
  toJSON() {
    return {
      connections: this.getConnectionsDef(),
      data: this.getDataDef()
    };
  }
}
