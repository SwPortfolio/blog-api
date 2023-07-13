import { Injectable } from '@nestjs/common';

@Injectable()
export class RandomCodeUtil {
  private code: string;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  generator(length) {
    this.code = '';
    for (let i = 0; i < length; i++) {
      const random = Math.floor(Math.random() * 10).toString();
      this.code += random;
    }

    return this.code;
  }
}
