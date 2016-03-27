import { createDownloadDataURI, findComponentConstructor } from 'utils'
import ComponentList from './components/ComponentList'

export default class ShizukuComponentManager {
  constructor(options) {
    this._options = options.components;
  }

  /** Menuのためのコンポーネントを返す */
  getComponentsForMenu() {
    return this._options.components;
  }

  /** コンストラクタの名前をキーとしたコンポーネントの一覧を返す */
  getComponents() {
    this._options.components
  }
}
