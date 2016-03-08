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
      "x": 343,
      "y": 71,
      "type": "GeneralFilterComponent",
      "value": [
        {
          "field": "users:age",
          "type": ">",
          "value": "65"
        },
        {
          "field": "users:employee_number",
          "type": ">",
          "value": "1000"
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
      "x": 195,
      "y": 321,
      "type": "GeneralFilterComponent",
      "value": [
        {
          "field": "users:last_login",
          "type": ">",
          "value": "2016-03-01"
        }
      ]
    },
    {
      "id": "s0003",
      "x": 736,
      "y": 381,
      "type": "OrComponent",
      "value": {}
    },
    {
      "id": "s0004",
      "x": 946,
      "y": 211,
      "type": "OutputCsvComponent",
      "value": {
        "outputFile": [
          "output"
        ],
        "header": [
          "off"
        ],
        "useFields": [
          "users:id",
          "users:sei",
          "users:mei",
          "users:age",
          "users:employment",
          "users:employee_number",
          "users:specialty",
          "users:last_login",
          "s0009:tbmc200001"
        ]
      }
    },
    {
      "id": "s0009",
      "x": 916,
      "y": 90,
      "type": "TransactionByMonthComponent",
      "value": {}
    }
  ]
}
