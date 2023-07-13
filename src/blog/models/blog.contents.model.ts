import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { ContentRegister } from '../dtos/blog.contents.dto';

@Injectable()
export class BlogContentsModel {
  private sql: string;
  private params: any[];
  constructor(private readonly dataService: DatabaseService) {}

  async registerBlogContents(
    connection,
    contentsDto: ContentRegister,
    ccode: string,
  ) {
    try {
      this.sql = `insert into blogcontents (blogcategorypkey, ccode, title, content, showyn, hits, regdate, modifydate) values (?, ?, ?, ?, 'Y', 0, now(), now())`;
      this.params = [
        contentsDto.blogcategorypkey,
        ccode,
        contentsDto.title,
        contentsDto.content,
      ];
      return await this.dataService.dbQuery(connection, this.sql, this.params);
    } catch (err) {
      throw err;
    }
  }
}
