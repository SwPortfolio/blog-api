import { DatabaseService } from '../database/database.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MemberModel {
  private connection;
  private sql: string;
  private params: any[];

  constructor(private readonly databaseService: DatabaseService) {}

  async getMember(memberpkey) {
    try {
      this.connection = await this.databaseService.getConnection();
      this.sql = `select * from member where memberpkey=?;`;
      this.params = [memberpkey];
      return await this.databaseService.dbQuery(
        this.connection,
        this.sql,
        this.params,
      );
    } catch (err) {
      throw err;
    } finally {
      this.connection.release();
    }
  }
}
