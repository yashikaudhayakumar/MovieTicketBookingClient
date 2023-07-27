import { Movie } from "./movie";
import { Theatre } from "./theatre";
import { User } from "./user";

export interface Ticket {
    ticketId: string;
    totalCount: number;
    theatreId: string;
    theatre: Theatre;
    movieId: string;
    movie: Movie;
    userId: string;
    user: User;
}