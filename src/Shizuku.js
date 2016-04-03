import Panzoom from 'jquery.panzoom'
import { isElement, decodeField, flatten, findTargetEndpoint, findSourceEndpoint, generateId, isString } from './utils'
import InputComponent from './components/base/InputComponent'
import OutputComponent from './components/base/OutputComponent'

export default class Shizuku {
  constructor(el, shizukuComponentManager) {
    this._el = el;
    this._shizukuComponentManager = shizukuComponentManager;
    el.style.width = '30000px';
    el.style.height = '30000px';
    this._jp = jsPlumb.getInstance(this._el);
    this._initializeEvents();
    this._componentMap = new Map();
  }

  /************* Events ***************/
  onConnect(info, originalEvent) {
    const tep = findTargetEndpoint(info.connection);
    const component = this.getComponent(tep.element).render();
  }

  onDisConnect(info, originalEvent) {
    const tep = findTargetEndpoint(info.connection);
    const component = this.getComponent(tep.element).render();
  }

  _initializeEvents() {
    // ShizukuComponentの削除ボタンのイベント
    $(this._el).on('click', '.shizuku-component .shizuku-header .close', (e) => this.removeComponent($(e.target).parents('.shizuku-component-container')[0]));
    // ShizukuComponentの情報ポップアップ用
    $(this._el).on('mouseover', '.shizuku-component .shizuku-header .input-info', (e) => this.getComponent($(e.target).parents('.shizuku-component-container')[0]).popupInputComponentInfo());
    $(this._el).on('mouseover', '.shizuku-component .shizuku-header .output-info', (e) => this.getComponent($(e.target).parents('.shizuku-component-container')[0]).popupOutputComponentInfo());
    this._initializeJsPlumbEvents();
    this._initializePanzoom();
  }

  _initializePanzoom() {
    var $panzoom = $(this._el).panzoom({
      contain: 'invert',
      minScale: 0.1,
      maxScale: 2,
      onZoom: (e, panzoom) => {
        const currentZoom = parseFloat(panzoom.getMatrix()[0]);
        // jsPlumbにも設定しておく
        this._jp.setZoom(currentZoom);
      }
    });
    $panzoom.parent().on('mousewheel.focal', function(e) {
      e.preventDefault();
      var delta = e.delta || e.originalEvent.wheelDelta;
      var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
      console.log(zoomOut);
      $panzoom.panzoom('zoom', zoomOut, {
        increment: 0.1,
        animate: true,
        focal: e
      });
    });
    // componentは選択できるようにイベントをキャンセル
    // see http://codepen.io/timmywil/pen/bFiqy
    $(this._el).on('mousedown touchstart', '.shizuku-component', (e) => {
      e.stopImmediatePropagation();
    });
  }

  _initializeJsPlumbEvents() {
    this._jp.bind('connection', this.onConnect.bind(this));
    this._jp.bind('connectionDetached', this.onDisConnect.bind(this));
  }

  /**
   * keyにひもつくComponentを取得する
   * keyはelementまたはid
   */
  getComponent(key) {
    if (isElement(key)) {
      return this._componentMap.get(key);
    } else {
      for (var [mapKey, mapValue] of this._componentMap) {
        if (key === mapKey.id) {
          return mapValue;
        }
      }
    }
  }

  getZoom() {
    return this._jp.getZoom();
  }

  load(state) {
    this._jp.reset();
    this._initializeJsPlumbEvents();
    this._el.innerHTML = '';
    this._jp.batch(() => {
      state.data.forEach((c) => this.addComponent(c));
      // 一度endpointを作成するために値を復元。後でもう一度値を復元する
      this.descendingOrderProcess((currentComponent, parentComponents, fieldSet) => {
        // formの内容をロード
        const data = state.data.find((d) => d.id === currentComponent.getId());
        currentComponent.setValue(data.value);
      });

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
      this.descendingOrderProcess((currentComponent, parentComponents, fieldSet) => {
        // レンダリング
        currentComponent.render();
        // formの内容をロード
        const data = state.data.find((d) => d.id === currentComponent.getId());
        currentComponent.setValue(data.value);
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
    const constructor = this._shizukuComponentManager.findComponentConstructor(type);
    const component = new constructor(container, this);
    // レンダリング
    component.render();
    component.componentDidMount();
    this._componentMap.set(container, component);
  }

  removeComponent(el) {
    this._jp.remove(el);
    this._componentMap.delete(el);
  }

  getJsPlumb() {
    return this._jp;
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
      const left = parseInt(el.style.left);
      const top = parseInt(el.style.top);
      const type = el.dataset.type;
      const component = this.getComponent(el);
      const value = component.getValue();
      return { id: el.id, x: isNaN(left) ? 0 : left, y: isNaN(top) ? 0 : top, type, value };
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

  /** 出力コンポーネントを取得する */
  findOutputComponents() {
    const shizukucomponentMap = this._el.querySelectorAll('.shizuku-component-container');
    const allComponents = Array.prototype.map.call(shizukucomponentMap, (el) => this.getComponent(el) );
    return allComponents.filter((c) => c instanceof OutputComponent);
  }

  /**
   * 指定したコンポーネントの親コンポーネントを処理順に並べる
   */
  getParentComponentOrderByProcess(component) {
    function getParentsAndSelf(c, componentSet = new Set()) {
      const sources = c.getSourceComponents();
      if (sources.length !== 0) {
        sources.forEach((child) => getParentsAndSelf(child, componentSet));
      }
      componentSet.add(c);
      return componentSet;
    }
    function orderByProccess(components, list = []) {
      components.forEach((c) => {
        // 処理対象じゃないまたは
        // 処理対象かつ一つでも親がlistに入っていなければ後回し
        if (!parentsAndSelf.has(c) || (parentsAndSelf.has(c) && c.getSourceComponents().find((pc) => !list.includes(pc)))) {
          return;
        }
        list.push(c);
        orderByProccess(c.getTargetComponents(), list);
      });
      return list;
    }
    // 一度全ての親を取得する
    const parentsAndSelf = getParentsAndSelf(component);
    // その中で開始コンポーネントを取得する
    const firstComponents = Array.from(parentsAndSelf).filter((c) => c.getSourceComponents().length === 0);
    // 降順に並べる
    const orderdComponent = orderByProccess(firstComponents);
    return orderdComponent;
  }

  /**
   * 降順に処理する
   */
  descendingOrderProcess(func) {
    function checkFieldRecurse(c) {
      c.getUsedFields().forEach((f) => usedFields.add(f));
      c.getSourceComponents().forEach(checkFieldRecurse);
    }

    /** ownerIdのfieldSetを取得 */
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
      const tableName = c.getRuntimeTableName();

      // 実行済みのコンポーネントはパス
      if (builtSet.has(id)) { return; }

      // 親のコンポーネントが一つでも未実行だったらパス
      const sourceComponents = c.getSourceComponents();
      if (sourceComponents.some((pc) => !builtSet.has(pc.getId()))) { return };

      const fieldSet = new Set(parentFieldSet); // clone
      findUsedFields(tableName).forEach((f) => fieldSet.add(f));

      func(c, sourceComponents, fieldSet);

      builtSet.add(id);
      c.getTargetComponents().forEach((c) => buildRecurse(c, fieldSet));
    }

    // 使用するフィールドをマーク lastからたどる
    const usedFields = new Set();
    const lastComponents = this.findLastComponents();
    lastComponents.forEach(checkFieldRecurse);

    const builtSet = new Set(); // 生成済みのSet
    this.findFirstComponents().forEach((c) => buildRecurse(c));
  }

  /** SQLを作成する */
  run() {
    this.findOutputComponents().forEach((c) => c.execute());
  }

  /** 定義されている情報をdumpする */
  toJSON() {
    return {
      connections: this.getConnectionsDef(),
      data: this.getDataDef()
    };
  }
}
