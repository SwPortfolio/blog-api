import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseUtil {
  private res: any;
  private statusCode: number;
  private resCode: string;
  private message: string;
  private body: any;

  response(
    res: any,
    statusCode: number,
    resCode: string,
    message: string,
    body: any,
  ) {
    this.res = res;
    this.statusCode = statusCode;
    this.resCode = resCode;
    this.message = message;
    this.body = body;
    return this.res
      .status(this.statusCode)
      .json({ resCode: this.resCode, message: this.message, body: this.body });
  }
}
