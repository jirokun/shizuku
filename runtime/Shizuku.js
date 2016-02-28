import { findComponentConstructor, isString } from '../utils'
import uuid from 'node-uuid'

export default class Shizuku {
  constructor(el) {
    this._el = el;
    this._jp = jsPlumb.getInstance(this._el);
    this._initializeEvents();
    this._componentMap = new Map();
  }

  _initializeEvents() {
    $(this._el).on('click', '.shizuku-component .close', (e) => this.removeComponent($(e.target).parents('.shizuku-component-container')[0]));
    $(document).on('mousewheel', (e) => this.setZoom(this.getZoom() * (e.originalEvent.deltaY < 0 ? 1.05 : 0.95)));
  }

  debug() {
    const values = this._componentMap.values();
    for (const component of values) {
      const fields = component.getOutputFields();
      console.log(component._el, fields);
    }
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
    this._el.innerHTML = '';
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
  }

  /**
   * コンポーネントを追加する
   *
   * @param c string | object stringの場合はtype, objectの場合はid, x, y, type
   */
  addComponent(c) {
    const container = document.createElement('div');
    if (isString(c)) {
      container.id = uuid.v1();
      container.style.left = '0px';
      container.style.top = '0px';
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
      const te = c.endpoints.find((ep) => ep.getParameter('type') === 'input');
      const se = c.endpoints.find((ep) => ep.getParameter('type') === 'output');
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
    return Array.prototype.map.call(shizukucomponentMap, function (el) {
      const rect = el.getBoundingClientRect();
      const type = el.dataset.type;
      return { id: el.id, x: parseInt(rect.left), y: parseInt(rect.top), type };
    });
  }

  /** 定義されている情報をdumpする */
  toJSON() {
    return {
      connections: this.getConnectionsDef(),
      data: this.getDataDef()
    };
  }
}
