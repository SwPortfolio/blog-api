import { Controller, Get } from '@nestjs/common';
import { MemberService } from './member.service';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  async getMember(): Promise<string> {
    try {
      const memberSet = await this.memberService.getMember(5);
      return memberSet;
    } catch (err) {
      return err;
    }
  }
}
