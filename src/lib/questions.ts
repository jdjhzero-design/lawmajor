import type { Question, QuestionCategory } from '../types/question'

import catA from '../../data/questions/cat-a-definition.json'
import catB from '../../data/questions/cat-b-terms.json'
import catC from '../../data/questions/cat-c-scope.json'
import catD from '../../data/questions/cat-d-duties.json'
import catE from '../../data/questions/cat-e-decree.json'
import catF from '../../data/questions/cat-f-penalty.json'
import catG from '../../data/questions/cat-g-education.json'
import catH from '../../data/questions/cat-h-occupational-disease.json'
import catI from '../../data/questions/cat-i-publication.json'

const ALL_QUESTIONS: Question[] = [
  ...(catA as Question[]),
  ...(catB as Question[]),
  ...(catC as Question[]),
  ...(catD as Question[]),
  ...(catE as Question[]),
  ...(catF as Question[]),
  ...(catG as Question[]),
  ...(catH as Question[]),
  ...(catI as Question[]),
]

export function getAllQuestions(): Question[] {
  return ALL_QUESTIONS
}

export function getQuestionById(id: string): Question | undefined {
  return ALL_QUESTIONS.find((q) => q.id === id)
}

export function getQuestionsByCategory(category: QuestionCategory): Question[] {
  return ALL_QUESTIONS.filter((q) => q.category === category)
}

export function shuffleQuestions(questions: Question[]): Question[] {
  const copy = [...questions]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function getQuestionsByIds(ids: string[]): Question[] {
  const map = new Map(ALL_QUESTIONS.map((q) => [q.id, q]))
  return ids.map((id) => map.get(id)).filter((q): q is Question => q !== undefined)
}
