import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Controller('member')
export class MemberController {
  public connection;
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  async getHello(): Promise<string> {
    let connection;
    try {
      connection = await this.databaseService.getConnection();
      connection.beginTransaction();

      // `select * from signupauthcode where signupauthcodepkey=?`;
      // [1];
      // `insert into signupauthcode (phone, code) values (?, ?)`;
      // ['01066868286', '1234567'];
      const sql = `select * from signupauthcode where signupauthcodepkey=?`;
      const params = [5];
      const queryset = await this.databaseService.dbQuery(
        connection,
        sql,
        params,
      );
      /**
       * queryset: []
       * 결과
       * - index === 0 : query 결과
       * - index === 1 : field 정보
       */
      connection.rollback();
      // connection.commit();
      connection.release();
      console.log(queryset);
      return queryset;
    } catch (err) {
      console.log(err);
      console.log(err.sqlMessage);
      return err;
    } finally {
      connection.release();
    }
  }
}
