import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IsNumber, IsString } from "class-validator";

import { FilmEntity } from "./film.entity";

@Entity('schedules')
export class ScheduleEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    @IsString()
    daytime: string

    @Column()
    @IsNumber()
    hall: number

    @Column()
    @IsNumber()
    rows: number

    @Column()
    @IsNumber()
    seats: number

    @Column()
    @IsNumber()
    price: number

    @Column("text", { array: true, default: () => "ARRAY[]::text[]" })
    taken: string[];

    @ManyToOne(() => FilmEntity, (film) => film.schedule)
    film: FilmEntity
}