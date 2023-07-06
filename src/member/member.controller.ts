import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConnectionService } from '../database/connection.service';

@Controller('member')
export class MemberController {
  constructor(private readonly Connection: ConnectionService) {}

  @Get()
  async getHello(): Promise<string> {
    const test = await this.Connection.CP.query('select * from member', []);
    console.log('test : ', test[0]);
    return test;
  }
}
