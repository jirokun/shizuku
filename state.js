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
    }
  ],
  "data": [
    {
      "id": "szk_data2",
      "x": 466,
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
      "x": 1000,
      "y": 285,
      "type": "MergeComponent",
      "value": []
    },
    {
      "id": "szk_a5d72210ddef11e591064735c6952994",
      "x": 6,
      "y": 60,
      "type": "ListInputComponent",
      "value": [
        {
          "name": "targetMr",
          "value": "asdf"
        },
        {
          "name": "listId",
          "value": "LBC_3213727_DCF_31928"
        },
        {
          "name": "listType",
          "value": "system_cd"
        }
      ]
    },
    {
      "id": "szk_c8ca6de0ddef11e591064735c6952994",
      "x": 55,
      "y": 475,
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
      "y": 486,
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
      "x": 1260,
      "y": 310,
      "type": "MergeComponent",
      "value": []
    },
    {
      "id": "szke5cf06f0dee711e581f0f323b16a9174",
      "x": 1340,
      "y": 195,
      "type": "OutputCsvComponent",
      "value": [
        {
          "name": "outputFile",
          "value": "asfdasdf"
        },
        {
          "name": "header",
          "value": "off"
        }
      ]
    }
  ]
};
