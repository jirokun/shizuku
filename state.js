export default {
  defs: {
    itemDefs: [
      { id: 'InputListFileItem', title: 'リストファイル入力' },
      { id: 'TranslateDcfSyscd', title: 'DCFからSYS_CDに変換' },
    ]
  },
  data: [
    { id: 'input1', x: 0, y: 0, width: 500, height: 200, itemId: 'InputListFileItem' },
    { id: 'input2', x: 0, y: 100, width: 300, height: 50, itemId: 'TranslateDcfSyscd' },
  ],
  connections: [
    { id: 'con1', sourceId: 'input1', destinationId: 'input2' }
  ]

}
