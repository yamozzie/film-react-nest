import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Schedule } from 'src/schedule/entities/schedule.entity';

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  rating: number;

  @Column()
  director: string;

  @Column('text', { array: true })
  tags: string[];

  @Column()
  image: string;

  @Column()
  cover: string;

  @Column()
  title: string;

  @Column()
  about: string;

  @Column()
  description: string;

  @OneToMany(() => Schedule, (schedule) => schedule.film, { cascade: true })
  schedule: Schedule[];
}
