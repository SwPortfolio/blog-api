import { Module } from '@nestjs/common';
import { BlogController } from './controllers/blog.controller';
import { MemberModule } from '../member/member.module';
import { BlogService } from './services/blog.service';
import { BlogModel } from './models/blog.model';
import { CategoryModel } from './models/category.model';
import { BlogContentsController } from './controllers/blog.contents.controller';
import { BlogContentsService } from './services/blog.contents.service';
import { BlogContentsModel } from './models/blog.contents.model';

@Module({
  imports: [MemberModule],
  controllers: [BlogController, BlogContentsController],
  providers: [
    BlogService,
    BlogModel,
    CategoryModel,
    BlogContentsService,
    BlogContentsModel,
  ],
})
export class BlogModule {}
