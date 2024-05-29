import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import User from "./User.entity";
import Movie from "./Movie.entity";

@Entity({ name: "reservations" })
export default class Reservation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "date", type: "date" })
  date: string;

  @Column({ name: "description", type: "time" })
  hour: string;

  @PrimaryGeneratedColumn("uuid")
  reservationCode: string;

  @ManyToOne(() => User, (users) => users.reservations)
  user: User;

  @ManyToOne(() => Movie, (movies) => movies.reservations)
  movie: Movie;
}
