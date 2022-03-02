import React, { useEffect } from 'react'
import Countries from './pages/Countries'
import { initializeCountries } from './reducers/countryReducer'
import { useDispatch, useSelector } from 'react-redux'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeCountries())
  }, [dispatch])

  const countries = useSelector((state) => {
    //   console.log('state', state)
    return state.countries.initialCountries
  })
  //console.log('state.countries', countries)
  return countries !== undefined ? <Countries /> : <></>
  //  return <></> //countries.length > 0 ? <Countries /> : <></>
}

export default App
