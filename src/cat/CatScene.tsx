import type { CatNote } from './types'

type CatSceneProps = {
  note: CatNote
}

export function CatScene({ note }: CatSceneProps) {
  return (
    <div className="cat-scene">
      <div className="cat-swatch" style={{ background: note.color }} />
      <p className="cat-name">{note.name}</p>
      <p className="cat-meta">
        ears: {note.ears === 'big' ? 'big' : 'small'}
        {' · '}
        coat: {note.fluff === 'fluffy' ? 'fluffy' : 'short'}
      </p>
    </div>
  )
}
