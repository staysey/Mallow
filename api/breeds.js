import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const breedsFile = fileURLToPath(new URL('./data/breeds.json', import.meta.url))

export default async function handler(_request, response) {
  const breeds = JSON.parse(await readFile(breedsFile, 'utf8'))
  response.status(200).json(breeds)
}
