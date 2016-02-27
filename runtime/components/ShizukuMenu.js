import React, { Component, PropTypes } from 'react'
import { cloneObj } from '../../utils'
import ComponentList from './ComponentList'

export default class ShizukuMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      download: null
    };
  }
  createSaveLink() {
    const { createDownloadDataURI} = this.props;
    var dataURI = createDownloadDataURI();
    this.setState({ download: dataURI });
  }

  onFileSelected(e) {
    const { state, actions } = this.props;
    if (e.target.files.length !== 1) {
      return;
    }

    // 一度要素をクリア
    jp.reset();
    const emptyDataState = cloneObj(state);
    emptyDataState.data = [];
    actions.loadState(emptyDataState);

    const reader = new FileReader();
    reader.onload = (e) => {
      const state = JSON.parse(e.target.result);
      actions.loadState(state);
    }
    const file = e.target.files[0];
    reader.readAsText(file, 'UTF-8');
  }

  addComponent(e, type) {
    const { state, actions, onAddComponent } = this.props;
    const el = e.target;
    actions.addComponent(el.dataset.type);
  }

  renderAddMenu() {
    return ComponentList.map((c) => <li><a href="#" data-type={c.name} onClick={this.addComponent.bind(this)}>{c.name}</a></li>);
  }

  render() {
    const { state, actions, createDownloadDataURI, onAddComponent } = this.props;
    return (
      <nav className="shizuku-menu navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand">SHIZUKU - 雫 -</a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" onClick={this.createSaveLink.bind(this)}>File <span className="caret"></span></a>
                <ul className="dropdown-menu inverse-dropdown">
                  <li><a href="#" download="dump.json" href={this.state.download}>Save</a></li>
                  <li><label><input className="load-file" type="file" onChange={this.onFileSelected.bind(this)} accept=".json"/>Load</label></li>
                </ul>
              </li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Add <span className="caret"></span></a>
                <ul className="dropdown-menu inverse-dropdown">
                  {this.renderAddMenu()}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
