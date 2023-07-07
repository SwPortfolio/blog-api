import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { MemberModel } from './member.model';

@Controller('member')
export class MemberController {
  public connection;
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly memberModel: MemberModel,
  ) {}

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
