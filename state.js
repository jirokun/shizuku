export default {
  "data": [
    {
      "id": "data1",
      "x": 0,
      "y": 100,
      "type": "CsvInputComponent"
    },
    {
      "id": "data2",
      "x": 60,
      "y": 385,
      "type": "DcfFilterComponent"
    },
    {
      "id": "data3-1",
      "x": 652,
      "y": 570,
      "type": "MergeComponent"
    },
    {
      "id": "data3-2",
      "x": 525,
      "y": 315,
      "type": "TranslateDcfSyscdComponent"
    }
  ],
  "connections": [
    {
      "sourceId": "data1",
      "sourceEndpointId": "output-0",
      "targetId": "data3-2",
      "targetEndpointId": "input-0"
    },
    {
      "sourceId": "data2",
      "sourceEndpointId": "output-0",
      "targetId": "data3-1",
      "targetEndpointId": "input-0"
    }
  ]
}
