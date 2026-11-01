import { createRoot, type Root } from 'react-dom/client'
import { PeekCat } from './PeekCat'

export type PeekHandle = {
  unmount: () => void
}

export function mountPeekCat(host: HTMLElement): PeekHandle {
  const root: Root = createRoot(host)
  root.render(<PeekCat />)
  return {
    unmount: () => root.unmount(),
  }
}
