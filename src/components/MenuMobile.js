import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Menu} from 'semantic-ui-react'
import { toggleUnit } from '../reducers/countryReducer'

import {
  filterCountriesByRegion,
  filterCountriesBySubRegion,
  resetFilter,
} from '../reducers/countryReducer'
import regions from '../regions'

const CountriesMenuMobile = () => {
  const [region, setRegion] = useState({
    id: 'FZUe47mEY9PCOzYmMxzYY',
    region: 'All',
    subregions: [],
  })

  const dispatch = useDispatch()
  const state = useSelector((state) => state)

  const handleRegionClick = (reg) => {
    dispatch(filterCountriesByRegion(reg.region))
    setRegion(reg)
  }

  const handleSubregionClick = (sub) => {
    dispatch(filterCountriesBySubRegion(sub))
  }

  return (
    <>
      {/* Regions */}
      <Menu attached vertical fluid>
        <>
          {state.countries.filter.region.toLowerCase() === 'all' ? (
            <>
              {regions.map((r) => (
                <Menu.Item
                  header={r.region === 'All' ? true : false}
                  key={r.id}
                  active={
                    state.countries.filter.region.toLowerCase() ===
                    r.region.toLowerCase()
                  }
                  onClick={() => handleRegionClick(r)}
                >
                  {r.region === 'All' ? 'Filter By Region/Subregion' : r.region}
                </Menu.Item>
              ))}
            </>
          ) : (
            <>
              <Menu.Item
                active={state.countries.filter.region.toLowerCase() === 'all'}
                onClick={() => dispatch(resetFilter())}
              >
                All Regions
              </Menu.Item>
              {regions.map((r) => {
                if (r.region.toLowerCase() === state.countries.filter.region) {
                  return (
                    <Menu.Item key={r.id} onClick={() => handleRegionClick(r)}>
                      {r.region}
                    </Menu.Item>
                  )
                }
              })}
            </>
          )}
          {state.countries.filter.region.toLowerCase() === 'all' ? null : (
            <>
              <Menu.Menu>
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
              </Menu.Menu>
            </>
          )}
        </>
      </Menu>
    </>
  )
}

export default CountriesMenuMobile
