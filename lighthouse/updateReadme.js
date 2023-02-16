import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const START_REPLACE_STR = '<!-- lightouse-badges:start -->'
const END_REPLACE_STR = '<!-- lightouse-badges:end -->'

const textBetweenTwoStrings = (text, str1, str2) => {
  return text.substring(text.lastIndexOf(str1), text.lastIndexOf(str2)) + str2
}

const updateReadme = async ({ mdName, badgesMdText }) => {
  const replacingText = START_REPLACE_STR + '\n\n' + badgesMdText + '\n\n' + END_REPLACE_STR
  const currentReadme = await readFile(mdName, 'utf-8')

  const newReadme = currentReadme.includes(END_REPLACE_STR)
    ? currentReadme.replace(
        textBetweenTwoStrings(currentReadme, START_REPLACE_STR, END_REPLACE_STR),
        replacingText
      )
    : currentReadme.replace(START_REPLACE_STR, replacingText)

  const mdFilePath = path.join(process.cwd(), mdName)

  await writeFile(mdFilePath, newReadme, 'utf-8')
}

export default updateReadme
