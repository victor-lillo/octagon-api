import app from '.'
import { describe, test, expect } from 'vitest'

describe('Octagon API', () => {
  test('/', async () => {
    const res = await app.request('/')
    const text = await res.text()
    console.log(text)
    expect(res.status).toBe(200)
    expect(text).toBe('Welcome to Octagon API')
  })
})
