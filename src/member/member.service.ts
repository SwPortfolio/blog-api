import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { MemberModel } from './member.model';

@Injectable()
export class MemberService {
  private connection;
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly memberModel: MemberModel,
  ) {}

  async getMember(memberpkey: number) {
    try {
      this.connection = await this.databaseService.getConnection();
      const memberSet = await this.memberModel.getMember(
        this.connection,
        memberpkey,
      );
      return memberSet[0];
    } catch (err) {
      throw err;
    } finally {
      this.connection.release();
    }
  }
}
