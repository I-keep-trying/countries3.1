import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isIE } from 'react-device-detect'
import { Segment, Table, Icon, Image } from 'semantic-ui-react'
import { filterCountries } from '../reducers/countryReducer'
import useSortableData from '../services/sortableTable'

const CountriesTable1 = () => {
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
  }

  const tableHeaders = [
    { fieldName: 'CCA3', id: 'cca3' },
    { fieldName: 'Flag', id: 'flag' },
    { fieldName: 'Name', id: 'name' },
    { fieldName: 'Capital', id: 'capital' },
    { fieldName: 'Continent', id: 'continents' },
    { fieldName: 'Region', id: 'region' },
    { fieldName: 'Subregion', id: 'subregion' },
    { fieldName: 'Population', id: 'population' },
    { fieldName: 'Area km²', id: 'area' },
  ]

  const { items, requestSort } = useSortableData(countriesFiltered)

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
      {countriesFiltered.length > 1 ? (
        <>
          <Table sortable compact selectable unstackable size="small">
            <Table.Header
              id={
                state.countries.filter.region.toLowerCase() === 'all'
                  ? 'one'
                  : 'two'
              }
            >
              <Table.Row>
                <>
                  {tableHeaders.map(({ fieldName, id }) => (
                    <Table.HeaderCell key={id} onClick={() => requestSort(id)}>
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
                      <Table.Cell textAlign="center">{item.cca3}</Table.Cell>
                      <Table.Cell>
                        <Image
                          srcSet={`${item.flags.svg} 100w`}
                          size="tiny"
                          src={isIE ? item.flags.png : item.flags.svg}
                          alt="country flag"
                          bordered
                          loading="lazy"
                        />
                      </Table.Cell>
                      <Table.Cell>{item.name.common}</Table.Cell>
                      <Table.Cell>
                        {item.capital === undefined ? 'no data' : item.capital}
                      </Table.Cell>
                      <Table.Cell>{item.continents[0]}</Table.Cell>
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
  )
}

const CountriesTable = React.memo(CountriesTable1)

export default CountriesTable
