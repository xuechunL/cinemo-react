// TMDB API utils for fetching movies from TMDB

import type { Movie, TMDBMoviesResponse } from '@/types/movie'
import { shuffleArray } from '@/utils/array'

export const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

// Utility function to make TMDB API requests
export async function fetchFromTMDB<T>(
  endpoint: string,
  params: Record<string, string | number> = {}
): Promise<T> {
  // Build query string from params
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')

  const url = `${TMDB_BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
    },
  })

  if (!response.ok) {
    throw new Error(`TMDB API Error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}
// Helper function to get a random page number
export function getRandomPage(min = 1, max = 5): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Helper function to get a random genre ID
export function getRandomGenres(count = 1): number[] {
  const popularGenres = [
    28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878,
    10770, 53, 10752, 37,
  ]
  // Shuffle the array and take the first 'count' items
  return shuffleArray(popularGenres).slice(0, count)
}

// Helper function to remove duplicate movies
export function removeDuplicateMovies(movies: Movie[]): Movie[] {
  const uniqueMovies = new Map<number, Movie>()
  movies.forEach((movie) => {
    uniqueMovies.set(movie.id, movie)
  })
  return Array.from(uniqueMovies.values())
}

// Helper function to get a random endpoint and its query parameters
export function getRandomEndpoint(): { endpoint: string; query: string } {
  const endpoints = [
    {
      endpoint: '/trending/movie/week',
      query: `page=${getRandomPage()}`,
    },
    {
      endpoint: '/movie/popular',
      query: `page=${getRandomPage()}`,
    },
    {
      endpoint: '/movie/top_rated',
      query: `page=${getRandomPage()}`,
    },
    {
      endpoint: '/movie/now_playing',
      query: `page=${getRandomPage()}`,
    },
    {
      endpoint: '/discover/movie',
      query: `with_genres=${getRandomGenres(3).join(',')}&sort_by=popularity.desc`,
    },
  ]

  return endpoints[Math.floor(Math.random() * endpoints.length)]
}

// Fetch personalized recommendations by user id
// TODO: Using AI powered recommendations system in the future
export async function fetchPersonalizedRecommendations(
  userId: string
): Promise<Movie[] | null> {
  try {
    // In a real implementation, you would:
    // 1. Get user preferences from your database
    // 2. Get user's watch history
    // 3. Use collaborative filtering or content-based filtering

    // For now, we'll simulate some personalization based on the userId
    // This is just a placeholder for future AI-powered recommendations

    // Use the userId as a seed for pseudo-random selection
    const seed = userId
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0)

    // Create a deterministic but varied selection based on the user ID
    const genreIds = [
      // Action, Adventure, Animation, Comedy, Crime, Documentary, Drama, Family, Fantasy, History, Horror, Music, Mystery, Romance, Science Fiction, TV Movie, Thriller, War, Western
      28,
      12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770,
      53, 10752, 37,
    ]

    // Select genres based on the user ID
    const userPreferredGenres = shuffleArray(genreIds).slice(0, 3)

    // Fetch movies for each preferred genre
    const genrePromises = userPreferredGenres.map((genreId) =>
      fetchFromTMDB<TMDBMoviesResponse>('/discover/movie', {
        with_genres: genreId,
        sort_by: 'popularity.desc',
        page: (seed % 3) + 1,
      }).then((data) => data.results)
    )

    // Also fetch some popular movies as a baseline
    const popularPromise = fetchFromTMDB<TMDBMoviesResponse>('/movie/popular', {
      page: (seed % 3) + 1,
    }).then((data) => data.results)

    // Execute all API calls in parallel
    const results = await Promise.all([...genrePromises, popularPromise])

    // Flatten and remove duplicates from the results
    const allMovies = removeDuplicateMovies(results.flat())

    // Shuffle and return a subset of 20 movies
    return shuffleArray(allMovies).slice(0, 20)
  } catch (error) {
    console.error('Error fetching personalized recommendations:', error)
    return null
  }
}
