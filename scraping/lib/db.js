import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const DB_PATH = path.join(process.cwd(), './db/')

export function readDBFile(dbName) {
  return readFile(`${DB_PATH}/${dbName}.json`, 'utf-8').then(JSON.parse)
}

export function writeDBFile(dbName, data) {
  return writeFile(`${DB_PATH}/${dbName}.json`, JSON.stringify(data, null, 2), 'utf-8')
}
