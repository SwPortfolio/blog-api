import { Global, Module } from '@nestjs/common';
import { ResponseUtil } from './response.util';
import { PasswordUtil } from './password.util';

@Global()
@Module({
  providers: [ResponseUtil, PasswordUtil],
  exports: [ResponseUtil, PasswordUtil],
})
export class UtilModule {}
