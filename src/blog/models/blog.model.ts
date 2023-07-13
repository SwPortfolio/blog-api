import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { GetBlogDto, RegisterBlogDto } from '../dtos/blog.dto';

@Injectable()
export class BlogModel {
  private sql: string;
  private params: any[];
  constructor(private readonly databaseService: DatabaseService) {}

  /**
   * 블로그 등록
   * @param connection
   * @param memberpkey
   * @param registerBlogDto
   */
  async registerBlog(
    connection,
    memberpkey: number,
    registerBlogDto: RegisterBlogDto,
  ) {
    try {
      this.sql = `insert into blog (memberpkey, blogname, regdate) values (?, ?, now())`;
      this.params = [memberpkey, registerBlogDto.blogname];
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
   * blog 상세 조회
   * @param connection
   * @param memberpkey
   * @param getBlogDto
   */
  async getBlog(connection, memberpkey: number, getBlogDto: GetBlogDto) {
    try {
      this.sql = `
        select blog.blogpkey, blogname, blog.regdate, categoryname
        from blog
        left join blogcategory on blog.blogpkey=blogcategory.blogpkey
        where memberpkey=? and blog.blogpkey=?
      `;
      this.params = [memberpkey, getBlogDto.blogpkey];
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
