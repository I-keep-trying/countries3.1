import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Sticky, Menu } from 'semantic-ui-react'
import loadable from '@loadable/component'
import {
  filterCountriesByRegion,
  filterCountriesBySubRegion,
} from '../reducers/countryReducer'
import regions from '../regions'
import '../App1.css'
const HeaderNav = loadable(() => import('../components/Header'))
const Country = loadable(() => import('./Country'))
const CountriesTable = loadable(() => import('../components/Table'))

const Countries1 = () => {
  // 'useState' region/subregion is only being used to identify menu active tab
  const [region, setRegion] = useState({
    id: 'FZUe47mEY9PCOzYmMxzYY',
    region: 'All',
    subregions: [],
  })

  const dispatch = useDispatch()
  const state = useSelector((state) => state)

  const countriesFiltered = useSelector((state) => {
    return state.countries.filtered.length > 0
      ? state.countries.filtered
      : state.countries.initialCountries
  })

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

  const contextRef = useRef()

  return (
    <div id="ref" ref={contextRef}>
      <Sticky id="Sticky" context={contextRef}>
        <HeaderNav />
        {countriesFiltered.length === 1 ? (
          <Country data={countriesFiltered[0]} />
        ) : (
          <>
            <Menu
              attached="top"
              tabular
              widths={7}
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
      </Sticky>
      <CountriesTable />
    </div>
  )
}

export default Countries1
