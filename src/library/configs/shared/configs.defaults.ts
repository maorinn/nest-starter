import { Configs } from './config.interface';

export const defaults: Configs = {
  redis: {
    host: '117.18.13.111',
    port: 6379,
    expiredTime: 1500,
  },
  database: {
    username: 'root',
    password: '92645865664Wang',
    database: 'test_db',
    host: 'rm-uf6287i9nk8lsp540ro.mysql.rds.aliyuncs.com',
    port: 3306,
    logging: false,
    dialect: 'mysql',
    pool: { max: 5 },
    autoLoadModels: true,
    synchronize: true,
  },
};
