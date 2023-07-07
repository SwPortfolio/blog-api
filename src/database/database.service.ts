// database.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require('mysql2/promise');
import { ConfigService } from '@nestjs/config';
import { Configuration } from '../config/configuration.interface';

@Injectable()
export class DatabaseService implements OnModuleInit {
  public CP;
  public connection;
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

  /**
   * connection 가져오기
   */
  async getDbConnection() {
    return await this.CP.getConnection();
  }

  /**
   * 쿼리 보내기
   * @param connection
   * @param sql
   * @param params
   */
  async dbQuery(connection: any, sql: string, params: any[]) {
    try {
      const querySet = await connection.query(sql, params);

      return querySet[0];
    } catch (err) {
      err.name = 'DBError';
      throw err;
    }
  }
}
