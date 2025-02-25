// Dynamic Route:
// TODO get movie details by movieId from TMDB API in server component
export default async function MovieDetails({
	params,
}: {
	params: { id: string }
}) {
	console.log(params)
	return (
		<div>
			<h1>Movie: Interstellar</h1>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
			</p>
		</div>
	)
}
