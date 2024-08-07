import fighters from '@db/fighters.json'
import rankings from '@db/rankings.json'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { graphqlServer } from '@hono/graphql-server'
import { Hono } from 'hono'

const app = new Hono()

const typeDefs = `
  type Query {
    rankings: [Division!]!
    division(id: ID!): Division
    fighters: [Fighter!]!
    fighter(id: ID!): Fighter
  }

  type Division {
    id: ID!
    categoryName: String!
    champion: Champion
    fighters: [DivisionFighter!]!
  }

  type Champion {
    id: ID!
    championName: String!
  }

  type DivisionFighter {
    id: ID!
    name: String!
  }

  type Fighter {
    id: ID!
    category: String!
    draws: String!
    imgUrl: String!
    losses: String!
    name: String!
    nickname: String
    wins: String!
    status: String!
    placeOfBirth: String
    trainsAt: String
    fightingStyle: String
    age: String
    height: String
    weight: String
    octagonDebut: String
    reach: String
    legReach: String
  }
`

const resolvers = {
  Query: {
    rankings: () => rankings,
    division: (_, { id }) => rankings.find((division) => division.id === id),
    fighters: () => Object.entries(fighters).map(([id, fighter]) => ({ id, ...fighter })),
    fighter: (_, { id }) => (fighters[id] ? { id, ...fighters[id] } : null),
  },
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

app.use(
  '/graphql',
  graphqlServer({
    schema,
    graphiql: true,
  })
)

app.get('/', (c) => c.text('Welcome to Octagon API'))
app.get('/fighters', (c) => c.json(fighters))
app.get('/rankings', (c) => c.json(rankings))
app.get('/fighter/:fighterId', (c) => {
  const fighterId = c.req.param('fighterId')
  const fighter = fighters[fighterId]
  return fighter ? c.json(fighter) : c.json({ message: 'Fighter not found' }, 404)
})
app.get('/division/:divisionId', (c) => {
  const divisionId = c.req.param('divisionId')
  const division = rankings.find((division) => division.id === divisionId)
  return division ? c.json(division) : c.json({ message: 'Division not found' }, 404)
})

export default app
