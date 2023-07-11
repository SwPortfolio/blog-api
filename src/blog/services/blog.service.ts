import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { BlogModel } from '../blog.model';
import { GetBlogDto, RegisterBlogDto } from "../blog.dto";

@Injectable()
export class BlogService {
  private connection: any;
  constructor(
    private databaseService: DatabaseService,
    private blogModel: BlogModel,
  ) {}

  /**
   * blog 채널 등록
   * @param memberpkey
   * @param registerBlogDto
   */
  async register(memberpkey: number, registerBlogDto: RegisterBlogDto) {
    try {
      this.connection = await this.databaseService.getDbConnection();
      this.connection.beginTransaction();
      await this.blogModel.registerBlog(
        this.connection,
        memberpkey,
        registerBlogDto,
      );
      this.connection.commit();
      return true;
    } catch (err) {
      if (err.name === 'DBError') this.connection.rollback();
      throw err;
    } finally {
      this.connection.release();
    }
  }

  /**
   * blog 상세조회
   * @param memberpkey
   * @param getBlogDto
   */
  async getBlog(memberpkey: number, getBlogDto: GetBlogDto) {
    try {
      this.connection = await this.databaseService.getDbConnection();
      return await this.blogModel.getBlog(
        this.connection,
        memberpkey,
        getBlogDto,
      );
    } catch (err) {
      if (err.name === 'DBError') this.connection.rollback();
      throw err;
    } finally {
      this.connection.release();
    }
  }
}
