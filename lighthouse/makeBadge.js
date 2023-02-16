import { makeBadge } from 'badge-maker'
import { writeFile } from 'node:fs/promises'

const writeLocalFile = (name, data) => {
  return writeFile(`./assets/${name}.svg`, data, 'utf-8')
}

const makeBadgeSvg = ({ label, message, color, badgeStyle }) => {
  const svg = makeBadge({
    label: label,
    message: `${message}%`,
    color: color,
    style: badgeStyle, //'plastic', 'flat', 'flat-square', 'for-the-badge' or 'social'
  })

  // writeLocalFile(label, svg)
  return svg
}

export default makeBadgeSvg
