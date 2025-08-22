import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Film } from '../../films/entities/film.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  daytime: string;

  @Column()
  hall: string;

  @Column('int')
  rows: number;

  @Column('int')
  seats: number;

  @Column()
  price: number;

  @Column('text', { array: true })
  taken: string[];

  @ManyToOne(() => Film, (film) => film.schedule)
  film: Film;
}
