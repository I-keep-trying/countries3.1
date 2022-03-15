import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isIE } from 'react-device-detect'
import {
  Menu,
  Icon,
  Input,
  Button,
  Container,
  Message,
} from 'semantic-ui-react'
import { toggleUnit, searchCountries } from '../reducers/countryReducer'
import '../assets/css/App.css'

const HeaderNav = () => {
  console.log('Desktop')
  console.log('isIE?', isIE)
  const [value, setValue] = useState('')
  const unit = useSelector((state) => state.unit.unit)

  const state = useSelector((state) => state)

  const dispatch = useDispatch()

  const handleInput = (e) => {
    e.preventDefault()
    const input = e.target.value
    dispatch(searchCountries(input))
    setValue(input)
  }

  const noMatch =
    state.countries.filtered.length === 0 && state.countries.filter.input !== ''

  const clearInput = () => {
    dispatch(searchCountries(''))
    setValue('')
  }

  const changeUnit = (val) => {
    dispatch(toggleUnit(val))
  }

  return (
    <>
      <Menu id="nav menu" attached="top" inverted borderless>
        <Menu.Item header>
          <Icon className="App-logo" name="globe" color="teal" size="big" />
          <p> World Countries </p>
        </Menu.Item>
        <Menu.Item>
          <Input
            icon={
              <Icon
                link
                name={value.length > 0 ? 'close' : 'search'}
                onClick={value.length > 0 ? clearInput : handleInput}
              />
            }
            type="search"
            value={value}
            placeholder="Search by name"
            onChange={handleInput}
          />
        </Menu.Item>
        <Menu.Item position="right">
          <Button.Group>
            <Button
              size="medium"
              basic={unit === 'metric' ? false : true}
              inverted
              color="teal"
              onClick={() => changeUnit('metric')}
            >
              Metric
            </Button>
            <Button
              size="medium"
              basic={unit === 'metric' ? true : false}
              inverted
              color="teal"
              onClick={() => changeUnit('imperial')}
            >
              Imperial
            </Button>
          </Button.Group>
        </Menu.Item>
      </Menu>
      {noMatch ? (
        <Container>
          <Message compact info>
            <Message.Header>No matches, please try again.</Message.Header>
            <Button basic color="teal" onClick={clearInput}>
              OK
            </Button>
          </Message>
        </Container>
      ) : (
        <></>
      )}
    </>
  )
}

export default HeaderNav
