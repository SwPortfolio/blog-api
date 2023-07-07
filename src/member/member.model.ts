import { DatabaseService } from '../database/database.service';
import { Injectable } from '@nestjs/common';

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
  async getMember(connection, memberpkey) {
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
}
