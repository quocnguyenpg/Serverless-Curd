import joi from 'joi';
import { ICreateBookInput, IUpdateBookInput } from '../interfaces/IBook';
export default class BookValidator {
  public vCreate = async (input: ICreateBookInput): Promise<ICreateBookInput> => {
    const schema = joi.object({
      name: joi.string().required(),
      description: joi.string().required(),
      author: joi.string().required(),
      origin: joi.string().required(),
    });
    return schema.validateAsync(input);
  }

  public vUpdate = async (input: IUpdateBookInput): Promise<IUpdateBookInput> => {
    const schema = joi.object().keys({
      name: joi.string(),
      description: joi.string(),
      author: joi.string(),
      origin: joi.string(),
    });
    return schema.validateAsync(input);
  }

}
