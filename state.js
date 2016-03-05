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
      "targetId": "s0002",
      "targetEndpointId": "input-0"
    },
    {
      "sourceId": "s0002",
      "sourceEndpointId": "output-0",
      "targetId": "s0003",
      "targetEndpointId": "input-2"
    },
    {
      "sourceId": "s0006",
      "sourceEndpointId": "output-0",
      "targetId": "s0003",
      "targetEndpointId": "input-0"
    },
    {
      "sourceId": "s0003",
      "sourceEndpointId": "output-0",
      "targetId": "s0009",
      "targetEndpointId": "input-0"
    },
    {
      "sourceId": "s0009",
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
          "field": "users:age",
          "type": ">",
          "value": "35"
        },
        {
          "field": "users:employee_number",
          "type": ">",
          "value": "100"
        }
      ]
    },
    {
      "id": "s0000",
      "x": 10,
      "y": 105,
      "type": "TableInputComponent",
      "value": {}
    },
    {
      "id": "s0002",
      "x": 425,
      "y": 440,
      "type": "GeneralFilterComponent",
      "value": [
        {
          "field": "users:last_login",
          "type": ">",
          "value": "2016-01-01"
        }
      ]
    },
    {
      "id": "s0003",
      "x": 1066,
      "y": 306,
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
          "c"
        ],
        "header": [
          "on"
        ],
        "outputFields": [
          "users:id",
          "s0009:tbmc200001",
          "s0009:tbmc200002",
          "s0009:tbmc200003"
        ]
      }
    },
    {
      "id": "s0009",
      "x": 970,
      "y": 513,
      "type": "TransactionByMonthComponent",
      "value": {}
    }
  ]
}
