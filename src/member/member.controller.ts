import {
  Controller,
  Get,
  Res,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MemberService } from './services/member.service';
import { response } from '../utils/response';
import { SignUpMemberDto } from './member.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ResponseService } from '../util/response.service';

@Controller('member')
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    private readonly responseService: ResponseService,
  ) {}

  /**
   * 회원 상세조회
   * token 검증
   * @param req
   * @param res
   */
  @Get()
  @UseGuards(AuthGuard) // 배열로 사용할 수 있다.
  async getMember(@Request() req, @Res() res): Promise<string> {
    try {
      const member = await this.memberService.getMember(req.memberpkey);
      let resCode: string;
      if (member !== null) {
        resCode = '0000';
      } else {
        resCode = '0001';
      }
      return response(res, 200, resCode, '', {
        member: member,
      });
    } catch (err) {
      return response(res, 500, '9999', err.message, {});
    }
  }

  /**
   * 회원가입
   * @param res
   * @param signUpDto
   */
  @Post('/sign-up')
  async signUpMember(@Res() res, @Body() signUpDto: SignUpMemberDto) {
    try {
      await this.memberService.signUpMember(signUpDto);
      return this.responseService.response(res, 200, '0000', '', {});
    } catch (err) {
      return this.responseService.response(res, 500, '9999', err.message, err);
    }
  }
}
