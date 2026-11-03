export type CatPattern = 'solid' | 'stripes' | 'spots' | 'points' | 'mask'

export type CatNote = {
  name: string
  color: string
  pattern: CatPattern
  ears: 'small' | 'big'
  fluff: 'short' | 'fluffy'
  move: 'idle' | 'tilt-head'
}
