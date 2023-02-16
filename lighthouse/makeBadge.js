import { makeBadge } from 'badge-maker'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'

const writeLocalFile = (folder, name, data) => {
  const svgPath = path.join(folder, `${name}.svg`)

  return writeFile(svgPath, data, 'utf-8')
}

const makeBadgeSvg = ({ badgeStyle, color, folder, label, message }) => {
  const svg = makeBadge({
    label: label,
    message: `${message}%`,
    color: color,
    style: badgeStyle,
  })

  writeLocalFile(folder, label, svg)
}

export default makeBadgeSvg
