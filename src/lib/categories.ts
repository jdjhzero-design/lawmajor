import type { QuestionCategory } from '../types/question'

export type CategoryInfo = {
  id: QuestionCategory
  title: string
  description: string
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'A',
    title: '정의·성립요건',
    description: '중대산업재해의 정의 및 가·나·다목 요건',
  },
  {
    id: 'B',
    title: '용어 정의',
    description: '종사자, 사업주, 경영책임자등',
  },
  {
    id: 'C',
    title: '적용범위',
    description: '상시근로자 5인 미만 면제 등',
  },
  {
    id: 'D',
    title: '안전·보건 확보의무',
    description: '법 제4조·제5조 의무',
  },
  {
    id: 'E',
    title: '시행령 구체 의무',
    description: '안전보건관리체계, 점검 주기 등',
  },
  {
    id: 'F',
    title: '처벌·양벌',
    description: '형량, 벌금, 가중처벌',
  },
  {
    id: 'G',
    title: '안전보건교육',
    description: '교육 이수, 과태료, 절차',
  },
  {
    id: 'H',
    title: '직업성 질병·별표1',
    description: '시행령 별표1 24종 직업성 질병',
  },
  {
    id: 'I',
    title: '공표·보칙',
    description: '발생사실 공표, 서면 보관',
  },
]

export function getCategoryTitle(id: QuestionCategory): string {
  return CATEGORIES.find((c) => c.id === id)?.title ?? id
}

export function getLawRefUrl(lawRef: string): string {
  const encoded = encodeURIComponent(lawRef)
  return `https://www.law.go.kr/LSW/lsSc.do?query=${encoded}`
}
