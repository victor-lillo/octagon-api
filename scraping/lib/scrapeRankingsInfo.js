import { cleanString, standarizeString } from './string_modifiers.js'
import { logInfo, logSuccess } from './log.js'
import { writeDBFile } from './db.js'
import scrape from './scrape.js'
import { renameFile } from './renameFile.js'

// http://www.ufcstats.com/statistics/fighters?char=a

const RANKINGS_URL = 'https://www.ufc.com/rankings'
const RANKINGS_DB_NAME = 'rankings'

const SELECTORS = {
  table: '.views-table',
  category: '.rankings--athlete--champion h4',
  champion: '.rankings--athlete--champion .views-row a',
  fighterRows: '.views-row',
}
const getSlugFromUrl = (url) => {
  return url.split('/').at(-1)
}

async function scrapeRankingsInfo() {
  logInfo(`Running ranking scraper`)

  const $ = await scrape(RANKINGS_URL)
  const $tables = $.querySelectorAll(SELECTORS.table)

  // Recorremos el nodeElement tables (que son todos los que coinciden con nuestra búsqueda)
  const data = $tables.map(($el) => {
    const categoryName = $el.querySelector(SELECTORS.category).textContent
    const categoryId = standarizeString(categoryName)
    const championNode = $el.querySelector(SELECTORS.champion)
      ? $el.querySelector(SELECTORS.champion)
      : ''
    const championName = championNode ? championNode.textContent : ''
    const championId = championNode ? getSlugFromUrl(championNode.getAttribute('href')) : ''

    const rankedsNodeElements = $el.querySelectorAll(SELECTORS.fighterRows)

    const fighters = rankedsNodeElements.map(($element) => {
      const relativeFighterUrl = $element.querySelector('a').getAttribute('href')
      const id = getSlugFromUrl(relativeFighterUrl)
      const name = cleanString($element.textContent)
      return { id, name }
    })

    const champion = { id: championId, championName }

    return { id: categoryId, categoryName, champion, fighters }
  })

  await renameFile('rankings', 'rankings-old')
  await writeDBFile(RANKINGS_DB_NAME, data)
  logSuccess(`Rankings saved in ${RANKINGS_DB_NAME}.json\n`)
}

export default scrapeRankingsInfo
