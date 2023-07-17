import { Injectable } from '@nestjs/common';
import { ContentRegisterDto } from '../dtos/blog.contents.dto';
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
  ) {
    this.dataService = dataService;
    this.blogContentModel = blogContentModel;
    this.randomCodeUtil = randomCodeUtil;
  }

  async registerContent(contentsDto: ContentRegisterDto) {
    try {
      this.connection = await this.dataService.getDbConnection();
      this.connection.beginTransaction();
      // 게시물 코드 생성 (년/월/일/밀리세컨드/랜덤수3자리)
      const today = new Date();
      const ccode =
        today.getFullYear().toString() +
        (today.getMonth() + 1).toString() +
        today.getDate().toString() +
        today.getHours().toString() +
        today.getMinutes().toString() +
        today.getMilliseconds().toString() +
        this.randomCodeUtil.generator(3);
      await this.blogContentModel.registerBlogContents(
        this.connection,
        contentsDto,
        ccode,
      );
      this.connection.commit();
    } catch (err) {
      if (err.name === 'DBError') {
        this.connection.rollback();
      }
      throw err;
    } finally {
      this.connection.release();
    }
    return true;
  }

  async getBlogContents(ccode: string): Promise<{ blogContents: object }> {
    try {
      this.connection = await this.dataService.getDbConnection();
      const getBlogContents = await this.blogContentModel.getBlogContents(
        this.connection,
        ccode,
      );
      const blogContents =
        getBlogContents.length === 0 ? null : getBlogContents[0];
      return { blogContents: blogContents };
    } catch (err) {
      throw err;
    } finally {
      this.connection.release();
    }
  }
}
