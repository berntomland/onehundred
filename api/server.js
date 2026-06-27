import { createServer } from 'http'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'

const PORT = 3001
const DATA_DIR = '/var/data'
const ALLOWED = new Set(['sjekkliste', 'innkjop', 'notpron', 'oppgaver', 'tur'])

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

  if (key === 'tur') {
    const CAPACITY = { 1: 15, 2: 13, 3: 9, 4: 8 }
    const PRE_ASSIGNED = {
      'bettina': 1, 'bernt': 1, 'vibeke': 1, 'jørgen': 1, 'lennart': 1, 'torunn': 1,
      'kjell arne': 2, 'oline': 2, 'alma': 2, 'lea': 2, 'ingrid miljeteig': 2,
      'hildegunn': 3, 'ronny': 3,
      'stig': 4, 'linda': 4,
    }

    function normalize(s) { return s.toLowerCase().trim() }

    function findPreAssigned(name) {
      const n = normalize(name)
      for (const [key, boat] of Object.entries(PRE_ASSIGNED)) {
        if (n === key || n.startsWith(key + ' ') || n.endsWith(' ' + key)) return boat
      }
      return null
    }

    if (req.method === 'GET') {
      const state = read('tur')
      const assignments = state.assignments || {}
      const counts = {}
      for (const b of Object.keys(CAPACITY)) counts[b] = 0
      for (const b of Object.values(assignments)) counts[b] = (counts[b] || 0) + 1
      res.end(JSON.stringify({ counts, capacity: CAPACITY, assignments }))
      return
    }

    if (req.method === 'POST') {
      let body = ''
      req.on('data', chunk => { body += chunk })
      req.on('end', () => {
        let parsed
        try { parsed = JSON.parse(body) } catch { res.writeHead(400); res.end('{"error":"invalid json"}'); return }

        const name = (parsed.name || '').trim()
        if (!name) { res.writeHead(400); res.end('{"error":"name required"}'); return }

        const state = read('tur')
        const assignments = state.assignments || {}

        const existingKey = Object.keys(assignments).find(k => normalize(k) === normalize(name))
        if (existingKey) {
          res.end(JSON.stringify({ boat: assignments[existingKey] }))
          return
        }

        const counts = {}
        for (const b of Object.keys(CAPACITY)) counts[b] = 0
        for (const b of Object.values(assignments)) counts[b] = (counts[b] || 0) + 1

        const pre = findPreAssigned(name)
        if (pre) {
          assignments[name] = pre
          write('tur', JSON.stringify({ assignments }))
          res.end(JSON.stringify({ boat: pre }))
          return
        }

        const available = Object.entries(CAPACITY)
          .filter(([id]) => (counts[id] || 0) < CAPACITY[id])
          .map(([id]) => Number(id))
        if (available.length === 0) {
          res.end(JSON.stringify({ boat: null, full: true }))
          return
        }
        const boat = available[Math.floor(Math.random() * available.length)]
        assignments[name] = boat
        write('tur', JSON.stringify({ assignments }))
        res.end(JSON.stringify({ boat }))
      })
      return
    }

    res.writeHead(405); res.end('{}')
    return
  }

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
