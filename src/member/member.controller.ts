import { Controller, Get, Res } from '@nestjs/common';
import { MemberService } from './member.service';
import { response } from '../utils/response';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  async getMember(@Res() res): Promise<string> {
    try {
      const member = await this.memberService.getMember(5);
      return response(res, 200, '0000', '', { member: member });
    } catch (err) {
      return err;
    }
  }
}
