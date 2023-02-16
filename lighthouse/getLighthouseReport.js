import lighthouse from 'lighthouse'
import chromeLauncher from 'chrome-launcher'
import makeBadgeSvg from './makeBadge.js'
import updateReadme from './updateReadme.js'
import fs from 'node:fs'
import path from 'node:path'

const ROOT_FOLDER = 'lighthouse'
const RESULTS_FOLDER = 'results'
const RESULTS_PATH = path.join(process.cwd(), ROOT_FOLDER, RESULTS_FOLDER)

const config = {
  extends: 'lighthouse:default',
  settings: {
    formFactor: 'desktop',
    throttling: {
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 1,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0,
    },
    screenEmulation: {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
      disabled: false,
    },
    emulatedUserAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
  },
}

const percentToColor = (number) => {
  if (number >= 95) return '#00FF00'
  if (number >= 90) return '#7FFF00'
  if (number >= 75) return '#B0FF00'
  if (number >= 65) return '#FFFF00'
  if (number >= 55) return '#FFC100'
  if (number >= 40) return '#FF8C00'
  if (number >= 20) return '#FF5700'
  return '#FF0000'
}

const getLighthouseReport = async ({ url, mdName, badgeStyle }) => {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless', '--quiet'] })

  const options = {
    logLevel: 'silent', // 'info'
    port: chrome.port,
  }

  console.log(`Auditing ${url}. Wait some seconds.`)
  const runnerResult = await lighthouse(url, options, config)

  // `.lhr` is the Lighthouse Result as a JS object
  const {
    performance: { score: performance },
    accessibility: { score: accessibility },
    seo: { score: seo },
    'best-practices': { score: bestPractices },
  } = runnerResult.lhr.categories

  const lighthouseReport = {
    performance,
    accessibility,
    seo,
    'best-practices': bestPractices,
  }

  // Create a dir. Ignore if exists.
  fs.mkdir(RESULTS_PATH, { recursive: true }, (err) => {
    if (err) throw err
  })

  console.log('\nRESULTS:')

  const badges = Object.entries(lighthouseReport).map(([key, value]) => {
    const percentValue = value.toFixed(2) * 100
    console.log(`• ${key}: ${percentValue}%`)

    makeBadgeSvg({
      folder: RESULTS_PATH,
      label: key,
      message: percentValue,
      color: percentToColor(percentValue),
      badgeStyle,
    })

    return `![${key}](./${ROOT_FOLDER}/${RESULTS_FOLDER}/${key}.svg)`
  })

  updateReadme({ mdName, badgesMdText: badges.join('\n') })

  await chrome.kill()
}

export default getLighthouseReport
