import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../../database/database.service";

@Injectable()
export class CategoryModel {
  private sql: string;
  private params: any[];
  constructor(private databaseService: DatabaseService) {}

  /**
   * 블로그 카테고리 저장
   * @param connection
   * @param blogpkey
   * @param categoryname
   */
  async registerCategory(
    connection: any,
    blogpkey: number,
    categoryname: string,
  ) {
    try {
      this.sql = `insert into blogcategory (blogpkey, categoryname, regdate) values (?, ?, now())`;
      this.params = [[blogpkey, categoryname]];
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
