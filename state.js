export default {
  "connections": [
    {
      "sourceId": "s0000",
      "sourceEndpointId": "output-0",
      "targetId": "s0006",
      "targetEndpointId": "input-0"
    },
    {
      "sourceId": "s0000",
      "sourceEndpointId": "output-0",
      "targetId": "s0001",
      "targetEndpointId": "input-0"
    },
    {
      "sourceId": "s0000",
      "sourceEndpointId": "output-0",
      "targetId": "s0002",
      "targetEndpointId": "input-0"
    },
    {
      "sourceId": "s0006",
      "sourceEndpointId": "output-0",
      "targetId": "s0007",
      "targetEndpointId": "input-0"
    },
    {
      "sourceId": "s0001",
      "sourceEndpointId": "output-0",
      "targetId": "s0007",
      "targetEndpointId": "input-1"
    },
    {
      "sourceId": "s0007",
      "sourceEndpointId": "output-0",
      "targetId": "s0003",
      "targetEndpointId": "input-0"
    },
    {
      "sourceId": "s0002",
      "sourceEndpointId": "output-0",
      "targetId": "s0003",
      "targetEndpointId": "input-2"
    },
    {
      "sourceId": "s0003",
      "sourceEndpointId": "output-0",
      "targetId": "s0004",
      "targetEndpointId": "input-0"
    }
  ],
  "data": [
    {
      "id": "s0006",
      "x": 430,
      "y": 95,
      "type": "DcfFilterComponent",
      "value": [
        {
          "field": "s0000:sei",
          "type": "!=",
          "value": "abc"
        }
      ]
    },
    {
      "id": "s0007",
      "x": 1027,
      "y": 231,
      "type": "AndComponent",
      "value": {}
    },
    {
      "id": "s0000",
      "x": 10,
      "y": 106,
      "type": "ListInputComponent",
      "value": {
        "targetMr": [
          "abc"
        ],
        "listId": [
          "LBC_1123287_DCF_20123"
        ],
        "listType": [
          "dcf"
        ]
      }
    },
    {
      "id": "s0001",
      "x": 428,
      "y": 268,
      "type": "DcfFilterComponent",
      "value": [
        {
          "field": "s0000:dcf_specialty1",
          "type": "=",
          "value": "岩本"
        }
      ]
    },
    {
      "id": "s0002",
      "x": 427,
      "y": 443,
      "type": "DcfFilterComponent",
      "value": [
        {
          "field": "s0000:age",
          "type": ">",
          "value": "40"
        }
      ]
    },
    {
      "id": "s0003",
      "x": 1183,
      "y": 435,
      "type": "OrComponent",
      "value": {}
    },
    {
      "id": "s0004",
      "x": 1340,
      "y": 195,
      "type": "OutputCsvComponent",
      "value": {
        "outputFile": [
          "aaabbbb"
        ],
        "header": [
          "on"
        ],
        "outputFields": [
          "s0000:dcf_dr_cd",
          "s0000:sei",
          "s0000:mei"
        ]
      }
    }
  ]
}
