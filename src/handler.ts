import { Handler, APIGatewayProxyEvent } from 'aws-lambda';
import BookController from './controllers/BookController';
const bookController = new BookController();

export const create: Handler = (event: APIGatewayProxyEvent) =>
  bookController.create(event);

export const update: Handler = (event: APIGatewayProxyEvent) =>
  bookController.update(event);

export const find: Handler = (event: APIGatewayProxyEvent) =>
  bookController.find(event);

export const findOne: Handler = (event: APIGatewayProxyEvent) =>
  bookController.findOne(event);

export const deleteOne: Handler = (event: APIGatewayProxyEvent) =>
  bookController.deleteOne(event);
