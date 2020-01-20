### CSMF Portal合入社区需要做的修改

* 创建服务的时候需要和EXT-API进行通信，因此需要调整传递给后端的数据结构

```
与SO通信的数据结构：

Request:
{
    "service":{
        "name":"CSMFService",
        "description":"CSMFService",
        "serviceInvariantUuid":"57c8a933-1364-4f85-b7a9-666d80ecc5b6",
        "serviceUuid":"0734e398-a427-49f2-9abe-de8eb02542ad",
        "globalSubscriberId":"5GCustomer",
        "serviceType":"5G",
        "parameters":{
            "requestInputs":{
                "expDataRateDL":10,
                "expDataRateUL":30,
                "latency":100,
                "maxNumberofUEs":100,
                "uEMobilityLevel":"stationary",
                "resourceSharingLevel":"shared/non-shared",
                "coverageAreaList":"area1|area2",
                "useInterval":"3"
            }
        }
    }
}
 
 
Response:
{
    "service":{
        "serviceId":"e151059a-d924-4629-845f-264db19e50b4",
        "operationId":"e151059a-d924-4629-845f-264db19e50b3"
    }
}

与EXT-API通信的数据结构：
Request:
{
    "externalId": "CSMF_Portal_TrackindId1",        //Optional, the external system can use its own generated tracking id for Orders , you can leave it out of the POSY if you don’t need it

    "category": "Communication Service",  // Can hard code this to whatever you want, e.g.  Communication Service

    "description": "CSMFService",

    "priority": "1",  // can be hardcoded to “1”, it just means start now.
    "relatedParty": [
        {

            "id": "5GCustomer",        // is the “global-customer-id” in AAI “customer”
            "role": "ONAPcustomer",    // can be hardcoded, always the same
            "name": "5GCustomer",      // is the “subscriber-name” in the AAI “customer”  - usually left the same as “global-customer-id”
            "@referredType": "Consumer"  // can be hardcoded
        }
    ],
    "orderItem": [
        {

            "id": "1",      // only relevant if you are going to send multiple create Service requests from the UUI together, then first will be id 1, second orderItem id 2 etc etc. but for your use case, can be hardcoded as 1 if you are creating one service at a time.

            "action": "add",    // can be add, delete or modify, but seeing as you are only doing create flow, can be hardcoded as 1

            "service": {                  
                "name": "CSMFService",
                "serviceType" : "5G",
                "serviceSpecification": {
                    "id": "0734e398-a427-49f2-9abe-de8eb02542ad"    // this is the uuid of the CST template in SDC
                },

                "serviceCharacteristic": [       
                    {  
                        "name": "expDataRateDL",
                        "value": {
                            "serviceCharacteristicValue": "10"
                        }
                    },  

                    {  
                        "name": "expDataRateUL",
                        "value": {
                            "serviceCharacteristicValue": "30"
                        }
                    },

                   {  
                       "name": "latency",
                       "value": {
                            "serviceCharacteristicValue": "100"
                        }
                   },  

                   {
                       "name": "maxNumberofUEs",
                       "value": {
                           "serviceCharacteristicValue": "100"
                        }
                   },

                   {  
                       "name": "uEMobilityLevel",
                       "value": {
                            "serviceCharacteristicValue": "stationary"
                        }
                   },  

                   {
                       "name": "resourceSharingLevel",
                       "value": {
                           "serviceCharacteristicValue": "shared/non-shared"
                        }
                   },

                   {  
                       "name": "coverageAreaList",
                       "value": {
                            "serviceCharacteristicValue": "area1|area2"
                        }
                   },  

                   {
                       "name": "useInterval",
                       "value": {
                           "serviceCharacteristicValue": "3"
                        }
                   }                           
                ]   
            }
        }
    ]
}
```
