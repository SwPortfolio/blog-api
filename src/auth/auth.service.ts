import { Injectable } from '@nestjs/common';
import { MemberService } from '../member/member.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private memberService: MemberService,
    private jwtService: JwtService,
  ) {}

  async signIn(membmerpkey: number) {
    const member = await this.memberService.getMember(membmerpkey);
    const { memberpwd, ...result } = member;
    // Generate a JWT and return it here
    const payload = { sub: member.memberpkey, nickname: member.nickname };
    const token = await this.jwtService.signAsync(payload);
    // instead of the user object
    return { token: token, member: result };
  }
}
