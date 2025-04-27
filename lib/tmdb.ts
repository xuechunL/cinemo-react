// TMDB API utils for fetching movies from TMDB

const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

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
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}
