// utils/enum-helpers.ts
import { Mood, Genre, Decade } from '@/types/user'

// Type guard functions
export function isMood(value: string): value is Mood {
  return Object.values(Mood).includes(value as Mood)
}

export function isGenre(value: string): value is Genre {
  return Object.values(Genre).includes(value as Genre)
}

export function isDecade(value: string): value is Decade {
  return Object.values(Decade).includes(value as Decade)
}

// Mapping functions for UI display
export const moodDisplayNames: Record<Mood, string> = {
  [Mood.Terrible]: 'Terrible',
  [Mood.Sad]: 'Sad',
  [Mood.Frustrated]: 'Frustrated',
  [Mood.Anxious]: 'Anxious',
  [Mood.Tired]: 'Tired',
  [Mood.Happy]: 'Happy',
  [Mood.Bored]: 'Bored',
  [Mood.Excited]: 'Excited',
  [Mood.Lonely]: 'Lonely',
  [Mood.Angry]: 'Angry',
}

export const genreDisplayNames: Record<Genre, string> = {
  [Genre.Romance]: 'Romance',
  [Genre.Comedy]: 'Comedy',
  [Genre.SciFi]: 'Sci-Fi',
  [Genre.Horror]: 'Horror',
  [Genre.Crime]: 'Crime',
  [Genre.History]: 'History',
  [Genre.Action]: 'Action',
}

export const decadeDisplayNames: Record<Decade, string> = {
  [Decade.The1990s]: '1990s',
  [Decade.The2000s]: '2000s',
  [Decade.The2010s]: '2010s',
  [Decade.The2020s]: '2020s',
}

// TMDB genre ID mapping
export const genreToTMDBId: Record<Genre, number> = {
  [Genre.Action]: 28,
  [Genre.Comedy]: 35,
  [Genre.Horror]: 27,
  [Genre.Romance]: 10749,
  [Genre.SciFi]: 878,
  [Genre.Crime]: 80,
  [Genre.History]: 36,
}
