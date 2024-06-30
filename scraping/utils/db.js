import { join } from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'

const DB_FOLDER_NAME = 'db'

const getFilePath = (dbName) => join(process.cwd(), DB_FOLDER_NAME, dbName)

export async function readDBFile(dbName) {
  const filePath = getFilePath(dbName)

  const text = await readFile(filePath, 'utf-8')
  return JSON.parse(text)
}

export function writeDBFile(dbName, data) {
  const filePath = getFilePath(dbName)

  return writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
}
