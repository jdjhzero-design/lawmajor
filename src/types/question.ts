export type QuestionCategory = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I'

export type Question = {
  id: string
  category: QuestionCategory
  scope: 'industrial'
  difficulty: 1 | 2 | 3
  question: string
  choices: [string, string, string, string]
  answerIndex: 0 | 1 | 2 | 3
  explanation: string
  lawRef: string
}

export type QuizMode = 'random' | 'category' | 'wrong'

export type QuizSession = {
  questionIds: string[]
  answers: Record<string, number>
  startedAt: number
}

export type QuizResult = {
  total: number
  correct: number
  wrongIds: string[]
}
