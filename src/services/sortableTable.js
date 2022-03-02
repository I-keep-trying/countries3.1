import { useState, useMemo } from 'react'

const useSortableData = (items) => {
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'ascending',
  })

  // set initial sort
  window.localStorage.setItem('sort key', sortConfig.key)
  window.localStorage.setItem('direction', sortConfig.direction)

  // set expiration for local storage to clear
  const now = new Date().getTime()
  const setupTime = localStorage.getItem('setupTime')
  if (setupTime == null) {
    localStorage.setItem('setupTime', now)
  } else {
    if (now - setupTime > 1 * 60 * 60 * 1000) {
      localStorage.clear()
      localStorage.setItem('setupTime', now)
    }
  }

  const sortedItems = useMemo(() => {
    let sortableItems = [...items]
    if (sortConfig.key === 'area' || sortConfig.key === 'population') {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    } else if (sortConfig.key === 'name') {
      sortableItems.sort((a, b) => {
        return sortConfig.direction === 'ascending'
          ? a[sortConfig.key].common.localeCompare(b[sortConfig.key].common)
          : b[sortConfig.key].common.localeCompare(a[sortConfig.key].common)
      })
    } else if (sortConfig.key === 'capital') {
      sortableItems.sort((a, b) => {
        return sortConfig.direction === 'ascending'
          ? a[sortConfig.key][0].localeCompare(b[sortConfig.key][0])
          : b[sortConfig.key][0].localeCompare(a[sortConfig.key][0])
      })
    } else {
      sortableItems.sort((a, b) => {
        return a[sortConfig.key] && sortConfig.direction === 'ascending'
          ? a[sortConfig.key].localeCompare(b[sortConfig.key])
          : b[sortConfig.key].localeCompare(a[sortConfig.key])
      })
    }

    return sortableItems
  }, [items, sortConfig])

  const requestSort = (key) => {
    let direction =
      sortConfig.direction === 'ascending' ? 'descending' : 'ascending'
    setSortConfig({ key, direction })
    window.localStorage.setItem('sort key', key)
    window.localStorage.setItem('direction', direction)
  }

  return { items: sortedItems, requestSort }
}

export default useSortableData

// original table sort code: https://codesandbox.io/s/table-sorting-gxt7g?file=/src/App.js:161-2693
