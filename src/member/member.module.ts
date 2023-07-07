import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { DatabaseModule } from '../database/database.module';
import { MemberModel } from './member.model';
import { MemberService } from './member.service';

@Module({
  imports: [DatabaseModule],
  controllers: [MemberController],
  providers: [MemberService, MemberModel],
})
export class MemberModule {}
