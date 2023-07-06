import { ConfigFactory } from '@nestjs/config/dist/interfaces';
import { config } from 'dotenv';
import { Configuration } from './configuration.interface';
config({ path: `.env` });
config({ path: `./envs/.${process.env.NODE_ENV}.env` });

const configuration: Configuration = {
  node_env: process.env.NODE_ENV || 'local',

  port: parseInt(process.env.PORT) || 3000,

  database: {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USERNAME || 'user',
    password: process.env.DB_PASSWORD || 'password',
    port: parseInt(process.env.DB_PORT) || 3306,
    database: process.env.DB_DATABASE || 'database name',
    connection_limit: parseInt(process.env.DB_CONNECTIONLIMIT) || 10,
  },
};

const configFunction: ConfigFactory<Configuration> = () => configuration;
export default configFunction;
