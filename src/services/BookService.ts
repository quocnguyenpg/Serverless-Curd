import dynamoose from 'dynamoose';
import { Model } from 'dynamoose/dist/Model';
import { Schema } from 'dynamoose/dist/Schema';
import { v4 as uuid } from 'uuid';
import { ICreateBookInput, IUpdateBookInput } from '../interfaces/IBook';

export default class BookService {
  bookModel: Model;

  constructor() {
    this.bookModel = this.generateBookModel();
  }

  private generateBookModel() {
    const book = new Schema(
      {
        id: { type: String, hashKey: true, default: uuid() },
        name: { type: String },
        description: { type: String },
        author: { type: String },
        origin: { type: String },
      },
      {
        timestamps: true,
      },
    );

    return dynamoose.model('books', book, {
      create: true,
    });
  }

  public create = async (input: ICreateBookInput): Promise<any> => {
    return this.bookModel.create(input);
  }

  public update = async (id: string, input: IUpdateBookInput): Promise<any> => {
    const book = await this.findOne(id);
    if (!book) throw new Error('This book does not exist');
    const newInput = {
      id,
      ...input,
    };
    return this.bookModel.update(newInput);
  }

  public findOne = async (id: string): Promise<any> => {
    return this.bookModel.get(id);
  }

  public findAll = async (): Promise<any> => {
    return this.bookModel.scan().exec();
  }

  public delete = async (id: string): Promise<any> => {
    return this.bookModel.delete(id);
  }
}
