import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { MemberModule } from '../member/member.module';
import { BlogService } from './services/blog.service';
import { BlogModel } from './models/blog.model';
import { CategoryModel } from './models/category.model';

@Module({
  imports: [MemberModule],
  controllers: [BlogController],
  providers: [BlogService, BlogModel, CategoryModel],
})
export class BlogModule {}
