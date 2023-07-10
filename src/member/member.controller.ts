import {
  Controller,
  Get,
  Res,
  Query,
  Param,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { response } from '../utils/response';
import { GetMemberDto, SignUpMemberDto } from './member.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getMember(
    @Res() res,
    @Query() getMemberDto: GetMemberDto,
  ): Promise<string> {
    try {
      const { memberpkey } = getMemberDto;
      const member = await this.memberService.getMember(memberpkey);
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
