import { createDownloadDataURI } from './utils'

export default class ShizukuComponentManager {
  constructor(options) {
    this._options = options;
  }

  /** Menuのためのコンポーネントを返す */
  getComponentsForMenu() {
    return this._options.components;
  }

  /** コンストラクタの名前をキーとしたコンポーネントの一覧を返す */
  getComponentMap() {
    const componentMap = {};
    this._options.components.forEach((child) => {
      child.children.forEach((leaf) => {
        componentMap[leaf.constructor.name] = leaf.constructor;
      });
    });
    return componentMap;
  }

  /**
   * Itemを探す
   *
   * まず最初にitemsを探し、その後windowを探す
   */
  findComponentConstructor(name) {
    const componentMap = this.getComponentMap();
    const component = componentMap[name];
    if (!component) {
      throw 'Item is not defined: ' + name;
    }
    return component;
  }

}
