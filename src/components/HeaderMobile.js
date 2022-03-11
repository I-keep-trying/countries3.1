import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Menu,
  Icon,
  Input,
  Label,
  Container,
  Message,
  Button,
} from 'semantic-ui-react'
import {
  toggleUnit,
  toggleMenu,
  searchCountries,
} from '../reducers/countryReducer'

import '../assets/css/App.css'

const HeaderNav = () => {
  console.log('Mobile')
  const [value, setValue] = useState('')

  const show = useSelector((state) => state.menu.show)

  const state = useSelector((state) => state)

  const unit = useSelector((state) => state.unit.unit)

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

  const showHideMenu = () => {
    dispatch(toggleMenu())
  }

  const changeUnit = (val) => {
    dispatch(toggleUnit(val))
  }

  return (
    <>
      <Menu id="mobile nav menu" attached="top" inverted borderless>
        <Menu.Item
          header
          style={{ paddingRight: 0, paddingLeft: 3 }}
          onClick={() => showHideMenu()}
        >
          {show ? (
            <Icon name="times" color="teal" size="large" />
          ) : (
            <Icon name="sidebar" color="teal" size="large" />
          )}
          <p> World Countries Mobile </p>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item onClick={() => changeUnit()}>
            <Label color="blue">{unit}</Label>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Menu inverted attached vertical fluid>
        <Menu.Item>
          <Input
          inverted
            size="mini"
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
