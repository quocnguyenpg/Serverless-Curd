# Serverless Nodejs Rest API with TypeScript And DynamoDb

This is simple REST API example for AWS Lambda By Serverless framwork with TypeScript and DynamoDb.

## Use Cases

* Serverless Framework - Lamda

* CRUD

* Store data in DynamoDB

* CI/CD and support multi-stage deployments

## Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

```
src/
┣ controllers/
┃ ┗ BaseController.ts                           # Base controller
┃ ┗ BookController.ts                           # Books lambda controller
┣ interfaces/
┃ ┗ IBook.ts                                    # Declare book type and some related query and input
┃ ┗ IResponse.ts                                # Declare response type
┣ services/
┃ ┗ BookService.ts                              # Initial book model and define book lambda services
┣ validators/
┃ ┗ BookValidator.ts                            # Validate query, create and update input
┣ config.ts
┣ constants.ts
┣ handler.ts
```
## Deploy

* Run ```npm install``` to install all the necessary dependencies.
* Run ```npm run local``` use serverless offline to test locally. 
* Run ```npm run deploy-dev```  Deploy on AWS to dev stage. 
* Run ```npm run deploy-prod``` Deploy on AWS to prod stage.

## List enpoint

```
  POST - https://y3j7993xxa.execute-api.us-east-1.amazonaws.com/dev/books
  PUT - https://y3j7993xxa.execute-api.us-east-1.amazonaws.com/dev/books/{id}
  GET - https://y3j7993xxa.execute-api.us-east-1.amazonaws.com/dev/books
  GET - https://y3j7993xxa.execute-api.us-east-1.amazonaws.com/dev/books/{id}
  DELETE - https://y3j7993xxa.execute-api.us-east-1.amazonaws.com/dev/books/{id}
```

## CI/CD & multi-stage deployments

* Created 2 environments: `dev` and `prod`
![alt text](https://github.com/quocnguyenpg/Serverless-Curd/blob/dev/image/stages.jpg)

* Auto deploy When push to `dev` or `prod` branch:
![alt text](https://github.com/quocnguyenpg/Serverless-Curd/blob/dev/image/deploy_log.jpg)

* Preview `prod` branch from pull requests
![alt text](https://github.com/quocnguyenpg/Serverless-Curd/blob/dev/image/pull-request.jpg)