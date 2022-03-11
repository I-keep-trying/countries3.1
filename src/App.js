import React, { useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import Countries from './pages/Countries'
import CountriesMobile from './pages/CountriesMobile'
import { initializeCountries } from './reducers/countryReducer'
import { useDispatch, useSelector } from 'react-redux'

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
