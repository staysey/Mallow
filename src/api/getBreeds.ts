import type { Breed } from '../data/breeds'

export async function getBreeds(): Promise<Breed[]> {
  const response = await fetch('/api/breeds')

  if (!response.ok) {
    throw new Error('Could not load breeds.')
  }

  return (await response.json()) as Breed[]
}
