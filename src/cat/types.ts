export type CatPattern = 'solid' | 'stripes' | 'spots'

export type CatNote = {
  name: string
  color: string
  pattern: CatPattern
  ears: 'small' | 'big'
  fluff: 'short' | 'fluffy'
  move: 'idle' | 'tilt-head'
}
