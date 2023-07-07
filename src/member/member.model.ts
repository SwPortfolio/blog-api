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
   * @param memberpkey
   */
  async getMember(connection: any, memberpkey: number) {
    try {
      this.sql = `select * from member where memberpkey=?;`;
      this.params = [memberpkey];
      return await this.databaseService.dbQuery(
        connection,
        this.sql,
        this.params,
      );
    } catch (err) {
      throw err;
    }
  }

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
}
