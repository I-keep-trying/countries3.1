import React, { useState, useRef } from 'react'
import {
  Container,
  Button,
  Image,
  Menu,
  Table,
  Message,
  Segment,
  Icon,
  Sticky,
} from 'semantic-ui-react'
import Country from './Country'
import HeaderNav from '../components/Header'
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
]

const CountriesTable = (props) => {
  const {
    country,
    input,
    setIsLoading,
    setCountry,
    setInput,
    activeRegion,
    unit,
  } = props
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
  console.log('country? ', country)
  return (
    <>
      <Table id="Table" sortable compact selectable stackable>
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
            }) => {
              const areaConvert = Math.round(area / 2.59)
              return (
                <Table.Row key={id} onClick={() => handleClick(name)}>
                  <Table.Cell width="two">
                    <Image size="tiny" src={flag} alt="country flag" bordered />
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
                </Table.Row>
              )
            }
          )}
        </Table.Body>
      </Table>
    </>
  )
}

const Countries = ({ countriesData }) => {
  const [input, setInput] = useState('')
  const [activeRegion, setActiveRegion] = useState('All')
  const [activeSubregion, setActiveSubregion] = useState('')
  const [region, setRegion] = useState('All')
  const [subregion, setSubRegion] = useState('')
  const [country, setCountry] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [unit, setUnit] = useState('metric')

  /*
  Keep this for re-building country basic data (local) if needed
     const countriesData2 = countriesList.map((c) => {
    return {
      id: nanoid(),
      name: c.name,
      capital: c.capital,
      region: c.region,
      subregion: c.subregion,
      population: c.population,
      area: c.area, // some areas have been manually updated in local data
      flag:c.flag,
    }
  }) */

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

  const handleUnitButtonClick = () => {
    console.log('unit button clicked')
    if (unit === 'metric') {
      setUnit('imperial')
      return true
    }
    setUnit('metric')
    return false
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

  const contextRef = useRef()

  console.log('filterBySubregion', filterBySubregion.length)

  return (
    <div id="ref" ref={contextRef}>
      <Sticky id="Sticky" context={contextRef}>
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
          handleUnitButtonClick={handleUnitButtonClick}
          unit={unit}
          setUnit={setUnit}
        />
        {country !== null ? (
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
          <>
            <Menu
              id="Regions menu"
              stackable
              size="large"
              widths={7}
              style={{ margin: 0, border: 0 }}
            >
              {regions.map((r) => {
                return r.region === 'All' ? (
                  <Menu.Item
                    key={r.id}
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
            {getSubregions[0].subregions.length > 0 ? (
              <Menu
                id="Subregions menu"
                stackable
                size="large"
                widths={getSubregions[0].subregions.length}
                style={{ margin: 0, border: 0 }}
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
            ) : (
              <></>
            )}
          </>
        )}
      </Sticky>
      <Segment
        id="Segment with Table"
        attached="bottom"
        style={{ padding: 0, border: 0 }}
      >
        {filterBySubregion.length === 0 ? (
          <NoMatches />
        ) : filterBySubregion.length === 1 ? (
          <></>
        ) : (
          <>
            <CountriesTable
              country={country}
              input={input}
              setIsLoading={setIsLoading}
              setCountry={setCountry}
              setInput={setInput}
              activeRegion={activeRegion}
              filterBySubregion={filterBySubregion}
              unit={unit}
            />
          </>
        )}
      </Segment>
    </div>
  )
}

export default Countries
