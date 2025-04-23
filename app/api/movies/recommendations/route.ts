import { NextRequest, NextResponse } from 'next/server'
import { Movie } from '@/types/movie'
import { fetchFromTMDB, TMDBMovieResponse } from '@/lib/tmdb'

// Helper function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]

  // Standard Fisher-Yates shuffle
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }

  return newArray
}

// Helper function to get a random subset of an array
function getRandomSubset<T>(array: T[], count: number): T[] {
  return shuffleArray(array).slice(0, count)
}

// Helper function to get a random page number for TMDB API
function getRandomPage(min = 1, max = 5): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Helper function to get a random genre ID from popular genres
function getRandomGenre(): number {
  const popularGenres = [
    28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878,
    10770, 53, 10752, 37,
  ]
  return popularGenres[Math.floor(Math.random() * popularGenres.length)]
}

// Helper function to remove duplicate movies by ID
function removeDuplicateMovies(movies: Movie[]): Movie[] {
  const uniqueMovies = new Map<number, Movie>()

  // Add movies to the map, using the ID as the key
  // This automatically overwrites any duplicates
  movies.forEach((movie) => {
    uniqueMovies.set(movie.id, movie)
  })

  // Convert the map values back to an array
  return Array.from(uniqueMovies.values())
}

// Fetch default recommendations for non-authenticated users with TMDB API
async function fetchDefaultRecommendations(): Promise<Movie[]> {
  try {
    // Create an array of different recommendation strategies
    const strategies = [
      // Strategy 1: Trending movies from this week
      async () => {
        const data = await fetchFromTMDB<TMDBMovieResponse>(
          '/trending/movie/week',
          { page: getRandomPage() }
        )
        return data.results
      },
      // Strategy 2: Popular movies
      async () => {
        const data = await fetchFromTMDB<TMDBMovieResponse>('/movie/popular', {
          page: getRandomPage(),
        })
        return data.results
      },
      // Strategy 3: Top rated movies
      async () => {
        const data = await fetchFromTMDB<TMDBMovieResponse>(
          '/movie/top_rated',
          { page: getRandomPage() }
        )
        return data.results
      },
      // Strategy 4: Now playing movies
      async () => {
        const data = await fetchFromTMDB<TMDBMovieResponse>(
          '/movie/now_playing',
          { page: getRandomPage() }
        )
        return data.results
      },
      // Strategy 5: Movies by a random genre
      async () => {
        const genreId = getRandomGenre()
        const data = await fetchFromTMDB<TMDBMovieResponse>('/discover/movie', {
          with_genres: genreId,
          page: getRandomPage(),
        })
        return data.results
      },
    ]

    // Randomly select 2-3 strategies to combine
    const selectedStrategies = shuffleArray(strategies).slice(
      0,
      Math.floor(Math.random() * 2) + 2
    )

    // Execute all selected strategies in parallel
    const results = await Promise.all(
      selectedStrategies.map((strategy) => strategy())
    )

    // Flatten and remove duplicates from the results
    const allMovies = removeDuplicateMovies(results.flat())

    // Shuffle and return a random subset of 20 movies
    return getRandomSubset(allMovies, 20)
  } catch (error) {
    console.error('Error fetching default recommendations:', error)
    // Fallback to a single API call if the combined strategy fails
    const data = await fetchFromTMDB<TMDBMovieResponse>('/movie/popular')
    return shuffleArray(data.results).slice(0, 20)
  }
}

// Fetch personalized recommendations by user id
// TODO: Using AI powered recommendations system in the future
async function fetchPersonalizedRecommendations(
  userId: string
): Promise<Movie[]> {
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
      fetchFromTMDB<TMDBMovieResponse>('/discover/movie', {
        with_genres: genreId,
        sort_by: 'popularity.desc',
        page: (seed % 3) + 1,
      }).then((data) => data.results)
    )

    // Also fetch some popular movies as a baseline
    const popularPromise = fetchFromTMDB<TMDBMovieResponse>('/movie/popular', {
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
    // Fallback to default recommendations if personalized fetching fails
    return fetchDefaultRecommendations()
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    let movies: Movie[]

    if (userId) {
      // If userId is provided, fetch personalized recommendations
      movies = await fetchPersonalizedRecommendations(userId)
    } else {
      // Otherwise, fetch default recommendations
      movies = await fetchDefaultRecommendations()
    }

    // Final check to ensure no duplicates in the response
    movies = removeDuplicateMovies(movies)

    return NextResponse.json({ movies })
  } catch (error) {
    console.error('Error in recommendations API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch movie recommendations' },
      { status: 500 }
    )
  }
}
