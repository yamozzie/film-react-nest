import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';

import { configProvider } from './app.config.provider';
import { Film, FilmSchema } from './films/schemas/film.schema';
import { FilmsController } from './films/controller/films.controller';
import { FilmsService } from './films/service/films.service';
import { FilmRepository } from './repository/films.repository';
import { OrderController } from './order/controller/order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderService } from './order/service/order.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'public', 'content'),
      serveRoot: '/content/',
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  ],
  controllers: [FilmsController, OrderController],
  providers: [configProvider, FilmsService, FilmRepository, OrderService],
})
export class AppModule {}
