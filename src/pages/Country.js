import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Menu, Image, Card, Breadcrumb } from 'semantic-ui-react'
import { getWeather } from '../reducers/weatherReducer'
import { getTimeZone } from '../reducers/timeZoneReducer'
import {
  resetFilter,
  filterCountriesByRegion,
  filterCountriesBySubRegion,
} from '../reducers/countryReducer'

import Map from './Map'
import Weather from '../components/Weather'
import zoomLevel from '../zoomLevels'
import './countries.css'

const Country = ({ data }) => {
  const [activeTab, setActiveTab] = useState('Flag')

  const dispatch = useDispatch()

  const unit = useSelector((state) => state.unit.unit)

  const location =
    data.capitalInfo.latlng === undefined
      ? data.latlng
      : data.capitalInfo.latlng

  useEffect(() => {
    dispatch(
      getWeather({
        location: location,
        unit: unit,
      })
    )
    dispatch(getTimeZone({ location: location }))
  }, [unit])

  const handleTabClick = (e, { name }) => {
    setActiveTab(name)
  }

  return (
    <>
      <Menu attached secondary style={{ margin: 0 }}>
        <Breadcrumb size="small" style={{ marginLeft: 10, paddingTop: 4 }}>
          <Breadcrumb.Section
            key="All"
            style={{ cursor: 'pointer' }}
            link
            onClick={() => dispatch(resetFilter())}
          >
            All
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section
            key={data.region}
            style={{ cursor: 'pointer' }}
            link
            onClick={() => dispatch(filterCountriesByRegion(data.region))}
          >
            {data.region}
          </Breadcrumb.Section>
          {data.subregion !== '' ? (
            <>
              <Breadcrumb.Divider icon="right chevron" />
              <Breadcrumb.Section
                key={data.subregion}
                style={{ cursor: 'pointer' }}
                link
                onClick={() =>
                  dispatch(filterCountriesBySubRegion(data.subregion))
                }
              >
                {data.subregion}
              </Breadcrumb.Section>
              <Breadcrumb.Divider icon="right chevron" />
              <Breadcrumb.Section key={data.name.common} active>
                {data.name.common}
              </Breadcrumb.Section>
            </>
          ) : (
            <></>
          )}
        </Breadcrumb>
      </Menu>
      <Menu attached pointing secondary style={{ margin: 0 }}>
        <Menu.Item
          name="Flag"
          active={activeTab === 'Flag'}
          onClick={handleTabClick}
        />{' '}
        <Menu.Item
          name="CoatOfArms"
          active={activeTab === 'CoatOfArms'}
          onClick={handleTabClick}
        />
        <Menu.Item
          name="Map"
          active={activeTab === 'Map'}
          onClick={handleTabClick}
        />
        <Menu.Item
          name="Weather"
          active={activeTab === 'Weather'}
          onClick={handleTabClick}
        />
      </Menu>
      {activeTab === 'Flag' ? (
        <Image
          src={data.flags.svg}
          alt="country flag"
          //    size="large"
          fluid
          bordered
        />
      ) : (
        <></>
      )}
      {activeTab === 'CoatOfArms' ? (
        <>
          <Card>
            {Object.entries(data.coatOfArms).length === 0 ? (
              <div>No image available</div>
            ) : (
              <Image
                src={data.coatOfArms.svg}
                alt="coat of arms"
                // size="large"
                bordered
                fluid
              />
            )}
          </Card>
        </>
      ) : (
        <></>
      )}
      {activeTab === 'Map' ? (
        <>
          <Map lt={data.latlng[0]} lg={data.latlng[1]} zm={zoomLevel(data)} />
        </>
      ) : (
        <></>
      )}
      {activeTab === 'Weather' ? (
        <>
          <Card fluid style={{ margin: 0 }}>
            <Weather country={data} />
          </Card>
          {/*  {!isWeatherLoading && !isLoading ? (
            <Card fluid style={{ margin: 0 }}>
              <Weather
                weather={weather}
                unit={unit}
                activeTab={activeTab}
                country={data}
                timeDate={timeDate}
              />
            </Card>
          ) : (
            <Icon id="weather" loading name="spinner" />
          )} */}
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default Country
