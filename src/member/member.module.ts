import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { ConnectionService } from '../database/connection.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [MemberController],
  providers: [],
})
export class MemberModule {}
