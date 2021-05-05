import { DtoPipe } from '@core/pipe';
import { Module } from '@nestjs/common';
import { BookModule } from '@modules/book';
import { RedisModule } from '@library/redis';
import { LoggerModule } from '@library/logger';
import { HealthModule } from '@modules/health';
import { ConfigModule, ConfigProvider } from '@library/configs';
import { ExceptionCatchFilter } from '@core/filter';
// import { MysqlModule } from '@library/mysql';
import { LogInterceptor, FormatInterceptor } from '@core/interceptor';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    /**
     * The common modules
     */
    ConfigModule,
    LoggerModule,
    RedisModule,
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configs: ConfigProvider) => (configs.info.database),
      inject: [ConfigProvider],
    }),
    /**
     * The server logic modules
     */
    BookModule,
    HealthModule,
  ],
  exports: [
    /**
     * export provider
     */
    DtoPipe,
    LogInterceptor,
    FormatInterceptor,
    ExceptionCatchFilter,
  ],
  providers: [
    /**
     * context provider
     */
    DtoPipe,
    LogInterceptor,
    FormatInterceptor,
    ExceptionCatchFilter,
  ],
})

export class CoreModule {}
