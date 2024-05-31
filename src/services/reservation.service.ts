import Movie from "../entities/Movie.entity";
import User from "../entities/User.entity";
import AppError from "../errors/App.error";
import { TcreateMovieResponse } from "../interfaces/movie.interface";
import {
  TCreateReservationRequest,
  TReadUserByMovieReservation,
  TReservationResponse,
} from "../interfaces/reservation.interface";
import { TcreateUserResponse } from "../interfaces/user.interface";
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

  const movie: Movie | null = await movieRepo.findOneBy({
    id: bodyRequest.movieId,
  });

  const user: User | null = await userRepo.findOneBy({
    id: userId,
  });

  await reservationRepo.save({
    ...bodyRequest,
    movie: movie!,
    user: user!,
  });
};

export const readAllReservationsByMovieService = async (id: string) => {
  const movie: any = await movieRepo.findOne({
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
  console.log(movie);

  if (!movie) throw new AppError("Movie not found", 404);

  movie.reservations = movie.reservations.map(
    (reservation: TReadUserByMovieReservation) => {
      if (reservation.user) {
        const { password, ...userWithoutPassword } = reservation.user;
        return {
          ...reservation,
          user: userWithoutPassword,
        };
      }

      return reservation;
    }
  );

  return movie;
};
