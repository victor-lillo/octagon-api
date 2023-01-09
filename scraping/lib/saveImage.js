import path from 'node:path'
import sharp from 'sharp'

const IMAGE_FOLDER = 'public'

const saveImage = async ({ url, folder, fileName }) => {
  const responseImage = await fetch(url)
  const arrayBuffer = await responseImage.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const imageFileName = `${fileName}.webp`
  const imageFilePath = path.join(IMAGE_FOLDER, folder, imageFileName)
  await sharp(buffer).webp().toFile(imageFilePath)
  console.log('Imagen guardada correctamente')
  return imageFileName
}

export default saveImage
