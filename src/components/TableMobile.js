import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment, Table, Icon, Image, Grid, Button } from 'semantic-ui-react'
import { isIE } from 'react-device-detect'
import { nanoid } from 'nanoid'
import { filterCountries } from '../reducers/countryReducer'
import useSortableData from '../services/sortableTable'
import regions from '../regions'
import continents from '../continents'
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

  const handleClick = (country) => {
    dispatch(filterCountries(country))
    const reg = regions.filter((r) => r.region === country.region)
    setRegion(reg[0])
  }

  const { items } = useSortableData(countriesFiltered)

  return (
    <Segment attached="bottom">
      {countriesFiltered.length > 1 ? (
        <>
          <Table sortable compact selectable unstackable>
            <Table.Header
              id={
                state.countries.filter.region.toLowerCase() === 'all'
                  ? 'oneM'
                  : 'twoM'
              }
            ></Table.Header>
          </Table>
          <Grid celled id="grid-mobile">
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
                    <Grid.Column width={4}>Continent</Grid.Column>
                    <Grid.Column width={12}>{item.continents[0]}</Grid.Column>
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
