import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Sticky, Container, Message, Button } from 'semantic-ui-react'
import MobileNav from '../components/HeaderMobile'
import Country from './Country'
import CountriesTableMobile from '../components/TableMobile'
import CountriesMenuMobile from '../components/MenuMobile'
import { resetFilter } from '../reducers/countryReducer'
import '../App1.css'

const Countries = () => {
  const dispatch = useDispatch()

  const show = useSelector((state) => state.menu.show)

  const countriesFiltered = useSelector((state) => {
    return state.countries.filtered.length > 0
      ? state.countries.filtered
      : state.countries.initialCountries
  })

  const reset = () => {
    dispatch(resetFilter())
  }

  const contextRef = useRef()

  return (
    <>
      <div id="ref" ref={contextRef} style={{ width: '100%' }}>
        <Sticky id="Sticky" context={contextRef}>
          <MobileNav />
          {countriesFiltered.length === 0 ? (
            <Container>
              <Message compact info>
                <Message.Header>No matches, please try again.</Message.Header>
                <Button basic color="teal" onClick={reset}>
                  OK
                </Button>
              </Message>
            </Container>
          ) : (
            <>
              {countriesFiltered.length === 1 ? (
                <Country data={countriesFiltered[0]} />
              ) : (
                <>{show ? <CountriesMenuMobile /> : <></>}</>
              )}
            </>
          )}
        </Sticky>
        <CountriesTableMobile />
      </div>
    </>
  )
}

export default Countries
