export default function Page({ params }: { params: { slug: string } }) {
	const movieId = params.slug

	// TODO: Fetch movie details from TMDB API by movieId
	return <h1>Hello, Movie Details of {movieId} Page!</h1>
}
