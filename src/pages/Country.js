import React, { useState, useEffect, useMemo } from 'react'
import {
  Menu,
  Container,
  Icon,
  Image,
  Button,
  Card,
  Breadcrumb,
} from 'semantic-ui-react'
import axios from 'axios'
import Weather from '../components/Weather'
import Map from './Map'
import timeZones from '../timeZones'
import countriesApiData from '../all-countries'
import '../assets/css/owm-right.css'

const Country = ({
  flag,
  country,
  location,
  setCountry,
  region,
  subregion,
  isLoading,
  setInput,
  setRegion,
  setSubRegion,
  setIsLoading,
  setActiveRegion,
  setActiveSubregion,
  reset,
  unit,
}) => {
  const [weather, setWeather] = useState({})
  const [activeTab, setActiveTab] = useState('Weather')
  const [isWeatherLoading, setIsWeatherLoading] = useState(true)
  const [zoom, setZoom] = useState(0)
  const [timeZone, setTimeZone] = useState('Asia/Jakarta')
  const [timeDate, setTimeDate] = useState('time zone error')

  /* ------------------- get weather data from api------------------------ */
  useEffect(() => {
    if (Object.entries(location).length > 0) {
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${location[0]}&lon=${location[1]}&exclude=minutely,hourly&appid=${process.env.REACT_APP_OPENWEATHER_KEY}&units=${unit}`

      if (
        unit === 'metric' &&
        window.localStorage.getItem(`${country.name} weather in metric`) !==
          null
      ) {
        setIsWeatherLoading(true)
        setWeather(
          JSON.parse(
            window.localStorage.getItem(`${country.name} weather in metric`)
          )
        )
        setIsWeatherLoading(false)
        setIsLoading(false)

        setTimeout(() => {
          window.localStorage.removeItem(`${country.name} weather in metric`)
        }, 10000)
      } else if (
        unit === 'imperial' &&
        window.localStorage.getItem(`${country.name} weather in imperial`) !==
          null
      ) {
        setWeather(
          JSON.parse(
            window.localStorage.getItem(`${country.name} weather in imperial`)
          )
        )
        setIsWeatherLoading(false)
        setIsLoading(false)
        setTimeout(() => {
          window.localStorage.removeItem(`${country.name} weather in imperial`)
        }, 10000)
      } else {
        axios.get(url).then((response) => {
          setWeather(response.data)
          setIsWeatherLoading(false)
          setIsLoading(false)
          window.localStorage.setItem(
            `${country.name} weather in ${unit}`,
            JSON.stringify(response.data)
          )
        })
      }
    }
  }, [location, unit])

  useMemo(() => {
    const url = `http://api.timezonedb.com/v2.1/get-time-zone?key=${process.env.REACT_APP_TIMEZONE} &format=json&by=position&lat=${location[0]}&lng=${location[1]}`
    axios.get(url).then((response) => {
      setTimeZone(response.data.zoneName)
    })
  })

  useMemo(() => {
    const d = new Date()
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: timeZone,
      timeZoneName: 'short',
    }
    setTimeDate(d.toLocaleString(window.navigator.language, options))
  }, [timeZone])
  
  /* --------------------time/date format options--------------------- */
  /*   const intlDate = new Intl.DateTimeFormat('en', {
    timeZone: timeZone, // ex: Asia/Jakarta
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    second: '2-digit',
    timeZoneName: 'short',
  }).format(new Date())
  console.log('intlDate', intlDate) // Thursday, 01/27/2022, 22:53:27 GMT+7
 */

  /* --------------------initial zoom levels--------------------------- */
  // determine initial zoom level based on country size/area
  const zoomLevel = () => {
    switch (true) {
      case country.name === 'Antarctica':
        setZoom(2)
        break
      case country.name === 'British Indian Ocean Territory':
        setZoom(4)
        break
      case country.name === 'French Guiana' ||
        country.name === 'Switzerland' ||
        country.name === 'Congo' ||
        country.name === 'Spain' ||
        country.name === 'Central African Republic' ||
        country.name === 'France':
        setZoom(5)
        break
      case country.name === 'Oman' ||
        country.capital === 'Yamoussoukro' ||
        country.name === 'Germany' ||
        country.name === 'Indonesia' ||
        country.name === 'Congo (Democratic Republic of the)':
        setZoom(5.5)
        break
      case country.name === 'Mozambique':
        setZoom(6)
        break
      case country.name === 'Palestine, State of' ||
        country.name === 'Dominican Republic' ||
        country.name === 'Croatia' ||
        country.name === 'Togo' ||
        country.name === 'Azerbaijan' ||
        country.name === 'Serbia' ||
        country.name === 'Jordan' ||
        country.name === 'Honduras' ||
        country.name === 'Nicaragua' ||
        country.name === 'Suriname':
        setZoom(6.5)
        break
      case country.name === 'Bonaire, Sint Eustatius and Saba' ||
        country.name === 'Virgin Islands (U.S.)' ||
        country.name === 'Barbados' ||
        country.name === 'Saint Lucia' ||
        country.name === 'Montenegro' ||
        country.name === 'Saint Helena, Ascension and Tristan da Cunha':
        setZoom(7)
        break
      case country.name === 'Pitcairn' ||
        country.name === 'Mayotte' ||
        country.name === 'Martinique' ||
        country.name === 'Guadeloupe' ||
        country.name === 'Bahrain' ||
        country.name === 'Réunion' ||
        country.name === 'South Georgia and the South Sandwich Islands':
        setZoom(7.5)
        break
      case country.name === 'Antigua and Barbuda' ||
        country.name === 'Åland Islands':
        setZoom(8)
        break
      case country.name === 'Curaçao' || country.name === 'Isle of Man':
        setZoom(9)
        break
      case country.name === 'Guernsey' ||
        country.name === 'Jersey' ||
        country.name === 'Saint Barthélemy':
        setZoom(10)
        break
      case country.name === 'Cocos (Keeling) Islands':
        setZoom(12)
        break
      case country.name === 'Nauru' || country.name === 'Tuvalu':
        setZoom(13)
        break
      case country.area < 1:
        setZoom(14)
        break
      case country.area > 2 && country.area < 5.9:
        setZoom(13)
        break
      case country.area > 5.9 && country.area < 52:
        setZoom(12)
        break
      case country.area > 52 && country.area < 55:
        setZoom(10.5)
        break
      case country.area > 55 && country.area < 179:
        setZoom(7)
        break
      case country.area > 179 && country.area < 40000:
        setZoom(6)
        break
      case country.area > 40000 && country.area < 270000:
        setZoom(5)
        break
      case country.area > 270000 && country.area < 9629092:
        setZoom(4)
        break
      case country.area > 9640010 && country.area < 10000000:
        setZoom(3)
        break
      default:
        setZoom(0)
        break
    }
  }

  /* ---------------------set zoom level--------------------------------- */
  // set zoom level
  useEffect(() => {
    zoomLevel()
  }, [country])

  const handleItemClick = (e, { name }) => {
    setActiveTab(name)
  }

  const regionLink = () => {
    setCountry(null)
    setInput('')
    setSubRegion('')
    setActiveSubregion('')
    setRegion(region)
    setActiveRegion(region)
  }

  const subregionLink = () => {
    setCountry(null)
    setInput('')
    setRegion(region)
    setActiveRegion(region)
    setSubRegion(subregion)
    setActiveSubregion(subregion)
  }

  return !isLoading ? (
    <>
      <Menu secondary style={{ margin: 0 }}>
        <Breadcrumb size="small" style={{ marginLeft: 10, paddingTop: 4 }}>
          <Breadcrumb.Section
            key="All"
            style={{ cursor: 'pointer' }}
            link
            onClick={reset}
          >
            All
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section
            key={country.region}
            style={{ cursor: 'pointer' }}
            link
            onClick={regionLink}
          >
            {country.region}
          </Breadcrumb.Section>
          {country.subregion !== '' ? (
            <>
              <Breadcrumb.Divider icon="right chevron" />
              <Breadcrumb.Section
                key={country.subregion}
                style={{ cursor: 'pointer' }}
                link
                onClick={subregionLink}
              >
                {country.subregion}
              </Breadcrumb.Section>
            </>
          ) : (
            <></>
          )}
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section key={country.name} active>
            {country.name}
          </Breadcrumb.Section>
        </Breadcrumb>
      </Menu>
      <Menu pointing secondary style={{ margin: 0 }}>
        <Menu.Item
          name="Flag"
          active={activeTab === 'Flag'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="Map"
          active={activeTab === 'Map'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="Weather"
          active={activeTab === 'Weather'}
          onClick={handleItemClick}
        />
      </Menu>
      {activeTab === 'Flag' ? (
        <Image src={flag} alt="country flag" size="large" bordered />
      ) : (
        <></>
      )}
      {activeTab === 'Map' ? (
        <>
          <Map lt={country.latlng[0]} lg={country.latlng[1]} zm={zoom} />
        </>
      ) : (
        <></>
      )}
      {activeTab === 'Weather' ? (
        <>
          {!isWeatherLoading && !isLoading ? (
            <Card fluid style={{ margin: 0 }}>
              <Weather
                weather={weather}
                unit={unit}
                activeTab={activeTab}
                country={country}
                timeDate={timeDate}
              />
            </Card>
          ) : (
            <Icon id="weather" loading name="spinner" />
          )}
        </>
      ) : (
        <></>
      )}
    </>
  ) : (
    <>Something went wrong</>
  )
}

export default Country
