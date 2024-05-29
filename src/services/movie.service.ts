import Director from "../entities/Director.entity";
import Movie from "../entities/Movie.entity";
import AppError from "../errors/App.error";
import {
  TUpdateMovieRequest,
  TcreateMovieRequest,
  TcreateMovieResponse,
} from "../interfaces/movie.interface";
import { directorRepo, genreRepo, movieRepo } from "../repositories";

export const createMovieService = async (
  bodyRequest: TcreateMovieRequest
): Promise<TcreateMovieResponse> => {
  const genre = await genreRepo.findOneBy({ id: bodyRequest.genreId });

  if (!genre) throw new AppError("Genre not found", 404);

  const director: Director = await directorRepo.save(bodyRequest.director);

  const newMovie: TcreateMovieResponse = await movieRepo.save({
    ...bodyRequest,
    genre,
    director,
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

export const readMovieService = async (movieId: string): Promise<Movie> => {
  const movie = await movieRepo.findOne({
    where: { id: movieId },
    relations: {
      director: true,
    },
  });

  if (!movie) {
    throw new AppError("Movie not found", 404);
  }

  return movie;
};

export const updateMovieService = async (
  movieId: string,
  bodyRequest: TUpdateMovieRequest
): Promise<TcreateMovieResponse> => {
  const movie = await movieRepo.findOne({ where: { id: movieId } });

  if (!movie) {
    throw new AppError("Movie not found", 404);
  }

  movie.title = bodyRequest.title?.trim() || movie.title;
  movie.description = bodyRequest.description?.trim() || movie.description;
  movie.year = bodyRequest.year || movie.year;

  if (bodyRequest.genreId) {
    const genre = await genreRepo.findOne({
      where: { id: bodyRequest.genreId },
    });
    if (!genre) {
      throw new AppError("Genre not found", 404);
    }
    movie.genre = genre;
  }

  if (bodyRequest.director) {
    const director = await directorRepo.save(bodyRequest.director);
    movie.director = director;
  }

  await movieRepo.save(movie);

  const updatedMovie: TcreateMovieResponse = {
    id: movie.id,
    title: movie.title,
    description: movie.description,
    year: movie.year,
    createdAt: movie.createdAt,
    updatedAt: movie.updatedAt,
    director: movie.director,
    genreId: movie.genre?.id,
  };

  return updatedMovie;
};

export const deleteMovieService = async (movieId: string): Promise<void> => {
  const movie = await movieRepo.findOneBy({ id: movieId });

  if (!movie) {
    throw new AppError("Movie not found", 404);
  }

  await movieRepo.remove(movie);
};
