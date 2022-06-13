import config from '../config';
import { STATUS_CODE } from '../constants';
import IResponse from '../interfaces/IResponse';

export default class BaseController {
  public responseSuccess(data: any = null, message: string = ''): IResponse {
    return {
      statusCode: STATUS_CODE.success,
      body: JSON.stringify({
        message,
        data,
        verions: config.VERSIONS,
      }),
    };
  }

  public responseError(message:string, code:number = STATUS_CODE.forbidden): IResponse {
    return {
      statusCode: code,
      body: JSON.stringify({
        message,
        verions: config.VERSIONS,
      }),
    };
  }
}
