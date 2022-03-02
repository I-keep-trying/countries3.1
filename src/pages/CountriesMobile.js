import React, { useState, useRef, useEffect } from 'react'
import {
  Container,
  Button,
  Image,
  Menu,
  Table,
  Message,
  Sidebar,
  Segment,
  Icon,
  Sticky,
} from 'semantic-ui-react'
import { isMobile } from 'react-device-detect'
import Country from './Country'
import HeaderNav from '../components/HeaderMobile'
import countriesApiData from '../all-countries'
import regions from '../regions'
import useSortableData from '../services/sortableTable'
import './countries.css'

const COUNTRIES_HEADERS = [
  { fieldName: 'ID', id: 'id' },
  { fieldName: 'Flag', id: 'flag' },
  { fieldName: 'Name', id: 'name' },
  { fieldName: 'Capital', id: 'capital' },
  { fieldName: 'Region', id: 'region' },
  { fieldName: 'Subregion', id: 'subregion' },
  { fieldName: 'Population', id: 'population' },
  { fieldName: 'Area km²', id: 'area' },
  { fieldName: 'Gini Index', id: 'gini' },
]

/* const CountriesTable = (props) => {
  const { input, setIsLoading, setCountry, setInput, activeRegion, unit } =
    props
  const { items, requestSort } = useSortableData(props.filterBySubregion)

  const getCountryData = countriesApiData.filter((c) => {
    return c.name.toLowerCase().startsWith(input.toLowerCase())
  })

  // handle click to select a country
  const handleClick = (name) => {
    const countryData = getCountryData.filter((cd) => {
      return cd.name.toLowerCase() === name.toLowerCase()
    })
    setIsLoading(true)
    setCountry(countryData[0])
    setInput(countryData[0].name)
  }

  const marg1 = activeRegion === 'All' ? 85 : 130

  const areaLabel = unit === 'imperial' ? 'Area mi²' : 'Area km²'

  return (
    <>
      <Table
        id="Table"
        sortable
        compact
        selectable
        unstackable
        //     collapsing
        size="small"
        style={{ border: 0 }}
      >
        <Table.Header id="Table.Header" style={{ top: marg1 }}>
          <Table.Row>
            {COUNTRIES_HEADERS.map(({ fieldName, id }) =>
              fieldName !== 'ID' ? (
                id === window.localStorage.getItem('sort key') ? (
                  <Table.HeaderCell key={id} onClick={() => requestSort(id)}>
                    {fieldName === 'Area km²' ? areaLabel : fieldName}
                    {window.localStorage.getItem('direction') ===
                    'ascending' ? (
                      <Icon name="caret up" />
                    ) : (
                      <Icon name="caret down" />
                    )}
                  </Table.HeaderCell>
                ) : (
                  <Table.HeaderCell key={id} onClick={() => requestSort(id)}>
                    {fieldName === 'Area km²' ? areaLabel : fieldName}
                  </Table.HeaderCell>
                )
              ) : null
            )}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map(
            ({
              id,
              flag,
              name,
              region,
              subregion,
              capital,
              population,
              area,
              gini,
            }) => {
              const areaConvert = Math.round(area / 2.59)
              return (
                <Table.Row key={id} onClick={() => handleClick(name)}>
                  <Table.Cell
                  //width="two"
                  >
                    <Image
                      size={isMobile ? 'mini' : 'tiny'}
                      src={flag}
                      alt="country flag"
                      bordered
                    />
                  </Table.Cell>
                  <Table.Cell>{name}</Table.Cell>
                  <Table.Cell>{capital}</Table.Cell>
                  <Table.Cell>{region}</Table.Cell>
                  <Table.Cell>{subregion}</Table.Cell>
                  <Table.Cell>{population.toLocaleString()}</Table.Cell>
                  <Table.Cell>
                    {unit === 'imperial'
                      ? areaConvert.toLocaleString()
                      : area.toLocaleString()}
                  </Table.Cell>
                  <Table.Cell>{gini}</Table.Cell>
                </Table.Row>
              )
            }
          )}
        </Table.Body>
      </Table>
    </>
  )
}
 */

/*    const CountriesTable = () => (
    <Segment
      style={
        menu === false && visible === false
          ? { padding: 0, marginTop: 47 }
          : { padding: 0, marginTop: 0 }
      }
    >
      <Table selectable stackable>
        <Table.Header>
          <Table.Row>Countries</Table.Row>
        </Table.Header>
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
  ) */

const Countries = ({ countriesData }) => {
  const [input, setInput] = useState('')
  const [activeRegion, setActiveRegion] = useState('All')
  const [activeSubregion, setActiveSubregion] = useState('')
  const [region, setRegion] = useState('All')
  const [subregion, setSubRegion] = useState('')
  const [country, setCountry] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [unit, setUnit] = useState('metric')
  const [visible, setVisible] = useState(false)
  const [menu, setMenu] = useState(false)
  const [topMarg, setTopMarg] = useState(45)

  // get static lists of regions & subregions for labels on tabs
  const getSubregions = regions.filter((r) => {
    return r.region === activeRegion ? r : ''
  })

  const filteredCountries = countriesData.filter((c) => {
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
    console.log('handleClick c', c)
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

  useEffect(() => {
    if (menu === false) {
      setTopMarg(45)
    }
  }, [menu])

  // handle click of a region
  const handleRegionClick = (e, { name }) => {
    setCountry(null)
    setSubRegion('')
    setActiveSubregion('')
    setRegion(name)
    setActiveRegion(name)
    setTopMarg(132)
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
      <Message style={{ marginTop: 50, marginLeft: 20 }} compact info>
        <Message.Header>No matches, please try again.</Message.Header>
        <Button basic color="teal" onClick={reset}>
          OK
        </Button>
      </Message>
    </Container>
  )

  const contextRef = useRef()
  console.log('visible?', visible)
  console.log('menu?', menu)
  return (
    <>
      <div id="ref" ref={contextRef}>
        <Sticky id="Sticky" context={contextRef}>
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
          {filteredCountries.length === 0 ? (
            <NoMatches />
          ) : (
            <>
              {country !== null && filteredCountries.length === 1 ? (
                <Country
                  flag={filterBySubregion[0].flag}
                  reset={reset}
                  setInput={setInput}
                  setRegion={setRegion}
                  isLoading={isLoading}
                  country={getCountryData[0]}
                  location={getCountryData[0].latlng}
                  setCountry={setCountry}
                  region={region}
                  subregion={subregion}
                  setSubRegion={setSubRegion}
                  setIsLoading={setIsLoading}
                  setActiveRegion={setActiveRegion}
                  setActiveSubregion={setActiveSubregion}
                  unit={unit}
                />
              ) : (
                <></>
              )}
            </>
          )}
          {visible ? (
            <>
              <Menu
                vertical
                fluid
                size="mini"
                attached="top"
                style={{ marginTop: 0 }}
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
        </Sticky>
        <Segment attached="bottom" style={{ padding: 0, border: 0 }}>
          {country === null ? (
            <Table selectable unstackable>
              <Table.Header id="Table.Header" style={{ top: topMarg }}>
                <Table.Row>
                  <Table.HeaderCell>Flag</Table.HeaderCell>
                  <Table.HeaderCell>Country</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filterBySubregion.map((c) => {
                  return (
                    <>
                      <Table.Row key={c.id} onClick={() => handleClick(c)}>
                        <Table.Cell>
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
          ) : null}
        </Segment>
      </div>
    </>
  )
}

export default Countries
