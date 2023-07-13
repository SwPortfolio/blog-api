import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { BlogModel } from '../models/blog.model';
import { GetBlogDto, RegisterBlogDto } from '../blog.dto';
import { CategoryModel } from '../models/category.model';

@Injectable()
export class BlogService {
  private connection: any;
  constructor(
    private databaseService: DatabaseService,
    private blogModel: BlogModel,
    private categoryModel: CategoryModel,
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
      const blog = await this.blogModel.registerBlog(
        this.connection,
        memberpkey,
        registerBlogDto,
      );
      const blogpkey = blog.insertId;

      for (const categoryname of registerBlogDto.categoryList) {
        await this.categoryModel.registerCategory(
          this.connection,
          blogpkey,
          categoryname,
        );
      }

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
      const blogSet = await this.blogModel.getBlog(
        this.connection,
        memberpkey,
        getBlogDto,
      );
      if (blogSet.length === 0) return { blog: null, categoryList: [] };

      const blog = {
        blogpkey: blogSet[0].blogpkey,
        blogname: blogSet[0].blogname,
        regdate: blogSet[0].regdate,
      };

      const categoryList = blogSet.map((blog) => {
        return {
          categoryname: blog.categoryname,
        };
      });

      return { blog: blog, categoryList: categoryList };
    } catch (err) {
      if (err.name === 'DBError') this.connection.rollback();
      throw err;
    } finally {
      this.connection.release();
    }
  }
}
