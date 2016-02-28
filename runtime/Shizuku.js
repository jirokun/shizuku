import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { findComponentConstructor } from '../utils'

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

  addComponent(c) {
    const container = document.createElement('div');
    container.id = c.id;
    container.className = 'shizuku-component-container';
    container.style.left = c.x + 'px';
    container.style.top = c.y + 'px';
    this.el.appendChild(container);
    const constructor = findComponentConstructor(c.type);
    // レンダリング
    const component = new constructor(container);
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
}
