import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Res,
  Body,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { AuthGuard } from './auth.guard';
import { response } from '../utils/response';
import { LoginInMemberDto } from '../member/member.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: LoginService) {}

  @Post('/login')
  async signIn(@Res() res, @Body() loginInDto: LoginInMemberDto) {
    // Generate a JWT and return it here
    // instead of the user object
    const loginResult = await this.authService.loginIn(loginInDto);
    if (loginResult.member === null) {
      return response(res, 200, '0001', '', {});
    } else if (loginResult.passValid === false) {
      return response(res, 200, '0004', '', {});
    } else {
      return response(res, 200, '0000', '', loginResult);
    }
  }

  @UseGuards(AuthGuard)
  @Get('/jwt/verify')
  getProfile(@Request() req, @Res() res) {
    return response(res, 200, '0000', '', { memberpkey: req.memberpkey });
  }
}
