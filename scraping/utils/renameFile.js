import fs from 'fs'
import path from 'node:path'

const DB_PATH = path.join(process.cwd(), './db/')
export const renameFile = async (oldFileName, newFileName) => {
  fs.rename(
    path.join(DB_PATH, oldFileName + '.json'),
    path.join(DB_PATH, newFileName + '.json'),

    (err) => {
      if (err) throw err
      console.log(`${oldFileName}.json backup saved`)
    }
  )
}
