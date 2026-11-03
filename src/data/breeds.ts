import type { CatPattern } from '../cat/types'

export type BreedTag = {
  label: string
  tone?: 'lilac' | 'pink' | 'blue'
}

export type Breed = {
  id: string
  name: string
  line: string
  eyebrow: string
  summary: string
  coat: string
  pattern: CatPattern
  story: string
  description: string
  temperament: string
  note: string
  tags: BreedTag[]
  action: string
  saveLabel: string
  asideLabel: string
}
