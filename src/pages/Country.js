import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isIE } from 'react-device-detect'
import { Menu, Image, Card, Breadcrumb, Segment } from 'semantic-ui-react'
import { getWeather } from '../reducers/weatherReducer'
import { getTimeZone } from '../reducers/timeZoneReducer'
import {
  resetFilter,
  filterCountriesByRegion,
  filterCountriesBySubRegion,
} from '../reducers/countryReducer'
import zoomLevel from '../zoomLevels'
import loadable from '@loadable/component'

const Map = loadable(() => import('./Map'))
const Weather = loadable(() => import('../components/Weather'))

const Country1 = ({ data }) => {
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
      <Menu attached secondary>
        <Breadcrumb size="small">
          <Breadcrumb.Section
            key="All"
            link
            onClick={() => dispatch(resetFilter())}
          >
            All
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section
            key={data.region}
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
      <Menu attached pointing secondary>
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
          id="flag"
          centered
          src={isIE ? data.flags.png : data.flags.svg}
          alt="country flag"
          size="medium"
          bordered
        />
      ) : (
        <></>
      )}
      {activeTab === 'CoatOfArms' ? (
        <>
          <Segment>
            {Object.entries(data.coatOfArms).length === 0 ? (
              <div>No image available</div>
            ) : (
              <Image
                id="coatOfArms"
                centered
                src={data.coatOfArms.svg}
                alt="coat of arms"
                size="medium"
                bordered
              />
            )}
          </Segment>
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
          <Card fluid>
            <Weather country={data} />
          </Card>
          {/*  {!isWeatherLoading && !isLoading ? (
            <Card fluid>
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

const Country = React.memo(Country1)

export default Country
