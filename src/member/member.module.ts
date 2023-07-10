import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberModel } from './member.model';
import { MemberService } from './member.service';

@Module({
  // imports: [DatabaseModule],
  controllers: [MemberController],
  providers: [MemberService, MemberModel],
  exports: [MemberService],
})
export class MemberModule {}
