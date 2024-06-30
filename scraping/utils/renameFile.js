import { join } from 'node:path'
import { rename } from 'fs'

const DB_PATH = join(process.cwd(), './db/')

export const renameFile = async (oldFileName, newFileName) => {
  rename(
    join(DB_PATH, oldFileName),
    join(DB_PATH, newFileName),

    (err) => {
      if (err) throw err
      console.log(`"${oldFileName}" backup saved in "${newFileName}"`)
    }
  )
}
