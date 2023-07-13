import { Global, Module } from '@nestjs/common';
import { ResponseUtil } from './response.util';
import { PasswordUtil } from './password.util';
import { RandomCodeUtil } from './random.code.util';

@Global()
@Module({
  providers: [ResponseUtil, PasswordUtil, RandomCodeUtil],
  exports: [ResponseUtil, PasswordUtil, RandomCodeUtil],
})
export class UtilModule {}
