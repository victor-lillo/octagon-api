import { Hono } from 'hono'

import fighters from '@db/fighters.json'
import rankings from '@db/rankings.json'

const app = new Hono()
app.get('/', (context) => context.text('Welcome to the unofficial UFC API'))
app.get('/fighters', (context) => context.json(fighters))
app.get('/rankings', (context) => context.json(rankings))
app.get('/fighter/:fighterId', (context) => {
  const fighterId = context.req.param('fighterId')
  const fighter = fighters[fighterId]

  return fighter ? context.json(fighter) : context.json({ message: 'Fighter not found' }, 404)
})
app.get('/division/:divisionId', (context) => {
  const divisionId = context.req.param('divisionId')
  const division = rankings.find((division) => division.id === divisionId)

  return division ? context.json(division) : context.json({ message: 'Division not found' }, 404)
})

export default app
