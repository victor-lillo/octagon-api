import { parse } from 'node-html-parser'

const BASE_FIGHTER_URL = 'https://www.ufc.com/athlete/'
const FIGHTER = 'islam-makhachev'

const SELECTORS = {}

async function getFighterImage() {
  const res = await fetch(`${BASE_FIGHTER_URL}/${FIGHTER}`)
  const html = await res.text()
  const $ = parse(html)

  /* TODO
  - Sacar imagen del peleador
  - Usar sharp para optimizar la imagen (formato recomendado: webp)
  - Guardar la imagen en la carpeta /public/img (TIP: usar FIGHTER como nombre de imagen)
  */
}

const run = async () => {
  await getFighterImage()
}

run()
