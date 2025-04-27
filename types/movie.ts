// TMDB Movie
export type Movie = {
  id: number
  adult: boolean
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  original_language: string
  popularity: number
  video: boolean
}

// TMDB Genre
export type Genre = {
  id: number
  name: string
}

// TMDB Movies API Response
export type TMDBMoviesResponse = {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

// TMDB Movie Details API Response
export type TMDBMovieDetailsResponse = Movie & {
  belongs_to_collection: {
    id: number
    name: string
    poster_path: string | null
    backdrop_path: string | null
  } | null
  budget: number
  genres: Genre[]
  homepage: string | null
  imdb_id: string | null
  revenue: number
  runtime: number
  spoken_languages: {
    iso_639_1: string
    name: string
  }[]
  status: string
  tagline: string | null
  credits: {
    cast: {
      id: number
      name: string
      character: string
    }[]
    crew: {
      id: number
      name: string
      job: string
    }[]
  }
  videos: {
    results: {
      id: string
      key: string
      name: string
      site: string
      size: number
      type: string
    }[]
  }
  similar: {
    page: number
    results: Movie[]
    total_pages: number
    total_results: number
  }
}
