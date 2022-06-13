import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { IBookQuery, ICreateBookInput, IUpdateBookInput } from '../interfaces/IBook';
import BookService from '../services/BookService';
import BookValidator from '../validators/BookValidator';

import BaseController from './BaseController';

export default class BookController extends BaseController {
  bookValidator: BookValidator;
  bookService: BookService;
  constructor() {
    super();
    this.bookValidator = new BookValidator();
    this.bookService = new BookService();
  }

  /**
   * create new book
   */
  public async create(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      const body = JSON.parse(event.body);
      const createInput = await this.bookValidator.vCreate(body) as ICreateBookInput;
      const result = await this.bookService.create(createInput);
      return this.responseSuccess(result, 'Create new book successfully');
    } catch (error) {
      return this.responseError(error.message);
    }
  }

  /**
   * update a book by id
   */
  public async update(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      const { id } = event.pathParameters;
      const body = JSON.parse(event.body);
      const updateInput = await this.bookValidator.vUpdate(body) as IUpdateBookInput;
      const result = await this.bookService.update(id, updateInput);
      return this.responseSuccess(result, 'Update a book successfully');
    } catch (error) {
      return this.responseError(error.message);
    }
  }

  /**
   * Find list book
   */
  public async find(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      const query = event.queryStringParameters || undefined;
      console.log('query', query);
      const conditions = await this.bookValidator.vQuery(query) as IBookQuery;
      const result = await this.bookService.findAll(conditions);
      return this.responseSuccess(result);
    } catch (error) {
      return this.responseError(error.message);
    }
  }

  /**
   * Get a book by id
   */
  public async findOne(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      const { id } = event.pathParameters;
      const result = await this.bookService.findOne(id);
      return this.responseSuccess(result);
    } catch (error) {
      return this.responseError(error.message);
    }
  }

  /**
   * Delete a book by id
   */
  public async deleteOne(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      const { id } = event.pathParameters;
      const result = await this.bookService.delete(id);
      return this.responseSuccess(result, 'Delete a book successfully');
    } catch (error) {
      return this.responseError(error.message);
    }
  }

}
