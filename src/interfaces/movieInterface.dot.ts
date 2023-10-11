// import { MovieService } from '../services/movie.service';
// import { SeasonService } from '../services/season.service';
// import { PersonService } from '../services/person.service';
// import { ReviewService } from '../services/review.service';
// import { KeywordService } from '../services/keyword.service';
// import { StudioService } from '../services/studio.service';
// import { ImageService } from '../services/image.service';
// import { ClientRequest } from '../client-request';

// export interface IKinopoiskDev {
//   movie: MovieService;
//   season: SeasonService;
//   person: PersonService;
//   review: ReviewService;
//   keyword: KeywordService;
//   studio: StudioService;
//   image: ImageService;
//   request: ClientRequest;
// }

interface ObjAfterGenres {
  name: string;
}

export interface Movie {
  alternativeName?: string;
  backdrop?: string;
  countries?: string[];
  description?: string;
  enName?: string;
  genres?: string[] | ObjAfterGenres[];
  id?: number;
  logo?: string;
  movieLength?: number;
  name?: string;
  names?: string[];
  poster?: string;
  rating?: number;
  releaseYears?: number[];
  shortDescription?: string;
  type?: string;
  votes?: number;
  year?: number;
}

export interface MovieArray extends Array<Movie> {};