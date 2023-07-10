import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Global() // @Global() 데코레이터는 모듈을 전역적으로 사용할 수 있도록 만듭니다. 전역 모듈은 일반적으로 루트 또는 코어 모듈에 의해 단 한 번만 등록되어야 합니다.
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
