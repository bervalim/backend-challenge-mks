import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Movie from "./Movie.entity";

@Entity({ name: "directors" })
export default class Director {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "name", length: 255, nullable: true })
  name: string;

  @Column({ name: "biograpy", type: "text", nullable: false })
  biograpy: string;

  @Column({ name: "nationality", length: 50, nullable: false })
  nationality: string;

  @OneToOne(() => Movie, (movie) => movie.director)
  movie: Movie;
}
