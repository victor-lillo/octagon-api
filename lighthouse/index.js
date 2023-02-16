import getLighthouseReport from './getLighthouseReport.js'
import config from './lighthouse.config.json' assert { type: 'json' }

const DEFAULTS = {
  badgeStyle: 'flat',
  mdName: 'README.md',
}

async function run() {
  const { url, badgeStyle = DEFAULTS.badgeStyle, mdName = DEFAULTS.mdName } = config

  if (!url) {
    console.log('\nERROR: URL was not provided. Add it in lighthouse.config.json\n')
    return
  }
  console.log('\nGetting Lighthouse report, with this config:')
  console.log(`• URL: ${url}`)
  console.log(`• badgeStyle: ${badgeStyle}`)
  console.log(`• mdName: ${mdName}`)
  await getLighthouseReport({ url, badgeStyle, mdName })
}

run()
