import { Hono } from 'hono'

import fighters from '../db/fighters.json'
import rankings from '../db/rankings.json'

const app = new Hono()
app.get('/', (context) => context.text('Welcome to the unofficial UFC API'))
app.get('/fighters', (context) => context.json(fighters))
app.get('/rankings', (context) => context.json(rankings))

export default app
