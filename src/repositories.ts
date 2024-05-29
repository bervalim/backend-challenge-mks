import { AppDataSource } from "./data-source";
import Director from "./entities/Director.entity";
import Genre from "./entities/Genre.entity";
import Movie from "./entities/Movie.entity";
import Reservation from "./entities/Reservation.entity";
import User from "./entities/User.entity";
import { TuserRepo } from "./interfaces/user.interface";

export const userRepo: TuserRepo = AppDataSource.getRepository(User);
export const genreRepo = AppDataSource.getRepository(Genre);
export const directorRepo = AppDataSource.getRepository(Director);
export const movieRepo = AppDataSource.getRepository(Movie);
export const reservationRepo = AppDataSource.getRepository(Reservation);
