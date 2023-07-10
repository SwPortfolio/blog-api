import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { MemberModel } from '../member.model';

@Injectable()
export class MemberTokenService {
  private connection: any;
  constructor(
    private databaseService: DatabaseService,
    private memberModel: MemberModel,
  ) {}

  /**
   * 회원 토큰 검증을 위한 토큰 조회
   * @param token
   * @param memberpkey
   */
  async tokenValidator(token: string, memberpkey: number) {
    try {
      this.connection = await this.databaseService.getDbConnection();
      const memtoken = await this.memberModel.getMemToken(
        this.connection,
        token,
        memberpkey,
      );
      return memtoken.length === 1;
    } catch (err) {
      throw err;
    } finally {
      this.connection.release();
    }
  }

  /**
   * 로그인 토큰 발급 시 토큰 저장
   * @param memberpkey
   * @param token
   */
  async processMemToken(memberpkey: number, token: string) {
    try {
      this.connection = await this.databaseService.getDbConnection();
      await this.memberModel.memberTokenSave(
        this.connection,
        memberpkey,
        token,
      );
      return true;
    } catch (err) {
      throw err;
    } finally {
      this.connection.release();
    }
  }
}
