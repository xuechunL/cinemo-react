import { Movie } from '@/types/movie'
import { GET } from '@/app/api/tmdb/route'
import { NextRequest } from 'next/server'
// TODO: Movie type aligns with the TMDB API response

const baseUrl = 'https://api.themoviedb.org/3'

// Fetch default recommendations for non-authenticated users with TMDB API
export async function fetchDefaultRecommendations(): Promise<Movie[]> {
  const res = await GET(new NextRequest(`${baseUrl}/trending/movie/week`))
  const data = await res.json()

  return data.results
}

// TODO: Fetch personalized recommendations by user id
// Implement with TMDB API and recommendation algorithm (e.g. collaborative filtering) in the future
// now just return popular movies in TMDB API
export async function fetchPersonalizedRecommendations(
  userId: string
): Promise<Movie[]> {
  console.log(userId)
  // equal to 'discover/movie' in TMDB API
  const res = await GET(new NextRequest(`${baseUrl}/movie/popular`))
  const data = await res.json()

  return data.results
}
