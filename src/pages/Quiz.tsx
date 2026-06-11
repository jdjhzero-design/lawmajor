import { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ProgressBar } from '../components/ProgressBar'
import { QuizCard } from '../components/QuizCard'
import { useQuiz } from '../hooks/useQuiz'
import { getWrongAnswerIds } from '../lib/storage'
import type { QuestionCategory, QuizMode } from '../types/question'

export function Quiz() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const mode = (searchParams.get('mode') ?? 'random') as QuizMode
  const category = searchParams.get('category') ?? undefined
  const wrongIds = useMemo(() => getWrongAnswerIds(), [])

  const quiz = useQuiz({ mode, category, wrongIds })

  if (quiz.total === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="mb-4 text-lg text-slate-700">풀 문제가 없습니다.</p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
        >
          홈으로
        </button>
      </div>
    )
  }

  if (quiz.isFinished && quiz.result) {
    navigate('/result', {
      replace: true,
      state: {
        result: quiz.result,
        mode,
        category: category as QuestionCategory | undefined,
      },
    })
    return null
  }

  const { currentQuestion, currentIndex, total, progress, selectedIndex, isAnswered } = quiz

  if (!currentQuestion) return null

  const handleSelect = (index: number) => {
    quiz.selectChoice(index)
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col px-4 py-4 sm:py-6">
      <div className="mb-4">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mb-3 text-sm text-slate-500 hover:text-slate-700"
        >
          ← 홈으로
        </button>
        <ProgressBar progress={progress} current={currentIndex + 1} total={total} />
      </div>

      <div className="flex-1">
        <QuizCard
          question={currentQuestion}
          selectedIndex={selectedIndex}
          isAnswered={isAnswered}
          onSelect={handleSelect}
        />
      </div>

      <div className="sticky bottom-0 mt-4 bg-slate-50 pt-2 pb-4">
        {!isAnswered ? (
          <button
            type="button"
            disabled={selectedIndex === null}
            onClick={() => quiz.submitAnswer()}
            className="w-full rounded-xl bg-blue-600 py-4 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            정답 확인
          </button>
        ) : (
          <button
            type="button"
            onClick={quiz.goNext}
            className="w-full rounded-xl bg-slate-800 py-4 font-semibold text-white transition-colors hover:bg-slate-900"
          >
            {currentIndex < total - 1 ? '다음 문제' : '결과 보기'}
          </button>
        )}
      </div>
    </div>
  )
}
