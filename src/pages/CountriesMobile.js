import React, { useState } from 'react'
import {
  Container,
  Button,
  Image,
  Menu,
  Table,
  Message,
  Segment,
  Icon,
} from 'semantic-ui-react'
import Country from './CountryMobile'
import HeaderNav from '../components/Header'
import countriesApiData from '../all-countries'
import countriesBasicInfo from '../countriesList'
import regions from '../regions'

const Countries = () => {
  const [input, setInput] = useState('')
  const [region, setRegion] = useState('All')
  const [activeRegion, setActiveRegion] = useState('All')
  const [subregion, setSubRegion] = useState('')
  const [activeSubregion, setActiveSubregion] = useState('')
  const [, setCountry] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [menu, setMenu] = useState(false)

  // get static lists of regions & subregions for labels on tabs
  const getSubregions = regions.filter((r) => {
    return r.region === activeRegion ? r : ''
  })

  const filteredCountries = countriesBasicInfo.filter((c) => {
    return c.name.toLowerCase().startsWith(input.toLowerCase())
  })

  const filterByRegion =
    region === 'All'
      ? filteredCountries
      : filteredCountries.filter(
          (c) => c.region.toLowerCase() === region.toLowerCase()
        )

  const filterBySubregion =
    subregion === ''
      ? filterByRegion
      : filterByRegion.filter((r) => r.subregion === subregion)

  // full response from restcountries api
  const getCountryData = countriesApiData.filter((c) => {
    return c.name.toLowerCase().startsWith(input.toLowerCase())
  })

  // handle click selecting a country
  const handleClick = (c) => {
    // pass full country details from api data
    const countryData = getCountryData.filter((cd) => {
      return cd.name.toLowerCase().startsWith(c.name.toLowerCase())
    })
    setIsLoading(true)
    setCountry(countryData[0].name)
    setInput(c.name)
  }

  // toggle to show selection of regions or 'All'
  const menuToggle = () => {
    menu === false ? setMenu(true) : setMenu(false)
  }

  // handle click of a region
  const handleRegionClick = (e, { name }) => {
    setCountry(null)
    setSubRegion('')
    setActiveSubregion('')
    setRegion(name)
    setActiveRegion(name)
    if (name === 'All') {
      menuToggle()
    }
  }

  // handle click of a subregion
  const handleSubregionClick = (e, { name }) => {
    setCountry(null)
    setSubRegion(name)
    setActiveSubregion(name)
  }

  // when input returns no match
  const reset = () => {
    if (activeRegion === 'All') {
      menuToggle()
    }
    setCountry(null)
    setInput('')
    setRegion('All')
    setActiveRegion('All')
    setSubRegion('')
    setActiveSubregion('')
  }

  // toggle mobile 'hamburger' menu
  const visibilityToggle = () => {
    visible === false ? setVisible(true) : setVisible(false)
  }

  const NoMatches = () => (
    <Container>
      <Message compact info>
        <Message.Header>No matches, please try again.</Message.Header>
        <Button basic color="teal" onClick={reset}>
          OK
        </Button>
      </Message>
    </Container>
  )

  const CountriesTable = () => (
    <Segment
      style={
        menu === false && visible === false
          ? { padding: 0, marginTop: 47 }
          : { padding: 0, marginTop: 0 }
      }
    >
      <Table selectable stackable>
        <Table.Body>
          {filterBySubregion.map((c) => {
            return (
              <>
                <Table.Row key={c.id} onClick={() => handleClick(c)}>
                  <Table.Cell width="two">
                    <Image
                      size="tiny"
                      src={c.flag}
                      alt="country flag"
                      bordered
                    />
                  </Table.Cell>
                  <Table.Cell>{c.name}</Table.Cell>
                </Table.Row>
              </>
            )
          })}
        </Table.Body>
      </Table>
    </Segment>
  )

  return (
    <>
      <HeaderNav
        visible={visible}
        reset={reset}
        setMenu={setMenu}
        visibilityToggle={visibilityToggle}
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        countries={filterBySubregion}
        setRegion={setRegion}
        setSubRegion={setSubRegion}
        setActiveRegion={setActiveRegion}
        setActiveSubregion={setActiveSubregion}
      />

      {getCountryData.length === 1 ? (
        <>
          <Country
            flag={filterBySubregion[0].flag}
            reset={reset}
            setInput={setInput}
            setRegion={setRegion}
            isLoading={isLoading}
            country={getCountryData[0]}
            setCountry={setCountry}
            region={region}
            subregion={subregion}
            setSubRegion={setSubRegion}
            setIsLoading={setIsLoading}
            setActiveRegion={setActiveRegion}
            setActiveSubregion={setActiveSubregion}
          />
        </>
      ) : (
        <>
          <>
            {visible ? (
              <>
                <Menu
                  vertical
                  fluid
                  size="mini"
                  attached="top"
                  style={{ marginTop: 45 }}
                >
                  {menu === false ? (
                    <Menu.Item name="All" onClick={reset}>
                      All Regions
                      <Icon name="caret right" />
                    </Menu.Item>
                  ) : (
                    <>
                      {getSubregions[0].subregions.length > 0 ? (
                        <>
                          <Menu.Item name="All" onClick={reset}>
                            All Regions
                          </Menu.Item>
                          <Menu.Item
                            header
                            name={activeRegion}
                            onClick={handleRegionClick}
                          >
                            {activeRegion}{' '}
                          </Menu.Item>
                          {activeSubregion === '' ? (
                            <>
                              {getSubregions[0].subregions.map((rs) => (
                                <Menu.Item
                                  key={rs}
                                  name={rs}
                                  active={activeSubregion === rs}
                                  onClick={handleSubregionClick}
                                />
                              ))}{' '}
                            </>
                          ) : (
                            <>
                              <Menu.Item header>{activeSubregion} </Menu.Item>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          {regions.map((r) => (
                            <>
                              {r.region === 'All' ? (
                                <Menu.Item
                                  key={r.id}
                                  name={r.region}
                                  active={activeRegion === r.region}
                                  onClick={handleRegionClick}
                                >
                                  All Regions
                                  <Icon name="caret down" />
                                </Menu.Item>
                              ) : (
                                <Menu.Item
                                  key={r.id}
                                  name={r.region}
                                  active={activeRegion === r.region}
                                  onClick={handleRegionClick}
                                >
                                  {r.region}
                                </Menu.Item>
                              )}
                            </>
                          ))}
                        </>
                      )}
                    </>
                  )}
                </Menu>
              </>
            ) : (
              <></>
            )}
          </>
          {filterBySubregion.length === 0 ? <NoMatches /> : <CountriesTable />}
        </>
      )}
    </>
  )
}

export default Countries
