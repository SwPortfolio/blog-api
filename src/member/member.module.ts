import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberModel } from './member.model';
import { MemberService } from './member.service';
import { MemberTokenService } from './memberToken.service';

@Module({
  controllers: [MemberController],
  providers: [MemberService, MemberModel, MemberTokenService],
  exports: [MemberService, MemberTokenService],
})
export class MemberModule {}
