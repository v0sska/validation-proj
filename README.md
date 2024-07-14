This app is writing on nestjs with TypeScript.

App uses a postgresql database for store data.

## Run app

$ npm run docker

$ npm run start:dev

    or

$ npm run start


## Examples 

Data for labels:

Input:

        {
          "name": "Sony Records",
          "founded": 1982
        }

Output: 

        {
          "data": {
            "labels": {
              "id" : "1",
              "name" : "Sony Records",
              "founded" : 1982
            }
          }
        }

Data for groups:

Input: 

        {
          "name": "AC/DC",
          "genre": "Rock",
          "label": "1"
        }

Output: 

        {
          "data": {
            "groups": {
              "id" : "1",
              "name" : "AC/DC",
              "genre": "Rock",
              "label": {
                "name": "Sony Records",
                "founded": 1982
              }
            }
          }
        }


You can fill data using Json files like multipart files.