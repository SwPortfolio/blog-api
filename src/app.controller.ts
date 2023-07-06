import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { Configuration } from './config/configuration.interface';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    const port = this.configService.get<number>('port');
    const node_env = this.configService.get<string>('node_env');
    const database =
      this.configService.get<Configuration['database']>('database');
    console.log(node_env);
    console.log(port);
    console.log(database);
    return this.appService.getHello();
  }
}
