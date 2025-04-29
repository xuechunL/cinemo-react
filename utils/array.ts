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

export { shuffleArray, getRandomSubset }
