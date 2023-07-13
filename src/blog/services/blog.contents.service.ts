import { Injectable } from '@nestjs/common';
import { ContentRegister } from '../dtos/blog.contents.dto';
import { DatabaseService } from '../../database/database.service';
import { BlogContentsModel } from '../models/blog.contents.model';
import { RandomCodeUtil } from '../../util/random.code.util';

@Injectable()
export class BlogContentsService {
  private connection: any;
  constructor(
    private readonly dataService: DatabaseService,
    private readonly blogContentModel: BlogContentsModel,
    private readonly randomCodeUtil: RandomCodeUtil,
  ) {}

  async registerContent(contentsDto: ContentRegister) {
    try {
      this.connection = await this.dataService.getDbConnection();
      this.connection.beginTransaction();
      // 게시물 코드 생성 (년/월/일/밀리세컨드/랜덤수3자리)
      const today = new Date();
      const regdate = new Date(today);
      const ccode =
        regdate.getFullYear().toString() +
        (regdate.getMonth() + 1).toString() +
        regdate.getDate().toString() +
        regdate.getHours().toString() +
        regdate.getMinutes().toString() +
        regdate.getMilliseconds().toString() +
        this.randomCodeUtil.generator(3);
      await this.blogContentModel.registerBlogContents(
        this.connection,
        contentsDto,
        ccode,
      );
      this.connection.commit();
    } catch (err) {
      console.log(err);
      if (err.name === 'DBError') {
        this.connection.rollback();
      }
      throw err;
    } finally {
      this.connection.release();
    }
    return true;
  }
}
