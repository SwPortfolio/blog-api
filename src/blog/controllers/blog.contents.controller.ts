import { Controller, Post, Res, UseGuards, Body } from '@nestjs/common';
import { ResponseUtil } from '../../util/response.util';
import { AuthGuard } from '../../auth/auth.guard';
import { ContentRegister } from '../dtos/blog.contents.dto';
import { BlogContentsService } from '../services/blog.contents.service';

@Controller('blog/contents')
export class BlogContentsController {
  constructor(
    private readonly responseUtil: ResponseUtil,
    private blogContentsService: BlogContentsService,
  ) {}

  /**
   * 블로그 게시물 작성
   * @param res
   * @param contentsDto
   */
  @UseGuards(AuthGuard)
  @Post('/register')
  async contentsRegister(@Res() res, @Body() contentsDto: ContentRegister) {
    try {
      console.log('contentDto : ', contentsDto);
      await this.blogContentsService.registerContent(contentsDto);
      return this.responseUtil.response(res, 200, '0000', '', {});
    } catch (err) {
      return this.responseUtil.response(res, 500, '9999', err.message, err);
    }
  }
}
