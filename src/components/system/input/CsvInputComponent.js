import InputComponent from '../../base/InputComponent'
import CSV from 'comma-separated-values'

export default class CsvInputComponent extends InputComponent {
  constructor(...args) { super(...args, { externalCommand: true}); }

  componentDidMount() {
    $(this._el).on('change', 'input[type="file"]', this._onFileChange.bind(this));
    $(this._el).on('click', '.generate-output-define-elments', this._onClickGenerateOutputDefineElements.bind(this));
  }

  getOutputTableName() {
    return this.getId();
  }

  _onFileChange(e) {
    const _this = this;
    const file = e.target.files[0];
    if (!file) {
      $('.generate-output-define-elments').prop('disabled', true);
      return;
    }
    $('.generate-output-define-elments').prop('disabled', false);
    var reader = new FileReader();
    reader.onload = (fileEvent) => {
      const result = fileEvent.target.result;
      const csv = CSV.parse(result);
      _this._csv = csv;
    };
    reader.readAsBinaryString(file);
  }

  /** 読み込んだCSVファイルから出力を定義するエレメントを生成する */
  _onClickGenerateOutputDefineElements(e) {
    if (!this._csv) {
      return;
    }
    const firstLine = this._csv[0];
    this._buildOutputFieldElements(firstLine);
  }

  _buildOutputFieldElements(firstLine) {
    const $tbody = $(this._el).find('.csv-info tbody');
    $tbody.empty();
    firstLine.forEach((cell, i) => {
      const $tr = $(`<tr>
        <td>${i + 1}列目</td>
        <td><span class="cell-sample-value"></span><input type="hidden" name="cellSampleValue"/></td>
        <td><input type="checkbox" name="isOutput"/></td>
        <td><input type="text" name="cellId"/></td>
        <td><input type="text" name="cellLabel"/></td>
        <td class="cell-type">
          <select name="cellType">
            <option value="varchar">文字列</option>
            <option value="numeric">数値型</option>
            <option value="date">日付型</option>
          </select>
        </td>
        <td class="cell-type-length"><input type="text" name="cellTypeLength" size="5"/></td>`).appendTo($tbody);
      $tr.find('.cell-sample-value').text(cell);
      $tr.find('input[name="cellSampleValue"]').val(cell);
      let selectValue;
      switch ($.type(cell)) {
        case 'string':
          selectValue = 'varchar';
          break;
        case 'number':
          selectValue = 'numeric';
          break;
        case 'date':
          selectValue = 'date';
          break;
      }
      $tr.find(`input[name="cellType"]`).val(selectValue);
      this._shizuku.getJsPlumb().repaintEverything();
    });
  }

  buildTitle() {
    return "CSVファイル入力";
  }

  buildBody() {
    return `
      <form>
        <table class="table-form">
          <tbody>
            <tr>
              <th>ファイル</th>
              <td><input name="" class="file" type="file"/></td>
            </tr>
            <tr>
              <th></th>
              <td><button class="generate-output-define-elments" type="button" disabled>CSVから出力フィールドを生成</button></td>
            <tr>
            </tr>
              <th>列の定義</th>
              <td>
                <table class="table-form bordered csv-info vertical">
                  <thead>
                    <tr>
                      <th></th>
                      <th>1行目のサンプル値</th>
                      <th>出力対象</th>
                      <th>フィールドID</th>
                      <th>ラベル名</th>
                      <th>型</th>
                      <th>桁情報</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </form>`;
  }

  getInputNum() {
    return 0;
  }

  buildSQL() {
    return "";
  }

  getOriginalOutputFields() {
    const values = this.getValue();
    const fields = [];
    // ファイルを読み込んでない場合は空配列を返す
    if (!values.cellLabel) {
      return [];
    }
    for (var i = 0, len = values.cellLabel.length; i < len; i++) {
      if (!values['isOutput:on'][i]) {
        continue;
      }
      fields.push({ label: values.cellLabel[i], field: values.cellId[i] });
    }
    return fields.map((f) => {
      f.ownerId = this.getRuntimeTableName();
      return f;
    });
  }

  setValue(value) {
    // あらかじめ値がセットできるように要素を作成しておく
    this._buildOutputFieldElements(value.cellSampleValue);
    super.setValue(value);
  }

}
