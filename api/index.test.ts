import app from '.'
import { describe, test, expect } from 'vitest'

describe('Octagon API', () => {
  test('/', async () => {
    const res = await app.request('/')
    const text = await res.text()

    expect(res.status).toBe(200)
    expect(text).toBe('Welcome to Octagon API')
  })

  test('/fighters', async () => {
    const res = await app.request('/fighters')
    const json = await res.json()

    expect(res.status).toBe(200)
    expect(typeof json).toBe('object')
    expect(Object.keys(json).length).toBeGreaterThan(0)
  })

  test('/rankings', async () => {
    const res = await app.request('/rankings')
    const json = await res.json()

    expect(res.status).toBe(200)
    expect(Array.isArray(json)).toBe(true)
  })

  test('/fighter/:fighterId - exists', async () => {
    const fighterId = 'jon-jones'
    const res = await app.request(`/fighter/${fighterId}`)
    const json = await res.json()

    expect(res.status).toBe(200)
    expect(json).toHaveProperty('category')
  })

  test('/fighter/:fighterId - not found', async () => {
    const fighterId = 'non-existent-id'
    const res = await app.request(`/fighter/${fighterId}`)
    const json = await res.json()

    expect(res.status).toBe(404)
    expect(json).toHaveProperty('message', 'Fighter not found')
  })

  test('/division/:divisionId - exists', async () => {
    const divisionId = 'lightweight'
    const res = await app.request(`/division/${divisionId}`)
    const json = await res.json()

    expect(res.status).toBe(200)
    expect(json).toHaveProperty('id', divisionId)
  })

  test('/division/:divisionId - not found', async () => {
    const divisionId = 'non-existent-division'
    const res = await app.request(`/division/${divisionId}`)
    const json = await res.json()

    expect(res.status).toBe(404)
    expect(json).toHaveProperty('message', 'Division not found')
  })
})
