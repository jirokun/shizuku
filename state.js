export default {
  data: [
    { id: 'data1', x: 0, y: 0, width: 500, height: 200, itemId: 'InputListFileItem' },
    { id: 'data2', x: 0, y: 250, width: 300, height: 50, itemId: 'TranslateDcfSyscd' },
    { id: 'data3-1', x: 0, y: 350, width: 350, height: 250, itemId: 'FilterDcfItem' },
    { id: 'data3-2', x: 400, y: 350, width: 350, height: 250, itemId: 'FilterDcfItem' },
    { id: 'data3-3', x: 800, y: 350, width: 350, height: 250, itemId: 'FilterDcfItem' },
    { id: 'data3-4', x: 1200, y: 350, width: 350, height: 250, itemId: 'FilterDcfItem' },
    { id: 'data3-merge', x: 0, y: 650, width: 500, height: 100, itemId: 'MergeItem' },
  ],
  connections: [
    { id: 'con1', sourceId: 'data1', destinationId: 'data2' },
    { id: 'con2', sourceId: 'data2', destinationId: 'data3-1' },
    { id: 'con3', sourceId: 'data2', destinationId: 'data3-2' },
    { id: 'con4', sourceId: 'data2', destinationId: 'data3-3' },
    { id: 'con5', sourceId: 'data2', destinationId: 'data3-4' },
    { id: 'con6', sourceId: 'data3-1', destinationId: 'data3-merge' },
    { id: 'con7', sourceId: 'data3-2', destinationId: 'data3-merge' },
  ]

}
