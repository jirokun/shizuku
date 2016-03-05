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
      "type": "GeneralFilterComponent",
      "value": [
        {
          "field": "s0000:age",
          "type": ">",
          "value": "35"
        }
      ]
    },
    {
      "id": "s0007",
      "x": 1026,
      "y": 230,
      "type": "AndComponent",
      "value": {}
    },
    {
      "id": "s0000",
      "x": 10,
      "y": 105,
      "type": "TableInputComponent",
      "value": {
        "targetMr": [
          "abc"
        ],
        "listId": [
          "LBC_1123287_DCF_20123"
        ],
        "listType": [
          "id"
        ]
      }
    },
    {
      "id": "s0001",
      "x": 427,
      "y": 267,
      "type": "GeneralFilterComponent",
      "value": [
        {
          "field": "s0000:employee_number",
          "type": ">",
          "value": "100"
        }
      ]
    },
    {
      "id": "s0002",
      "x": 426,
      "y": 442,
      "type": "GeneralFilterComponent",
      "value": [
        {
          "field": "s0000:last_login",
          "type": ">",
          "value": "2016-01-01"
        }
      ]
    },
    {
      "id": "s0003",
      "x": 1182,
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
          "s0000:id",
          "s0000:sei",
          "s0000:mei",
          "s0000:age",
          "s0000:employment",
          "s0000:employee_number",
          "s0000:specialty",
          "s0000:last_login"
        ]
      }
    }
  ]
};
