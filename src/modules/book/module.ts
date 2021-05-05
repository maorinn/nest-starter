import { Module } from '@nestjs/common';
import { RedisModule } from '@library/redis';
import { ConfigModule } from '@library/configs';
import { BookController } from './controller';
import { BookService } from './service';
import { BookDao } from './dao';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from '@model/book';

@Module({
  imports: [
    RedisModule,
    ConfigModule,
    SequelizeModule.forFeature([Book]),
  ],
  controllers: [
    BookController,
  ],
  providers: [
    BookService,
    BookDao,
  ],
})
export class BookModule {}
