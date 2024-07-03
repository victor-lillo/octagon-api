import path from 'node:path'
import sharp from 'sharp'
import { logSuccess } from './log.js'

const BASE_IMAGE_FOLDER = 'public'
const FIGHTERS_IMAGE_FOLDER = 'fighters'

export const saveRemoteImage = async ({
  baseFolder = BASE_IMAGE_FOLDER,
  fileName,
  folder = FIGHTERS_IMAGE_FOLDER,
  url,
}) => {
  const responseImage = await fetch(url)
  const arrayBuffer = await responseImage.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const imageFileName = `${fileName}.webp`
  const imageFilePath = path.join(baseFolder, folder, imageFileName)
  await sharp(buffer).webp().toFile(imageFilePath)
  logSuccess('Image succesfully saved')
  return imageFileName
}
