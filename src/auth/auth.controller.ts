import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Res,
  Body,
} from '@nestjs/common';
import { LoginService } from './services/login.service';
import { AuthGuard } from './auth.guard';
import { LoginInMemberDto } from '../member/member.dto';
import { ResponseUtil } from '../util/response.util';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: LoginService,
    private readonly responseUtil: ResponseUtil,
  ) {}

  @Post('/login')
  async loginIn(@Res() res, @Body() loginInDto: LoginInMemberDto) {
    // Generate a JWT and return it here
    // instead of the user object
    const loginResult = await this.authService.loginIn(loginInDto);
    if (loginResult.member === null) {
      return this.responseUtil.response(res, 200, '0001', '', {});
    } else if (loginResult.passValid === false) {
      return this.responseUtil.response(res, 200, '0004', '', {});
    } else {
      return this.responseUtil.response(res, 200, '0000', '', loginResult);
    }
  }

  @UseGuards(AuthGuard)
  @Get('/jwt/verify')
  getProfile(@Request() req, @Res() res) {
    return this.responseUtil.response(res, 200, '0000', '', {
      memberpkey: req.memberpkey,
    });
  }
}
