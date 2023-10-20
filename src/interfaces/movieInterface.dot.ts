
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