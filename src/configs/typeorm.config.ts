import { TypeOrmModuleOptions } from "@nestjs/typeorm";

// config/default.yml 파일을 사용하여 환경변수로 설정값을 관리
import config from 'config';

const dbConfig = config.get('db');

export const typeOrmConfig : TypeOrmModuleOptions= {
    type: dbConfig.type,
    host: process.env.DB_HOST || dbConfig.host,
    port: process.env.DB_PORT || dbConfig.port,
    username: process.env.DB_USERNAME || dbConfig.username,
    password: process.env.DB_PASSWORD || dbConfig.password,
    database: process.env.DB_DATABASE || dbConfig.database,
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    synchronize: dbConfig.synchronize,
};
