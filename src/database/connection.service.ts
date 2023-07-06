// connection.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require('mysql2/promise');
import { ConfigService } from '@nestjs/config';
import { Configuration } from '../config/configuration.interface';

@Injectable()
export class ConnectionService implements OnModuleInit {
  public CP;
  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const database =
      this.configService.get<Configuration['database']>('database');

    this.CP = mysql.createPool({
      host: database.host,
      user: database.user,
      password: database.password,
      port: database.port,
      database: database.database,
      connectionLimit: database.connection_limit,
    });

    console.log(`✅ START CONNECTION 🚀 `);
  }
}
