import React, { useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import loadable from '@loadable/component'
import { initializeCountries } from './reducers/countryReducer'
import { useDispatch, useSelector } from 'react-redux'

const Countries = loadable(() => import('./pages/Countries'))
const CountriesMobile = loadable(() => import('./pages/CountriesMobile'))

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeCountries())
  }, [dispatch])

  const countries = useSelector((state) => {
    return state.countries.initialCountries
  })

  return countries !== undefined ? (
    isMobile ? (
      <CountriesMobile />
    ) : (
      <Countries />
    )
  ) : (
    <></>
  )
}

export default App
