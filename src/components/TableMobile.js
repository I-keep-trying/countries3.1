import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment, Table, Icon, Image, Grid, Button } from 'semantic-ui-react'
import { isIE } from 'react-device-detect'
import { nanoid } from 'nanoid'
import { filterCountries } from '../reducers/countryReducer'
import useSortableData from '../services/sortableTable'
import regions from '../regions'
import '../App1.css'

const CountriesTableMobile = () => {
  const [, setRegion] = useState({
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
    <Segment attached="bottom">
      {countriesToRender.length > 1 ? (
        <>
          <Table sortable compact selectable unstackable>
            <Table.Header
              style={{
                top:
                  state.countries.filter.region.toLowerCase() === 'all'
                    ? 53
                    : 146,
              }}
            ></Table.Header>
          </Table>
          <Grid celled style={{ marginTop: -20 }}>
            {items.map((item) => {
              const areaConvert = Math.round(item.area / 2.59)
              return (
                <React.Fragment key={nanoid()}>
                  <Grid.Row textAlign="center" color="black">
                    <Grid.Column width={16}>
                      <Button
                        labelPosition="right"
                        icon="right chevron"
                        basic
                        color="yellow"
                        fluid
                        content={item.name.common}
                        onClick={() => handleClick(item)}
                      ></Button>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={4}>CCA3</Grid.Column>
                    <Grid.Column width={12}>{item.cca3}</Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={4}>Flag</Grid.Column>
                    <Grid.Column width={12}>
                      <Image
                        size="small"
                        src={isIE ? item.flags.png : item.flags.svg}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={4}>Capital</Grid.Column>
                    <Grid.Column width={12}>{item.capital}</Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={4}>Region</Grid.Column>
                    <Grid.Column width={12}>{item.region}</Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={4}>Subregion</Grid.Column>
                    <Grid.Column width={12}>{item.subregion}</Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={4}>Population</Grid.Column>
                    <Grid.Column width={12}>
                      {item.population.toLocaleString()}
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={4}>
                      {unit === 'metric' ? 'Area km²' : 'Area mi²'}
                    </Grid.Column>
                    <Grid.Column width={12}>
                      {unit === 'imperial'
                        ? areaConvert.toLocaleString()
                        : item.area.toLocaleString()}
                    </Grid.Column>
                  </Grid.Row>
                </React.Fragment>
              )
            })}
          </Grid>
        </>
      ) : null}
    </Segment>
  )
}

export default CountriesTableMobile
