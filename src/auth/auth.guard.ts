import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { MemberTokenService } from '../member/memberToken.service';

/**
 * 이 함수는 현재의 request가 실행될 수 있는지 없는지를 나타내는 boolean을 리턴해야 한다. true라면 해당 request는 실행될 것이고, false라면 거절 할 것이다.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private memberTokenService: MemberTokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      // token 검증
      const tokenValid = await this.memberTokenService.tokenValidator(
        token,
        payload.sub,
      );
      if (tokenValid === false) {
        // 유효하지 않음
        return false;
      }
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['memberpkey'] = payload.sub;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
