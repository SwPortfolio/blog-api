import { Injectable } from '@nestjs/common';

/**
 * 랜덤 수 생성 class
 */
@Injectable()
export class RandomCodeUtil {
  private code: string;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  /**
   *
   * @param length : number 랜덤 자리수
   */
  generator(length: number) {
    this.code = '';
    for (let i = 0; i < length; i++) {
      const random = Math.floor(Math.random() * 10).toString();
      this.code += random;
    }

    return this.code;
  }
}
