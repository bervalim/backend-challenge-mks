import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Movie from "./Movie.entity";

enum GenreType {
  COMEDY = "comedy",
  DRAMA = "drama",
  ACTION = "action",
  HORROR = "horror",
  SCIENCE_FICTION = "science_fiction",
}

@Entity({ name: "genres" })
export default class Genre {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 255, enum: GenreType, default: GenreType.COMEDY })
  name: string;

  @OneToMany(() => Movie, (movie) => movie.genre)
  movies: Movie[];
}
