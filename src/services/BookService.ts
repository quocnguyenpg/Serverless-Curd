import dynamoose from 'dynamoose';
import { AnyDocument } from 'dynamoose/dist/Document';
import { ScanResponse } from 'dynamoose/dist/DocumentRetriever';
import { Model } from 'dynamoose/dist/Model';
import { Schema } from 'dynamoose/dist/Schema';
import { v4 as uuid } from 'uuid';
import { IBookQuery, ICreateBookInput, IUpdateBookInput } from '../interfaces/IBook';

export default class BookService {
  bookModel: Model;

  constructor() {
    this.bookModel = this.generateBookModel();
  }

  private generateBookModel = (): Model => {
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

  public create = async (input: ICreateBookInput): Promise<AnyDocument> => {
    return this.bookModel.create(input);
  }

  public update = async (id: string, input: IUpdateBookInput): Promise<AnyDocument> => {
    const book = await this.findOne(id);
    if (!book) throw new Error('This book does not exist');
    return this.bookModel.update({"id": id}, input, {"returnValues": "ALL_NEW"});
  }

  public findOne = async (id: string): Promise<AnyDocument> => {
    return this.bookModel.get(id);
  }

  public findAll = async (query: IBookQuery): Promise<ScanResponse<AnyDocument>> => {
    let condition = new dynamoose.Condition();
    if(query) {
      for (const [key, value] of Object.entries(query)) {
        condition = condition.where(key).contains(value);
      }
    }
    return this.bookModel.scan(condition).exec();
  }

  public delete = async (id: string): Promise<void> => {
    return this.bookModel.delete(id);
  }
}
