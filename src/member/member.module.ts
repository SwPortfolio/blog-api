import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { DatabaseModule } from '../database/database.module';
import { MemberModel } from './member.model';

@Module({
  imports: [DatabaseModule],
  controllers: [MemberController],
  providers: [MemberModel],
})
export class MemberModule {}
