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

      if (memberSet.length === 0) {
        return null;
      } else {
        return memberSet[0];
      }
    } catch (err) {
      throw err;
    } finally {
      this.connection.release();
    }
  }

  async signUpMember(signUpDto: any) {
    try {
      this.connection = await this.databaseService.getConnection();
      this.connection.beginTransaction();

      const result = await this.memberModel.signUp(this.connection, signUpDto);

      this.connection.commit();
      return true;
    } catch (err) {
      console.log(err);
      if (err.name === 'DBError') {
        this.connection.rollback();
      }
      throw err;
    } finally {
      this.connection.release();
    }
  }
}
