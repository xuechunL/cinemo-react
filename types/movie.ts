export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  runtime: number
  genres: Genre[]
  original_language: string
  popularity: number
  vote_count: number
}

export interface Genre {
  id: number
  name: string
}
