export type UserProfile = {
  uid: string
  name: string
  email: string
  avatar?: string
  createdAt: string
  preferences: UserPreferences
}
// Decade Enum
export enum Decade {
  The1990s = '1990s',
  The2000s = '2000s',
  The2010s = '2010s',
  The2020s = '2020s',
}

// Mood Enum
export enum Mood {
  Terrible = 'TERRIBLE',
  Sad = 'SAD',
  Frustrated = 'FRUSTRATED',
  Anxious = 'ANXIOUS',
  Tired = 'TIRED',
  Happy = 'HAPPY',
  Bored = 'BORED',
  Excited = 'EXCITED',
  Lonely = 'LONELY',
  Angry = 'ANGRY',
}

// Genre Enum
export enum Genre {
  Romance = 'ROMANCE',
  Comedy = 'COMEDY',
  SciFi = 'SCI-FI',
  Horror = 'HORROR',
  Crime = 'CRIME',
  History = 'HISTORY',
  Action = 'ACTION',
}

export type UserPreferences = {
  genres: Genre[]
  mood: Mood | null
  decades?: Decade[]
  ratingThreshold?: number
  language?: string
  lastUpdated?: string
}
