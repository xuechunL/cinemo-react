// TODO: Tmdb API types

export type Genre = {
	id: number
	name: string
}

export type Movie = {
	id: number
	title: string
	poster_path: string
	release_date: string
	overview: string
	genres: Genre[]
}
