import Genre from "../entities/Genre.entity";
import AppError from "../errors/App.error";
import { TGenreResponse, TreadAllGenres } from "../interfaces/genre.interface";
import { genreRepo } from "../repositories";

export const createGenreService = async (
  requestBody: any
): Promise<TGenreResponse> => {
  const newGenre = await genreRepo.save(requestBody);
  return newGenre;
};

export const readAllGenresService = async (): Promise<TreadAllGenres> => {
  const genres: TreadAllGenres = await genreRepo.find();
  return genres;
};

export const readAllMoviesByGenreService = async (
  id: string
): Promise<Genre> => {
  const genre: Genre | null = await genreRepo.findOne({
    where: { id: id },
    relations: { movies: true },
  });

  if (!genre) throw new AppError("Genre not found!", 404);

  return genre;
};
