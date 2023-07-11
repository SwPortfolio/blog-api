import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { MemberModel } from '../member.model';
import { SignUpMemberDto } from '../member.dto';
import { PasswordUtil } from '../../util/password.util';

@Injectable()
export class MemberService {
  private connection;
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly memberModel: MemberModel,
    private readonly passwordUtil: PasswordUtil,
  ) {}

  /**
   * 로그인) 이메일로 회원 조회
   * @param memberemail
   */
  async getMember(memberemail: string) {
    try {
      this.connection = await this.databaseService.getDbConnection();
      const memberSet = await this.memberModel.getMember(
        this.connection,
        memberemail,
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

  /**
   * 회원가입) 회원저장
   * @param signUpDto
   */
  async signUpMember(signUpDto: SignUpMemberDto) {
    try {
      this.connection = await this.databaseService.getDbConnection();
      this.connection.beginTransaction();
      // 비밀번호 암호화
      signUpDto.memberpwd = await this.passwordUtil.createHashedPassword(
        signUpDto.memberpwd,
      );

      await this.memberModel.signUp(this.connection, signUpDto);

      this.connection.commit();
      return true;
    } catch (err) {
      if (err.name === 'DBError') {
        this.connection.rollback();
      }
      throw err;
    } finally {
      this.connection.release();
    }
  }
}
