import { findComponentConstructor, isString } from '../utils'
import uuid from 'node-uuid'

export default class Shizuku {
  constructor(el) {
    this.el = el;
    this.jp = jsPlumb.getInstance(this.el);
    this.initializeEvents();
  }

  initializeEvents() {
    $(this.el).on('click', '.shizuku-component .close', (e) => this.removeComponent($(e.target).parents('.shizuku-component-container')));
  }

  load(state) {
    this.jp.reset();
    this.el.innerHTML = '';
    state.data.forEach((c) => this.addComponent(c));
    // コネクションをはる
    state.connections.forEach((c) => {
      const sourceEndpoints = this.jp.getEndpoints(c.sourceId);
      const sep = sourceEndpoints.find((e) => e.getParameter('endpointId') === c.sourceEndpointId);
      const targetEndpoints = this.jp.getEndpoints(c.targetId);
      const tep = targetEndpoints.find((e) => e.getParameter('endpointId') === c.targetEndpointId);
      this.jp.connect({
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
    this.el.appendChild(container);
    const constructor = findComponentConstructor(type);
    const component = new constructor(container);
    // レンダリング
    component.render();
    this.initJsPlumb(container, 1, 1);
  }

  removeComponent(el) {
    this.jp.remove(el);
  }

  initJsPlumb(container, inputNum, outputNum) {
    this.jp.draggable(container);
    const horizontal = false; // アンカーの配置
    const endpointOps = {
      isSource: true,
      isTarget: true,
      endpoint: ['Dot', { radius: 6 }],
      maxconnections: 1,
    };

    for (let i = 0; i < inputNum; i++) {
      const ep = this.jp.addEndpoint(container, endpointOps, {
        anchor: this.inputAnchorPosition(horizontal, i, inputNum),
      });
      ep.setParameter('endpointId', 'input-' + i);
      ep.setParameter('type', 'input');
    }
    for (let i = 0; i < outputNum; i++) {
      const ep = this.jp.addEndpoint(container, endpointOps, {
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
    return this.jp.getAllConnections().map((c) => {
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
    const shizukuComponents = this.el.querySelectorAll('.shizuku-component-container');
    return Array.prototype.map.call(shizukuComponents, function (el) {
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
