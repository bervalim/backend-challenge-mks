import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import Reservation from "./Reservation.entity";
import Genre from "./Genre.entity";
import Director from "./Director.entity";

@Entity({ name: "movies" })
export default class Movie {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "title", length: 255, nullable: false, unique: true })
  title: string;

  @Column({ name: "description", type: "text", nullable: true })
  description: string;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @OneToMany(() => Reservation, (reservations) => reservations.movie)
  reservations: Reservation[];

  @OneToOne(() => Director, (director) => director.movie)
  @JoinColumn()
  director: Director;

  @ManyToOne(() => Genre, (genre) => genre.movies)
  genre: Genre;
}
