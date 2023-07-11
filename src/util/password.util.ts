import { Injectable } from '@nestjs/common';
// import util from 'util';
// import crypto from 'crypto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const util = require('util');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const crypto = require('crypto');

@Injectable()
export class PasswordUtil {
  private readonly pbkdf2Promise: any;

  constructor() {
    this.pbkdf2Promise = util.promisify(crypto.pbkdf2);
  }

  async createSalt() {
    const buf = crypto.randomBytes(6);
    return buf.toString('hex');
  }

  /**
   * 비밀번호 암호화
   * @param password
   */
  async createHashedPassword(password: string) {
    const salt = await this.createSalt();
    const key = await this.pbkdf2Promise(password, salt, 104906, 64, 'sha512');
    const hashedPassword = key.toString('base64');
    return { hashedPassword, salt };
  }

  /**
   * 비밀번호 검증
   * @param password: 검증할 비밀번호
   * @param memberpwd: 저장된 비밀번호
   */
  async verifyPassword(password: string, memberpwd: string) {
    const [salt, userPassword] = memberpwd.split('$');

    const key = await this.pbkdf2Promise(password, salt, 104906, 64, 'sha512');
    const hashedPassword = key.toString('base64');

    return hashedPassword === userPassword;
  }
}
