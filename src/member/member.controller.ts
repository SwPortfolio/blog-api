import { Controller, Get } from '@nestjs/common';
import { MemberModel } from './member.model';

@Controller('member')
export class MemberController {
  constructor(private readonly memberModel: MemberModel) {}

  @Get()
  async getMember(): Promise<string> {
    try {
      const memberSet = await this.memberModel.getMember(5);
      console.log(memberSet);
      return memberSet;
    } catch (err) {
      return err;
    }
  }
}
