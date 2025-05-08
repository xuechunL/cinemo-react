'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useUserStore } from '@/store/user'
import { Mood, Genre, Decade, UserPreferences } from '@/types/user'
import {
  moodDisplayNames,
  genreDisplayNames,
  decadeDisplayNames,
} from '@/utils/enum-helpers'

export function PreferencesForm() {
  const { user, updatePreferences, userError } = useUserStore()
  const [selectedMood, setSelectedMood] = useState<Mood | null>(
    user?.preferences?.mood || null
  )
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>(
    user?.preferences?.genres || []
  )
  const [selectedDecades, setSelectedDecades] = useState<Decade[]>(
    user?.preferences?.decades || []
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood === selectedMood ? null : mood)
  }

  const handleGenreToggle = (genre: Genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    )
  }

  const handleDecadeToggle = (decade: Decade) => {
    setSelectedDecades((prev) =>
      prev.includes(decade)
        ? prev.filter((d) => d !== decade)
        : [...prev, decade]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess(false)
    setIsSubmitting(true)

    try {
      const preferences: UserPreferences = {
        mood: selectedMood,
        genres: selectedGenres,
        decades: selectedDecades,
      }

      await updatePreferences(preferences)
      // TODO: Handle error and success messages properly
      if (!userError) {
        setSuccess(true)
      }
    } catch (error) {
      console.error('Error updating preferences:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">How are you feeling now?</h2>
        <div className="grid grid-cols-3 gap-4">
          {Object.values(Mood).map((mood) => (
            <button
              key={mood}
              type="button"
              onClick={() => handleMoodSelect(mood)}
              className={`p-4 rounded-lg border ${
                selectedMood === mood
                  ? 'border-blue-500 bg-blue-50 text-blue-500 font-bold'
                  : 'border-gray-200'
              }`}
            >
              {moodDisplayNames[mood]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">
          Which genres are you interested in?
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {Object.values(Genre).map((genre) => (
            <button
              key={genre}
              type="button"
              onClick={() => handleGenreToggle(genre)}
              className={`p-4 rounded-lg border ${
                selectedGenres.includes(genre)
                  ? 'border-blue-500 bg-blue-50 text-blue-500 font-bold'
                  : 'border-gray-200'
              }`}
            >
              {genreDisplayNames[genre]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">
          Which decades do you prefer?
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {Object.values(Decade).map((decade) => (
            <button
              key={decade}
              type="button"
              onClick={() => handleDecadeToggle(decade)}
              className={`p-4 rounded-lg border ${
                selectedDecades.includes(decade)
                  ? 'border-blue-500 bg-blue-50 text-blue-500 font-bold'
                  : 'border-gray-200'
              }`}
            >
              {decadeDisplayNames[decade]}
            </button>
          ))}
        </div>
      </div>

      {/* TODO: Error and success messages UI */}
      {userError && <div className="text-red-500">{userError}</div>}
      {!userError && success && (
        <div className="text-green-500 text-center">
          Preferences saved successfully! 🎉
          <br />
          Explore{' '}
          <Link href="/home" className="underline font-medium">
            movies
          </Link>{' '}
          tailored to your taste.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        {isSubmitting ? 'Saving...' : 'Save Preferences'}
      </button>
    </form>
  )
}
