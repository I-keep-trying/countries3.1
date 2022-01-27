import React from 'react'
import { Segment } from 'semantic-ui-react'
// import { isMobile } from 'react-device-detect'
import './App.css'
import Countries from './pages/Countries'
import countriesData from './countriesList'

function App() {
  return (
    <>
      {/*  <Segment.Group style={{ padding: 0, border: 0 }}>
        <Countries countriesData={countriesData} />
      </Segment.Group> */}
      <Countries countriesData={countriesData} />
    </>
  )
}

export default App
