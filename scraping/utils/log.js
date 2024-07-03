import pc from 'picocolors'

const SYMBOL = {
  info: pc.blue('ℹ'),
  success: pc.green('✔'),
  warning: pc.yellow('⚠'),
  error: pc.red('✖'),
}

export const logInfo = (...args) => {
  console.log(`${SYMBOL.info} ${pc.blue(...args)}`)
}

export const logError = (...args) => {
  console.log(`${SYMBOL.error} ${pc.red(...args)}`)
}

export const logSuccess = (...args) => {
  console.log(`${SYMBOL.success} ${pc.green(...args)}`)
}

export const logWarning = (...args) => {
  console.log(`${SYMBOL.warning} ${pc.yellow(...args)}`)
}

export const logReport = ({ message, time, folder }) => {
  console.log(`${SYMBOL.success} ${pc.green(message)}`)
  console.log(`  Time: ${pc.yellow(time)}`)
  console.log(`  File: ${pc.yellow(folder)}\n`)
}
