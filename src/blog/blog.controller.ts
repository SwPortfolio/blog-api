import {
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  Body,
  Get,
  Query,
} from '@nestjs/common';
import { ResponseUtil } from '../util/response.util';
import { AuthGuard } from '../auth/auth.guard';
import { GetBlogDto, RegisterBlogDto } from './blog.dto';
import { BlogService } from './services/blog.service';

@Controller('blog')
export class BlogController {
  constructor(
    private responseUtil: ResponseUtil,
    private blogService: BlogService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('/register')
  async registerBlog(
    @Req() req,
    @Res() res,
    @Body() registerBlogDto: RegisterBlogDto,
  ) {
    try {
      console.log(registerBlogDto);
      await this.blogService.register(req.memberpkey, registerBlogDto);
      return this.responseUtil.response(res, 200, '0000', '', {});
    } catch (err) {
      return this.responseUtil.response(res, 500, '9999', err.message, err);
    }
  }

  @UseGuards(AuthGuard)
  @Get('')
  async getBlog(@Req() req, @Res() res, @Query() getBlogDto: GetBlogDto) {
    try {
      const blog = await this.blogService.getBlog(req.memberpkey, getBlogDto);
      return this.responseUtil.response(res, 200, '0000', '', { blog: blog });
    } catch (err) {
      return this.responseUtil.response(res, 500, '9999', err.message, err);
    }
  }
}
