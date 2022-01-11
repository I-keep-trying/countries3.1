import React from 'react'
import { Container } from 'semantic-ui-react'
// import { isMobile } from 'react-device-detect'
import './App.css'
import Countries from './pages/Countries'
import Map from './pages/Map'
// import CountriesMobile from './pages/CountriesMobile'

function App() {
  return (
    <>
      <Container fluid>
        {/*    <Map /> */}
        <Countries />
        {/* {isMobile ? <CountriesMobile /> : <Countries />} */}
      </Container>
    </>
  )
}

export default App
