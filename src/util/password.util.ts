import { Injectable } from '@nestjs/common';
// import util from 'util';
// import crypto from 'crypto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const util = require('util');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const crypto = require('crypto');

@Injectable()
export class PasswordUtil {
  private readonly randomBytesPromise: any;
  private readonly pbkdf2Promise: any;

  constructor() {
    this.pbkdf2Promise = util.promisify(crypto.pbkdf2);
    this.randomBytesPromise = util.promisify(crypto.randomBytes);
  }

  async createSalt() {
    const buf = await this.randomBytesPromise(64);
    return buf.toString('base64');
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
   * @param password
   * @param userSalt
   * @param userPassword
   */
  async verifyPassword(
    password: string,
    userSalt: string,
    userPassword: string,
  ) {
    const key = await this.pbkdf2Promise(
      password,
      userSalt,
      104906,
      64,
      'sha512',
    );
    const hashedPassword = key.toString('base64');

    return hashedPassword === userPassword;
  }
}
