import { CATEGORIES } from '../lib/categories'
import type { QuestionCategory } from '../types/question'

type CategoryGridProps = {
  onSelect: (category: QuestionCategory) => void
}

export function CategoryGrid({ onSelect }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => onSelect(cat.id)}
          className="rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-colors hover:border-blue-300 hover:bg-blue-50 active:scale-[0.99]"
        >
          <span className="mb-1 inline-block rounded bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
            {cat.id}
          </span>
          <h3 className="font-semibold text-slate-900">{cat.title}</h3>
          <p className="mt-1 text-sm text-slate-500">{cat.description}</p>
        </button>
      ))}
    </div>
  )
}
