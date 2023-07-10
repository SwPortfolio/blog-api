import { Injectable } from '@nestjs/common';
import { MemberService } from '../member/member.service';
import { JwtService } from '@nestjs/jwt';
import { MemberTokenService } from '../member/memberToken.service';
import { LoginInMemberDto } from '../member/member.dto';

@Injectable()
export class LoginService {
  private token = '';
  private member: any = null;
  private passValid = true;

  constructor(
    private memberService: MemberService,
    private jwtService: JwtService,
    private memberTokenService: MemberTokenService,
  ) {}

  async loginIn(loginInDto: LoginInMemberDto) {
    const { memberemail, memberpwd } = loginInDto;
    // 이메일로 회원 조회
    this.member = await this.memberService.getMember(memberemail);

    if (this.member !== null) {
      // 이메일로 회원 조회 성공
      // TODO: 비밀번호 검증
      if (memberpwd !== this.member.memberpwd) {
        // 비밀번호가 일치하지 않음
        this.passValid = false;
      } else {
        // 비밀번호 일치
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
        // instead of the user object
      }
    }
    return {
      token: this.token,
      member: this.member,
      passValid: this.passValid,
    };
  }
}
