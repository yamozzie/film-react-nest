import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';

import { configProvider } from './app.config.provider';
import { FilmsController } from './films/controller/films.controller';
import { FilmsService } from './films/service/films.service';
import { filmsRepository } from './repository/films.repository';
import { OrderController } from './order/controller/order.controller';
import { OrderService } from './order/service/order.service';
import { AppRepositoryModule } from './app.repository.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [
    ScheduleModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    AppRepositoryModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'public', 'content'),
      serveRoot: '/content/',
    }),
  ],
  controllers: [FilmsController, OrderController],
  providers: [configProvider, FilmsService, filmsRepository, OrderService],
})
export class AppModule {}
