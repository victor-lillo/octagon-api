import styles from './AthleteFilter.module.css'
import data from '@db/fighters.json'
import { useState } from 'react'

const fighterData = Object.entries(data)
  .map(([key, value]) => {
    const { name, weight } = value
    return { name, route: `athlete/${key}`, weight }
  })
  .sort(({ name: nameA }, { name: nameB }) => {
    if (nameA > nameB) {
      return 1
    }
    if (nameA < nameB) {
      return -1
    }
    return 0
  })

export default function AthleteFilter() {
  const [filterName, setName] = useState('')

  const handleChange = (e) => {
    const { value } = e.target
    setName(value)
  }

  const filteredData = fighterData.filter(({ name }) => {
    const lowerFilterName = filterName.toLocaleLowerCase()
    const lowerName = name.toLocaleLowerCase()
    return lowerName.includes(lowerFilterName)
  })

  return (
    <>
      <input
        value={filterName}
        onChange={handleChange}
        type='text'
      ></input>
      <ul className={styles.container}>
        {filteredData.length > 0 &&
          filteredData.map(({ route, name, weight }, index) => (
            <li
              key={`${name}-${index}`}
              className={styles.row}
            >
              <a href={route}>{name}</a>
            </li>
          ))}
      </ul>
    </>
  )
}
