import { parse } from 'node-html-parser'
import { writeDBFile } from './lib/db.js'

// http://www.ufcstats.com/statistics/fighters?char=a

const RANKINGS_URL = 'https://www.ufc.com/rankings'

const SELECTORS = {
  table: '.views-table',
  category: '.rankings--athlete--champion h4',
  champion: '.rankings--athlete--champion .views-row a',
  rankeds: '.views-row',
}

const cleanString = text => {
  return text.replace(/\t|\n|\s:/g, '').trim()
}

async function getRankings() {
  const res = await fetch(RANKINGS_URL)
  const html = await res.text()
  const $ = parse(html)

  const $tables = $.querySelectorAll(SELECTORS.table)

  const data = []

  // Recorremos el nodeElement tables (que son todos los que coinciden con nuestra búsqueda)
  $tables.forEach($el => {
    const obj = {}

    const category = $el.querySelector(SELECTORS.category).textContent
    const champion = $el.querySelector(SELECTORS.champion)
      ? $el.querySelector(SELECTORS.champion).textContent
      : ''

    const rankedsNodeElements = $el.querySelectorAll(SELECTORS.rankeds)
    const rankeds = rankedsNodeElements.map(element => cleanString(element.textContent))

    obj.category = category
    obj.champion = champion
    obj.fighters = rankeds

    data.push(obj)
  })

  await writeDBFile('rankings', data)
}

const run = async () => {
  await getRankings()
}

run()
