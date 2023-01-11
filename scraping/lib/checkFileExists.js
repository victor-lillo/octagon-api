import { access, constants } from 'node:fs/promises'

const checkFileExists = async (path) => {
  try {
    await access(path, constants.R_OK | constants.W_OK)
    return true
  } catch {
    return false
  }
}

export default checkFileExists
