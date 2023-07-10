import { DatabaseService } from '../database/database.service';
import { Injectable } from '@nestjs/common';
import { SignUpMemberDto } from './member.dto';

@Injectable()
export class MemberModel {
  private sql: string;
  private params: any[];

  // 생성자
  constructor(private readonly databaseService: DatabaseService) {}

  /**
   * 회원 조회
   * @param connection
   * @param memberemail
   */
  async getMember(connection: any, memberemail: string) {
    try {
      this.sql = `select * from member where memberemail=?;`;
      this.params = [memberemail];
      return await this.databaseService.dbQuery(
        connection,
        this.sql,
        this.params,
      );
    } catch (err) {
      throw err;
    }
  }

  /**
   * 회원 토큰 저장
   */
  async memberTokenSave(connection: any, memberpkey: number, token: string) {
    try {
      this.sql = `insert into membertoken (memberpkey, token, expireddate, regdate) values (?, ?, date_add(now(), interval 90 day), now())`;
      this.params = [memberpkey, token];
      return await this.databaseService.dbQuery(
        connection,
        this.sql,
        this.params,
      );
    } catch (err) {
      throw err;
    }
  }

  /**
   * 회원저장
   * @param connection
   * @param signUpDto
   */
  async signUp(connection: any, signUpDto: SignUpMemberDto) {
    try {
      this.sql = `insert into member (memberemail, memberpwd, nickname, activeyn, deleteyn, regdate, deletedate) values (?, ?, ?, 'N', 'N', now(), null)`;
      this.params = [
        signUpDto.memberemail,
        signUpDto.memberpwd,
        signUpDto.nickname,
      ];
      return await this.databaseService.dbQuery(
        connection,
        this.sql,
        this.params,
      );
    } catch (err) {
      throw err;
    }
  }

  /**
   * 회원 token 검증용 조회
   */
  async getMemToken(connection: any, token: string, memberpkey: number) {
    try {
      this.sql = `select * from membertoken where memberpkey=? and token=? and now() < expireddate`;
      this.params = [memberpkey, token];
      return await this.databaseService.dbQuery(
        connection,
        this.sql,
        this.params,
      );
    } catch (err) {
      throw err;
    }
  }
}
