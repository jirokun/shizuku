import { createDownloadDataURI } from './utils'

export default class ShizukuMenu {
  constructor(el, shizuku, shizukuComponentManager) {
    this._el = el;
    this._shizuku = shizuku;
    this._shizukuComponentManager = shizukuComponentManager;
    this.initializeEvents();
  }

  initializeEvents() {
    $(this._el).on('click', '.file-dropdown', this.createSaveLink.bind(this));
    $(this._el).on('change', '.load-file', this.onFileSelected.bind(this));
    $(this._el).on('click', '.add-component', this.onClickAddComponent.bind(this));
    $(this._el).on('click', '.run', this.run.bind(this));
  }

  run() {
    this._shizuku.run();
  }

  createSaveLink() {
    const json = this._shizuku.toJSON();
    const dataURI = "data:application/octet-stream," + encodeURIComponent(JSON.stringify(json, null, 2));
    this.saveEl.setAttribute('href', dataURI);
  }

  onClickAddComponent(e) {
    const type = e.target.dataset.type;
    this._shizuku.addComponent(type);
  }

  onFileSelected(e) {
    if (e.target.files.length !== 1) {
      return;
    }

    // 一度要素をクリア
    const reader = new FileReader();
    reader.onload = (e) => {
      const state = JSON.parse(e.target.result);
      this._shizuku.load(state);
    }
    const file = e.target.files[0];
    reader.readAsText(file, 'UTF-8');
  }

  buildMenu() {
    return `
      <nav class="shizuku-menu navbar navbar-inverse">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar">
              <span class="sr-only"> Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand">SHIZUKU - 雫 -</a>
          </div>
          <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
              <li class="dropdown">
                <a href="#" class="file-dropdown dropdown-toggle" data-toggle="dropdown"> <span>File </span> <span class="caret"></span></a>
                <ul class="dropdown-menu inverse-dropdown">
                  <li><a class="save-link" download="dump.json">Save</a></li>
                  <li><label><input class="load-file" type="file" accept=".json"><span>Load</span></label></li>
                </ul>
              </li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown"><span>Add </span><span class="caret"></span></a>
                <ul class="add-component-list dropdown-menu inverse-dropdown"></ul>
              </li>
              <li><a class="run" href="#">Run</a></li>
            </ul>
          </div>
        </div>
      </nav>`;
  }

  render() {
    this._el.innerHTML = this.buildMenu();
    const menu = this._shizukuComponentManager.getComponentsForMenu();
    var addMenu = this._el.querySelector('.add-component-list');
    menu.forEach((childMenu) => {
      const $li = $(`<li class="dropdown-submenu"><a href="#" class="dropdown-toggle" data-toggle="dropdown">${childMenu.label}</li>`).appendTo(addMenu);
      const dropdown = $(`<ul class="add-component-list dropdown-menu inverse-dropdown"></ul>`).appendTo($li);
      childMenu.children.forEach((child) => {
        $(`<li><a href="#" class="add-component" data-type="${child.constructor.name}">${child.label}</a></li>`).appendTo(dropdown);
      });
    });
    this.saveEl = this._el.querySelector('.save-link');
  }
}
