import { config } from 'dotenv';
config({ path: `./envs/.${process.env.NODE_ENV}.env` });

/**
 * console.log
 * node_env ===> local or development 에서만 출력함
 * @param msg
 */
export const consoleLog = (msg: any) => {
  if (
    process.env.NODE_ENV === 'local' ||
    process.env.NODE_ENV === 'development'
  ) {
    console.log(msg);
  }
};
