import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Sticky,
  Segment,
  Menu,
  Table,
  Container,
  Message,
  Button,
  Icon,
  Image,
} from 'semantic-ui-react'
import HeaderNav from '../components/Header'
import Country from './Country'
import {
  resetFilter,
  filterCountries,
  filterCountriesByRegion,
  filterCountriesBySubRegion,
} from '../reducers/countryReducer'
import useSortableData from '../services/sortableTable'
import regions from '../regions'
import './countries.css'

const Countries = () => {
  // 'useState' region/subregion is only being used to identify menu active tab
  const [region, setRegion] = useState({
    id: 'FZUe47mEY9PCOzYmMxzYY',
    region: 'All',
    subregions: [],
  })

  const dispatch = useDispatch()
  const state = useSelector((state) => state)

  const unit = useSelector((state) => state.unit.unit)

  const countriesFiltered = useSelector((state) => {
    return state.countries.filtered.length > 0
      ? state.countries.filtered
      : state.countries.initialCountries
  })

  const countriesFilteredByRegion = useSelector(
    (state) => state.countries.filtered
  )

  const countriesFilteredBySubRegion = useSelector(
    (state) => state.countries.filtered
  )

  const countriesToRender =
    countriesFilteredBySubRegion.length > 0
      ? countriesFilteredBySubRegion
      : countriesFilteredByRegion.length > 0
      ? countriesFilteredByRegion
      : countriesFiltered

  const handleClick = (country) => {
    dispatch(filterCountries(country))
    const reg = regions.filter((r) => r.region === country.region)
    setRegion(reg[0])
  }

  const handleRegionClick = (reg) => {
    dispatch(filterCountriesByRegion(reg.region))
    setRegion(reg)
    if (reg.region === 'All') {
      window.localStorage.clear()
    }
  }

  const handleSubregionClick = (sub) => {
    dispatch(filterCountriesBySubRegion(sub))
  }

  const reset = () => {
    dispatch(resetFilter())
  }

  const contextRef = useRef()

  const tableHeaders = [
    { fieldName: 'CCA3', id: 'cca3' },
    { fieldName: 'Flag', id: 'flag' },
    { fieldName: 'Name', id: 'name' },
    { fieldName: 'Capital', id: 'capital' },
    { fieldName: 'Region', id: 'region' },
    { fieldName: 'Subregion', id: 'subregion' },
    { fieldName: 'Population', id: 'population' },
    { fieldName: 'Area km²', id: 'area' },
  ]

  const { items, requestSort } = useSortableData(countriesToRender)

  const sortIcons = (id) => {
    if (
      window.localStorage.getItem('direction') === 'ascending' &&
      window.localStorage.getItem('sort key') === id
    ) {
      return <Icon name="caret up" />
    } else if (
      window.localStorage.getItem('direction') === 'descending' &&
      window.localStorage.getItem('sort key') === id
    ) {
      return <Icon name="caret down" />
    }
  }

  return (
    <div id="ref" ref={contextRef}>
      <Sticky id="Sticky" context={contextRef}>
        <HeaderNav />
        {countriesToRender.length === 0 ? (
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
              <>
                <Menu
                  attached
                  tabular
                  widths={7}
                  style={{ border: 0, backgroundColor: '#fff' }}
                >
                  {regions.map((r) => (
                    <Menu.Item
                      key={r.id}
                      active={
                        state.countries.filter.region.toLowerCase() ===
                        r.region.toLowerCase()
                      }
                      onClick={() => handleRegionClick(r)}
                    >
                      {r.region === 'All' ? 'All Regions' : r.region}
                    </Menu.Item>
                  ))}
                </Menu>
                {state.countries.filter.region.toLowerCase() !== 'all' ? (
                  <>
                    <Menu
                      widths={region.subregions.length}
                      attached
                      tabular
                      style={{ backgroundColor: '#fff' }}
                    >
                      {region.subregions.map((s, i) => (
                        <Menu.Item
                          key={i}
                          active={
                            state.countries.filter.subregion.toLowerCase() ===
                            s.toLowerCase()
                          }
                          onClick={() => handleSubregionClick(s)}
                        >
                          {s}
                        </Menu.Item>
                      ))}
                    </Menu>
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </>
        )}
      </Sticky>
      <Segment attached="bottom" style={{ padding: 0, border: 0 }}>
        {countriesToRender.length > 1 ? (
          <>
            <Table
              sortable
              compact
              selectable
              unstackable
              size="small"
              style={{ border: 0 }}
            >
              <Table.Header
                style={
                  state.countries.filter.region.toLowerCase() === 'all'
                    ? { top: 90 }
                    : { top: 132 }
                }
              >
                <Table.Row>
                  <>
                    {tableHeaders.map(({ fieldName, id }) => (
                      <Table.HeaderCell
                        key={id}
                        onClick={() => requestSort(id)}
                      >
                        {fieldName === 'Area km²'
                          ? unit === 'metric'
                            ? fieldName
                            : 'Area mi²'
                          : fieldName}
                        {sortIcons(id)}
                      </Table.HeaderCell>
                    ))}
                  </>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <>
                  {items.map((item) => {
                    const areaConvert = Math.round(item.area / 2.59)
                    return (
                      <Table.Row
                        key={item.cca3}
                        onClick={() => handleClick(item)}
                      >
                        <Table.Cell>{item.cca3}</Table.Cell>
                        <Table.Cell>
                          <Image
                            style={{ position: 'static' }}
                            size="tiny"
                            src={item.flags.svg}
                            alt="country flag"
                            bordered
                          />
                        </Table.Cell>
                        <Table.Cell>{item.name.common}</Table.Cell>
                        <Table.Cell>
                          {item.capital === undefined
                            ? 'no data'
                            : item.capital}
                        </Table.Cell>
                        <Table.Cell>{item.region}</Table.Cell>
                        <Table.Cell>{item.subregion}</Table.Cell>
                        <Table.Cell>
                          {item.population.toLocaleString()}
                        </Table.Cell>
                        <Table.Cell>
                          {unit === 'imperial'
                            ? areaConvert.toLocaleString()
                            : item.area.toLocaleString()}
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </>
              </Table.Body>
            </Table>
          </>
        ) : null}
      </Segment>
    </div>
  )
}

export default Countries
