import cleanString from './lib/cleanString.js'
import { writeDBFile } from './lib/db.js'
import { logInfo } from './lib/log.js'
import scrape from './lib/scrape.js'

// http://www.ufcstats.com/statistics/fighters?char=a

const BASE_URL = 'https://www.ufc.com'
const RANKINGS_URL = 'https://www.ufc.com/rankings'
const RANKINGS_DB_NAME = 'rankings'

const SELECTORS = {
  table: '.views-table',
  category: '.rankings--athlete--champion h4',
  champion: '.rankings--athlete--champion .views-row a',
  fighterRows: '.views-row',
}

async function getRankings() {
  const $ = await scrape(RANKINGS_URL)
  const $tables = $.querySelectorAll(SELECTORS.table)

  // Recorremos el nodeElement tables (que son todos los que coinciden con nuestra búsqueda)
  const data = $tables.map(($el) => {
    const category = $el.querySelector(SELECTORS.category).textContent
    const champion = $el.querySelector(SELECTORS.champion)
      ? $el.querySelector(SELECTORS.champion).textContent
      : ''

    const rankedsNodeElements = $el.querySelectorAll(SELECTORS.fighterRows)
    const fighters = rankedsNodeElements.map(($element) => {
      const relativeFighterUrl = $element.querySelector('a').getAttribute('href')
      const id = relativeFighterUrl.split('/').at(-1)
      const url = BASE_URL + relativeFighterUrl
      const name = cleanString($element.textContent)
      return { id, name, url }
    })

    return { category, champion, fighters }
  })

  await writeDBFile(RANKINGS_DB_NAME, data)
  logInfo(`Rankings guardados en ${RANKINGS_DB_NAME}.json`)
}

await getRankings()
