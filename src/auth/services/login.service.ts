import { Injectable } from '@nestjs/common';
import { MemberService } from '../../member/services/member.service';
import { JwtService } from '@nestjs/jwt';
import { MemberTokenService } from '../../member/services/memberToken.service';
import { LoginInMemberDto } from '../../member/member.dto';
import { PasswordUtil } from "../../util/password.util";

@Injectable()
export class LoginService {
  private token = '';
  private member: any = null;
  private passValid = true;

  constructor(
    private memberService: MemberService,
    private jwtService: JwtService,
    private memberTokenService: MemberTokenService,
    private passwordUtil: PasswordUtil,
  ) {}

  async loginIn(loginInDto: LoginInMemberDto) {
    // 이메일로 회원 조회
    this.member = await this.memberService.getMember(loginInDto.memberemail);

    if (this.member !== null) {
      // 이메일로 회원 조회 성공
      // TODO: 비밀번호 검증
      this.passValid = await this.passwordUtil.verifyPassword(
        loginInDto.memberpwd,
        this.member.memberpwd.split('.')[1],
        this.member.memberpwd.split('.')[0],
      );

      if (this.passValid) {
        // 비밀번호 일치
        delete this.member.memberpwd;
        // Generate a JWT and return it here
        const payload = {
          sub: this.member.memberpkey,
          nickname: this.member.nickname,
        };
        // jwt 토큰 발급
        this.token = await this.jwtService.signAsync(payload);
        // 토큰 저장
        await this.memberTokenService.processMemToken(
          this.member.memberpkey,
          this.token,
        );
      } else {
        // 비밀번호 일치하지 않음
      }
    }
    return {
      token: this.token,
      member: this.member,
      passValid: this.passValid,
    };
  }
}
