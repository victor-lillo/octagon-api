import { cleanString, standarizeString } from '../utils/stringFormatters.js'
import { logError, logInfo } from '../utils/log.js'
import scrape from '../utils/scrape.js'

// http://www.ufcstats.com/statistics/fighters?char=a

const RANKINGS_URL = 'https://www.ufc.com/rankings'

const SELECTORS = {
  table: '.view-grouping', // Each category table selector
  category: '.rankings--athlete--champion h4',
  champion: '.rankings--athlete--champion .info a',
  fighterRows: '.views-field.views-field-title',
}

const getSlugFromUrl = (url) => {
  return url.split('/').at(-1)
}

const scrapeRankings = async () => {
  try {
    logInfo(`Running ranking scraper\n`)

    const $ = await scrape(RANKINGS_URL)
    const $tables = $.querySelectorAll(SELECTORS.table)

    // Guard clause: if $tables is 0, throw new Error
    if ($tables.length === 0)
      throw new Error(`'$table' selector have changed. Check the selector in ${RANKINGS_URL}`)

    // We traverse the nodeElement tables
    const data = $tables.map(($el) => {
      const categoryName = $el.querySelector(SELECTORS.category).textContent
      const categoryId = standarizeString(categoryName)
      const championNode = $el.querySelector(SELECTORS.champion)
        ? $el.querySelector(SELECTORS.champion)
        : ''
      const championName = championNode ? championNode.textContent : ''
      const championId = championNode ? getSlugFromUrl(championNode.getAttribute('href')) : ''

      const fighterRowsNode = $el.querySelectorAll(SELECTORS.fighterRows)

      const fighters = fighterRowsNode.map(($element) => {
        const relativeFighterUrl = $element.querySelector('a').getAttribute('href')
        const id = getSlugFromUrl(relativeFighterUrl)
        const name = cleanString($element.textContent)
        return { id, name }
      })

      const champion = { id: championId, championName }

      // Guard clause: if fighters is 0, throw new Error
      if (fighters.length === 0 && championName === '')
        throw new Error(`Fighters not found. Check the selectors in ${RANKINGS_URL}`)

      return { id: categoryId, categoryName, champion, fighters }
    })

    return data
  } catch (error) {
    logError('\n', error)
  }
}

export default scrapeRankings
