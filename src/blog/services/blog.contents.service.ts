import { Injectable } from '@nestjs/common';
import { ContentRegister } from '../dtos/blog.contents.dto';
import { DatabaseService } from '../../database/database.service';
import { BlogContentsModel } from "../models/blog.contents.model";

@Injectable()
export class BlogContentsService {
  private connection: any;
  constructor(
    private readonly dataService: DatabaseService,
    private readonly blogContentModel: BlogContentsModel,
  ) {}

  async registerContent(contentsDto: ContentRegister) {
    try {
      this.connection = await this.dataService.getDbConnection();
      await this.blogContentModel.registerBlogContents(
        this.connection,
        contentsDto,
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
