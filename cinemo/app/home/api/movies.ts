import { Movie } from '@/types/movie'

// TODO: Movie type aligns with the TMDB API response
export async function fetchDefaultRecommendations(): Promise<Movie[]> {
	const res = await fetch('https://api.themoviedb.org/3/trending/movie/week', {
		headers: {
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
		},
	})

	const data = await res.json()

	return data.results
}

// TODO: Fetch personalized recommendations by user id
export async function fetchPersonalizedRecommendations(
	userId: string
): Promise<Movie[]> {
	console.log(userId)
	const movies = await fetchDefaultRecommendations()

	return movies
}
