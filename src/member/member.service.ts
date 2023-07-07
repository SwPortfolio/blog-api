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

  async getMember(memberpkey) {
    try {
      this.connection = await this.databaseService.getConnection();
      return await this.memberModel.getMember(this.connection, memberpkey);
    } catch (err) {
      throw err;
    } finally {
      this.connection.release();
    }
  }
}
