const WRONG_ANSWERS_KEY = 'lawmajor-wrong-answers'
const STATS_KEY = 'lawmajor-stats'

export type Stats = {
  totalAnswered: number
  totalCorrect: number
}

export function getWrongAnswerIds(): string[] {
  try {
    const raw = localStorage.getItem(WRONG_ANSWERS_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

export function addWrongAnswer(id: string): void {
  const current = getWrongAnswerIds()
  if (!current.includes(id)) {
    localStorage.setItem(WRONG_ANSWERS_KEY, JSON.stringify([...current, id]))
  }
}

export function removeWrongAnswer(id: string): void {
  const current = getWrongAnswerIds().filter((x) => x !== id)
  localStorage.setItem(WRONG_ANSWERS_KEY, JSON.stringify(current))
}

export function clearWrongAnswers(): void {
  localStorage.removeItem(WRONG_ANSWERS_KEY)
}

export function getStats(): Stats {
  try {
    const raw = localStorage.getItem(STATS_KEY)
    return raw ? (JSON.parse(raw) as Stats) : { totalAnswered: 0, totalCorrect: 0 }
  } catch {
    return { totalAnswered: 0, totalCorrect: 0 }
  }
}

export function updateStats(answered: number, correct: number): void {
  const current = getStats()
  localStorage.setItem(
    STATS_KEY,
    JSON.stringify({
      totalAnswered: current.totalAnswered + answered,
      totalCorrect: current.totalCorrect + correct,
    }),
  )
}
