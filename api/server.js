import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const DEFAULT_PORT = 5174
const breedsFile = fileURLToPath(new URL('./data/breeds.json', import.meta.url))

const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
}

async function readBreeds() {
  const file = await readFile(breedsFile, 'utf8')
  return JSON.parse(file)
}

export function startApi(port = DEFAULT_PORT) {
  const server = createServer(async (request, response) => {
    const url = new URL(request.url ?? '/', `http://${request.headers.host ?? 'localhost'}`)
    const path = url.pathname.replace(/\/$/, '') || '/'

    if (request.method === 'OPTIONS') {
      response.writeHead(204, headers)
      response.end()
      return
    }

    if (request.method === 'GET' && path === '/breeds') {
      try {
        const breeds = await readBreeds()
        response.writeHead(200, headers)
        response.end(JSON.stringify(breeds))
      } catch {
        response.writeHead(500, headers)
        response.end(JSON.stringify({ error: 'Could not read breeds.' }))
      }
      return
    }

    response.writeHead(404, headers)
    response.end(JSON.stringify({ error: 'Not found.' }))
  })

  server.on('error', (error) => {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'EADDRINUSE') {
      console.warn(`Mallow API already running on http://127.0.0.1:${port}`)
      return
    }
    throw error
  })

  server.listen(port, '127.0.0.1', () => {
    console.log(`Mallow API http://127.0.0.1:${port}/breeds`)
  })

  return server
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]

if (isDirectRun) {
  startApi()
}
