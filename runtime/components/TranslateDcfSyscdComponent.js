import ShizukuComponent from './ShizukuComponent'

export default class TranslateDcfSyscdComponent extends ShizukuComponent {
  constructor(...args) { super(...args); }

  buildTitle() {
    return "DCFコードをシステムコードに変換";
  }

  getOriginalOutputFields() {
    return [
      { label: 'システムコード', field: 'system_cd' },
      { label: '姓', field: 'sei' },
      { label: '名', field: 'mei' },
      { label: '年齢', field: 'age' },
      { label: '第1診療科', field: 'dcf_specialty1' },
      { label: '第2診療科', field: 'dcf_specialty2' },
      { label: '第3診療科', field: 'dcf_specialty3' },
      { label: '第4診療科', field: 'dcf_specialty4' },
      { label: '第5診療科', field: 'dcf_specialty5' },
      { label: '最大病床数', field: 'dcf_max_bed_facility' },
      { label: '最小病床数', field: 'dcf_min_bed_facility' },
      { label: '最終ログイン日時', field: 'last_login_date' },
    ];
  }

}
