import ShizukuComponent from './ShizukuComponent'

export default class TranslateDcfSyscdComponent extends ShizukuComponent {
  constructor(el) {
    super(el);
  }
  buildTitle() {
    return "DCFコードをシステムコードに変換";
  }
}
