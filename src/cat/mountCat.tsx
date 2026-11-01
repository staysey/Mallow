import { createRoot, type Root } from 'react-dom/client'
import { CatScene } from './CatScene'
import type { CatNote } from './types'

export type CatHandle = {
  update: (note: CatNote) => void
  unmount: () => void
}

export function mountCat(host: HTMLElement, note: CatNote, portrait = false): CatHandle {
  const root: Root = createRoot(host)

  const render = (next: CatNote) => {
    root.render(<CatScene note={next} portrait={portrait} />)
  }

  render(note)

  return {
    update: render,
    unmount: () => root.unmount(),
  }
}
