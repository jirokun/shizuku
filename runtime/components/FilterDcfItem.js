import React, { Component, PropTypes } from 'react'
import Draggable from 'react-draggable'
import Item from './Item'

export default class FilterDcfItem extends Component {
  render() {
    const { dataId, state, actions } = this.props;
    return (
      <Item dataId={dataId} actions={actions} state={state} title="DCF医師のフィルタ">
        <div>
          条件は全てand条件です。
          <table className="table table-bordered table-condensed">
            <thead>
              <tr>
                <th></th>
                <th>条件</th>
                <th>値</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><button type="button" className="btn btn-mini btn-danger">削除</button></td>
                <td>
                  <select>
                    <option>診療科</option>
                    <option>年齢</option>
                    <option>病床数</option>
                    <option>役職</option>
                  </select>
                </td>
                <td>
                  <div>
                    対象の第n診療科
                    <select size="5" multiple>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                  <div>
                    診療科コード
                    <input type="text"/>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Item>
    );
  }
}
