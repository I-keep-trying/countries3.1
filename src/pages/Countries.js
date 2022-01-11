import _ from 'lodash'
import React, { useState, useReducer } from 'react'
import {
  Container,
  Button,
  Image,
  Menu,
  Grid,
  Table,
  Message,
} from 'semantic-ui-react'
import Country from './Country'
import HeaderNav from '../components/Header'
import countriesApiData from '../all-countries'
import countriesBasicInfo from '../countriesList2'
import regions from '../regions'
import { nanoid } from 'nanoid'

const Countries = () => {
  const [input, setInput] = useState('')
  const [activeRegion, setActiveRegion] = useState('All')
  const [activeSubregion, setActiveSubregion] = useState('')
  const [region, setRegion] = useState('All')
  const [subregion, setSubRegion] = useState('')
  const [, setCountry] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const flags = (c) =>
    countriesBasicInfo.filter((f) => (f.name === c ? f.flag : null))

  const countriesData2 = countriesApiData.map((c) => {
    return {
      id: nanoid(),
      name: c.name,
      capital: c.capital,
      region: c.region,
      subregion: c.subregion,
      population: c.population,
      area: c.area,
      flag: flags(c.name)[0].flag,
    }
  })

  //  console.log('countriesData2', countriesData2[0])
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

  // handle click of "Details" button
  const handleClick = (name) => {
    // pass full country details from api data
    const countryData = getCountryData.filter((cd) => {
      return cd.name.toLowerCase().startsWith(name.toLowerCase())
    })
    // console.log('handleClick:name', name)
    // console.log('countryData', getCountryData)
    setIsLoading(true)
    // setCountry(countryData[0].name)
    setInput(name)
  }

  // handle click of a region tab
  const handleRegionClick = (e, { name }) => {
    setCountry(null)
    setSubRegion('')
    setActiveSubregion('')
    setRegion(name)
    setActiveRegion(name)
  }

  // handle click of a subregion tab
  const handleSubregionClick = (e, { name }) => {
    setCountry(null)
    setSubRegion(name)
    setActiveSubregion(name)
  }

  // when input returns no match
  const reset = () => {
    setCountry(null)
    setInput('')
    setRegion('All')
    setActiveRegion('All')
    setSubRegion('')
    setActiveSubregion('')
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

  const marg1 = activeRegion === 'All' ? 14 : 38

  // reducer for table sort functionality

  function tableReducer(state, action) {
    switch (action.type) {
      case 'CHANGE_SORT':
        if (state.column === action.column) {
          return {
            ...state,
            data: state.data.slice().reverse(),
            direction:
              state.direction === 'ascending' ? 'descending' : 'ascending',
          }
        }
        return {
          column: action.column,
          data: _.sortBy(state.data, [action.column]),
          direction: 'ascending',
        }
      default:
        throw new Error()
    }
  }

  const CountriesTable = () => {
    const [state, dispatch] = useReducer(tableReducer, {
      column: null,
      data: filterBySubregion,
      direction: null,
    })

    const { column, data, direction } = state

    return (
      <>
        <Table
          sortable
          compact
          // style={{ marginTop: 45 }}
          style={{ marginTop: marg1 }}
          selectable
          stackable
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === 'flag' ? direction : null}
                onClick={() =>
                  dispatch({ type: 'CHANGE_SORT', column: 'flag' })
                }
              >
                Flag
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'name' ? direction : null}
                onClick={() =>
                  dispatch({ type: 'CHANGE_SORT', column: 'name' })
                }
              >
                Country
              </Table.HeaderCell>

              <Table.HeaderCell
                sorted={column === 'region' ? direction : null}
                onClick={() =>
                  dispatch({ type: 'CHANGE_SORT', column: 'region' })
                }
              >
                Region
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'subregion' ? direction : null}
                onClick={() =>
                  dispatch({ type: 'CHANGE_SORT', column: 'subregion' })
                }
              >
                Subregion
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'capital' ? direction : null}
                onClick={() =>
                  dispatch({ type: 'CHANGE_SORT', column: 'capital' })
                }
              >
                Capital
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'population' ? direction : null}
                onClick={() =>
                  dispatch({ type: 'CHANGE_SORT', column: 'population' })
                }
              >
                Population
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map(
              ({ id, flag, name, region, subregion, capital, population }) => {
                //  console.log('name', name)
                return (
                  <Table.Row key={id} onClick={() => handleClick(name)}>
                    <Table.Cell width="two">
                      <Image
                        size="tiny"
                        src={flag}
                        alt="country flag"
                        bordered
                      />
                    </Table.Cell>
                    <Table.Cell>{name}</Table.Cell>
                    <Table.Cell>{region}</Table.Cell>
                    <Table.Cell>{subregion}</Table.Cell>
                    <Table.Cell>{capital}</Table.Cell>
                    <Table.Cell>{population.toLocaleString()}</Table.Cell>
                  </Table.Row>
                )
              }
            )}
          </Table.Body>
        </Table>
      </>
    )
  }
  return (
    <>
      <HeaderNav
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
          <Container
            style={
              filterBySubregion.length < 250
                ? { marginTop: 86 }
                : { marginTop: 95 }
            }
            fluid
          >
            <Grid style={{ marginTop: -6 }}>
              {getSubregions[0].subregions.length > 0 ? (
                <>
                  <Grid.Row>
                    <Menu
                      stackable
                      size="large"
                      fixed="top"
                      style={{ marginTop: 45 }}
                      widths={7}
                    >
                      {regions.map((r) => {
                        return r.region === 'All' ? (
                          <Menu.Item
                            key={r.id}
                            // name={r.region}
                            active={activeRegion === r.region}
                            onClick={reset}
                          >
                            All Regions{' '}
                          </Menu.Item>
                        ) : (
                          <Menu.Item
                            key={r.id}
                            name={r.region}
                            active={activeRegion === r.region}
                            onClick={handleRegionClick}
                          />
                        )
                      })}
                    </Menu>
                    <Menu
                      stackable
                      size="large"
                      fixed="top"
                      style={{ marginTop: 89 }}
                      widths={getSubregions[0].subregions.length}
                    >
                      {getSubregions[0].subregions.map((rs) => (
                        <Menu.Item
                          key={rs}
                          name={rs}
                          active={activeSubregion === rs}
                          onClick={handleSubregionClick}
                        />
                      ))}
                    </Menu>
                  </Grid.Row>
                </>
              ) : (
                <>
                  <Grid.Row style={{ margin: 0, padding: 0 }}>
                    <Menu
                      stackable
                      size="large"
                      fixed="top"
                      style={{ marginTop: 45 }}
                      widths={7}
                    >
                      {regions.map((r) => {
                        return r.region === 'All' ? (
                          <Menu.Item
                            key={r.id}
                            // name={r.region}
                            active={activeRegion === r.region}
                            onClick={reset}
                          >
                            All Regions{' '}
                          </Menu.Item>
                        ) : (
                          <Menu.Item
                            key={r.id}
                            name={r.region}
                            active={activeRegion === r.region}
                            onClick={handleRegionClick}
                          />
                        )
                      })}
                    </Menu>
                  </Grid.Row>
                </>
              )}
            </Grid>
            {filterBySubregion.length === 0 ? (
              <NoMatches />
            ) : (
              <CountriesTable />
            )}
          </Container>
        </>
      )}
    </>
  )
}

export default Countries
