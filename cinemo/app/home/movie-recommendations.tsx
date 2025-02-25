'use client'

import { Movie } from '@/types/movie'
import { useEffect, useState } from 'react'
import { fetchPersonalizedRecommendations } from './api/movies'
import { onAuthStateChangedListener } from '@/lib/firebase'
import { useAuthStore } from '@/stores/authStore'

export default function MovieRecommendations({
	initialMovies,
}: {
	initialMovies: Movie[]
}) {
	const [movies, setMovies] = useState(initialMovies)
	const { user, setUser } = useAuthStore()

	// TODO: move this to a custom hook for auth state changes
	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			setUser(user) // updates the user state in the auth store
		})

		return unsubscribe
	}, [setUser])

	// fetch personalized recommendations when the user is authenticated
	useEffect(() => {
		if (user) {
			fetchPersonalizedRecommendations(user.uid).then(setMovies)
		}
	}, [user])

	return (
		<div className="flex flex-col gap-4 p-4">
			<h1 className="text-2xl font-bold">Recommendations</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{movies.map((movie) => (
					<div key={movie.id} className="bg-white p-4 rounded-lg shadow-md">
						<h2 className="text-lg font-bold">{movie.title}</h2>
						<p className="text-sm text-gray-600">{movie.overview}</p>
					</div>
				))}
			</div>
		</div>
	)
}
