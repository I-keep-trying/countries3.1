import { useState, useMemo } from 'react'

const useSortableData = (items) => {
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'ascending',
  })

  const sortedItems = useMemo(() => {
    let sortableItems = [...items]

    return sortableItems.sort((a, b) => {
      if (window.localStorage.getItem('direction') === null) {
        if (isNaN(a[sortConfig.key]) === true) {
          return sortConfig.direction === 'ascending'
            ? a[sortConfig.key].localeCompare(b[sortConfig.key])
            : b[sortConfig.key].localeCompare(a[sortConfig.key])
        } else {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1
          }
        }
      } else {
        const storedKey = window.localStorage.getItem('sort key')
        const storedDir = window.localStorage.getItem('direction')

        if (isNaN(a[storedKey]) === true) {
          return storedDir === 'ascending'
            ? a[storedKey].localeCompare(b[storedKey])
            : b[storedKey].localeCompare(a[storedKey])
        } else {
          if (a[storedKey] < b[storedKey]) {
            return storedDir === 'ascending' ? -1 : 1
          }
          if (a[storedKey] > b[storedKey]) {
            return storedDir === 'ascending' ? 1 : -1
          }
        }
      }
    })
  }, [items, sortConfig])

  const requestSort = (key) => {
    let direction =
      sortConfig.direction === 'ascending' ? 'descending' : 'ascending'
    setSortConfig({ key, direction })
    window.localStorage.setItem('sort key', key)
    window.localStorage.setItem('direction', direction)
  }
  return { items: sortedItems, requestSort, sortConfig }
}

export default useSortableData

// original table sort code: https://codesandbox.io/s/table-sorting-gxt7g?file=/src/App.js:161-2693