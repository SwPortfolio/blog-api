import {
  Controller,
  Get,
  Res,
  Query,
  Param,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { response } from '../utils/response';
import { SignUpMemberDto } from './member.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  /**
   * 회원 상세조회
   * @param req
   * @param res
   */
  @UseGuards(AuthGuard)
  @Get()
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
      return response(res, 200, '0000', '', {});
    } catch (err) {
      return response(res, 500, '9999', err.message, err);
    }
  }
}
