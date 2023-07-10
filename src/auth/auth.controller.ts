import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { response } from '../utils/response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn() {
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return await this.authService.signIn(1);
  }

  @UseGuards(AuthGuard)
  @Get('jwt/verify')
  getProfile(@Request() req, @Res() res) {
    return response(res, 200, '0000', '', { memberpkey: req.memberpkey });
  }
}
