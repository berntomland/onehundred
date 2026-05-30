import { createServer } from 'http'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'

const PORT = 3001
const DATA_DIR = '/var/data'
const ALLOWED = new Set(['sjekkliste', 'innkjop', 'notpron'])

function file(key) { return `${DATA_DIR}/${key}.json` }

function read(key) {
  try { return JSON.parse(readFileSync(file(key), 'utf8')) }
  catch { return { checked: [], notes: {} } }
}

function write(key, body) {
  mkdirSync(DATA_DIR, { recursive: true })
  writeFileSync(file(key), body)
}

function keyFromUrl(url) {
  if (url === '/api/state') return 'sjekkliste' // backwards compat
  const m = url.match(/^\/api\/([a-z]+)$/)
  return m ? m[1] : null
}

const server = createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', 'https://beom.no')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return }

  const key = keyFromUrl(req.url ?? '')
  if (!key || !ALLOWED.has(key)) { res.writeHead(404); res.end('{}'); return }

  if (req.method === 'GET') { res.end(JSON.stringify(read(key))); return }

  if (req.method === 'POST') {
    let body = ''
    req.on('data', chunk => { body += chunk })
    req.on('end', () => {
      try { JSON.parse(body); write(key, body); res.end('{"ok":true}') }
      catch { res.writeHead(400); res.end('{"error":"invalid json"}') }
    })
    return
  }

  res.writeHead(405); res.end('{}')
})

server.listen(PORT, '127.0.0.1', () =>
  console.log(`fest-api on 127.0.0.1:${PORT}`)
)
