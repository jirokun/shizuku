export default {
  "connections": [
    {
      "sourceId": "szk_a5d72210ddef11e591064735c6952994",
      "sourceEndpointId": "output-0",
      "targetId": "szk_data2",
      "targetEndpointId": "input-0"
    },
    {
      "sourceId": "szk_a5d72210ddef11e591064735c6952994",
      "sourceEndpointId": "output-0",
      "targetId": "szk_c8ca6de0ddef11e591064735c6952994",
      "targetEndpointId": "input-0"
    },
    {
      "sourceId": "szk_a5d72210ddef11e591064735c6952994",
      "sourceEndpointId": "output-0",
      "targetId": "szk_0b80ad20ddf011e591064735c6952994",
      "targetEndpointId": "input-0"
    },
    {
      "sourceId": "szk_data2",
      "sourceEndpointId": "output-0",
      "targetId": "szk_data31",
      "targetEndpointId": "input-0"
    },
    {
      "sourceId": "szk_c8ca6de0ddef11e591064735c6952994",
      "sourceEndpointId": "output-0",
      "targetId": "szk_data31",
      "targetEndpointId": "input-1"
    },
    {
      "sourceId": "szk_data31",
      "sourceEndpointId": "output-0",
      "targetId": "szk_15731020ddf011e591064735c6952994",
      "targetEndpointId": "input-0"
    },
    {
      "sourceId": "szk_0b80ad20ddf011e591064735c6952994",
      "sourceEndpointId": "output-0",
      "targetId": "szk_15731020ddf011e591064735c6952994",
      "targetEndpointId": "input-2"
    },
    {
      "sourceId": "szk_15731020ddf011e591064735c6952994",
      "sourceEndpointId": "output-0",
      "targetId": "szke5cf06f0dee711e581f0f323b16a9174",
      "targetEndpointId": "input-0"
    },
    {
      "sourceId": "szkefeb0a90dfae11e59ddb3755cc079993",
      "sourceEndpointId": "output-0",
      "targetId": "szk_data31",
      "targetEndpointId": "input-3"
    }
  ],
  "data": [
    {
      "id": "szk_data2",
      "x": 465,
      "y": 65,
      "type": "DcfFilterComponent",
      "value": [
        {
          "field": "sei",
          "type": "!=",
          "value": "abc"
        }
      ]
    },
    {
      "id": "szk_data31",
      "x": 926,
      "y": 325,
      "type": "OrComponent",
      "value": {}
    },
    {
      "id": "szk_a5d72210ddef11e591064735c6952994",
      "x": 5,
      "y": 60,
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
      "id": "szk_c8ca6de0ddef11e591064735c6952994",
      "x": 110,
      "y": 465,
      "type": "DcfFilterComponent",
      "value": [
        {
          "field": "sei",
          "type": "=",
          "value": "岩本"
        }
      ]
    },
    {
      "id": "szk_0b80ad20ddf011e591064735c6952994",
      "x": 705,
      "y": 485,
      "type": "DcfFilterComponent",
      "value": [
        {
          "field": "age",
          "type": ">",
          "value": "40"
        }
      ]
    },
    {
      "id": "szk_15731020ddf011e591064735c6952994",
      "x": 1170,
      "y": 222,
      "type": "OrComponent",
      "value": {}
    },
    {
      "id": "szke5cf06f0dee711e581f0f323b16a9174",
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
          "dcf_specialty2",
          "dcf_specialty4",
          "dcf_specialty5"
        ]
      }
    },
    {
      "id": "szkefeb0a90dfae11e59ddb3755cc079993",
      "x": 42,
      "y": 301,
      "type": "ListInputComponent",
      "value": {
        "targetMr": [
          "def"
        ],
        "listId": [
          "LBC_1123287_DCF_20123"
        ],
        "listType": [
          "dcf"
        ]
      }
    }
  ]
};
