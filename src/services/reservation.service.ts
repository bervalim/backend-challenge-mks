import Movie from "../entities/Movie.entity";
import User from "../entities/User.entity";
import AppError from "../errors/App.error";
import { TCreateReservationRequest } from "../interfaces/reservation.interface";
import { movieRepo, reservationRepo, userRepo } from "../repositories";

export const createReservationService = async (
  bodyRequest: TCreateReservationRequest,
  userId: string
): Promise<void> => {
  const newDate = new Date(bodyRequest.date).getDay();
  if (newDate === 1)
    throw new AppError(
      "Invalid date, It is only possible to create reservations from Tuesday to Sunday",
      400
    );

  const time = Number(bodyRequest.hour.split(":")[0]);

  if (time < 8 || time > 23)
    throw new AppError(
      "Invalid hour, available times to create reservations are 8AM to 23PM",
      400
    );

  console.log("Finding movie with ID:", bodyRequest.movieId);
  const movie: Movie | null = await movieRepo.findOneBy({
    id: bodyRequest.movieId,
  });

  const user: User | null = await userRepo.findOneBy({
    id: userId,
  });
  console.log("Finding user with ID:", userId);

  await reservationRepo.save({
    ...bodyRequest,
    movie: movie!,
    user: user!,
  });
};

export const readAllReservationsByMovieService = async (
  id: string
): Promise<Movie> => {
  const movie: Movie | null = await movieRepo.findOne({
    where: {
      id: id,
    },
    relations: {
      reservations: {
        user: true,
      },
      director: true,
      genre: true,
    },
  });

  if (!movie) throw new AppError("Movie not found", 404);

  return movie;
};
