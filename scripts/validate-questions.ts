import { readFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const questionsDir = join(__dirname, '../data/questions')

type Question = {
  id: string
  category: string
  scope: string
  choices: string[]
  answerIndex: number
}

let errors = 0
const ids = new Set<string>()
const files = readdirSync(questionsDir).filter((f) => f.endsWith('.json'))

for (const file of files) {
  const questions = JSON.parse(readFileSync(join(questionsDir, file), 'utf-8')) as Question[]

  for (const q of questions) {
    if (ids.has(q.id)) {
      console.error(`[${file}] Duplicate id: ${q.id}`)
      errors++
    }
    ids.add(q.id)

    if (q.choices.length !== 4) {
      console.error(`[${file}] ${q.id}: choices must be exactly 4, got ${q.choices.length}`)
      errors++
    }

    if (q.answerIndex < 0 || q.answerIndex > 3) {
      console.error(`[${file}] ${q.id}: answerIndex must be 0-3, got ${q.answerIndex}`)
      errors++
    }

    if (q.scope !== 'industrial') {
      console.error(`[${file}] ${q.id}: scope must be 'industrial'`)
      errors++
    }

    const uniqueChoices = new Set(q.choices)
    if (uniqueChoices.size !== q.choices.length) {
      console.error(`[${file}] ${q.id}: duplicate choices found`)
      errors++
    }
  }
}

console.log(`Validated ${ids.size} questions in ${files.length} files`)

if (errors > 0) {
  console.error(`\n${errors} error(s) found`)
  process.exit(1)
} else {
  console.log('All questions passed validation')
}
