import Director from "../entities/Director.entity";
import Movie from "../entities/Movie.entity";
import AppError from "../errors/App.error";
import {
  TcreateMovieRequest,
  TcreateMovieResponse,
} from "../interfaces/movie.interface";
import { directorRepo, genreRepo, movieRepo } from "../repositories";

export const createMovieService = async (
  bodyRequest: TcreateMovieRequest
): Promise<TcreateMovieResponse> => {
  const findGenre = await genreRepo.findOneBy({ id: bodyRequest.genreId });

  if (!findGenre) throw new AppError("Genre not found", 404);

  const saveDirectorOnDatabase: Director = await directorRepo.save(
    bodyRequest.director
  );

  const newMovie: TcreateMovieResponse = await movieRepo.save({
    ...bodyRequest,
    findGenre,
    saveDirectorOnDatabase,
  });

  return newMovie;
};

export const readMoviesService = async (): Promise<Movie[]> => {
  const movies: Movie[] = await movieRepo.find({
    relations: {
      director: true,
    },
  });

  return movies;
};
