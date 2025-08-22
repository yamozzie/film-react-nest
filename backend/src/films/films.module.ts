import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { FilmsService } from './service/films.service';
import { FilmsController } from './controller/films.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Film])],
  providers: [FilmsService],
  controllers: [FilmsController],
  exports: [FilmsService],
})
export class FilmsModule {}
