import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, connect } from 'react-redux'
import { Menu, Icon, Input, Button } from 'semantic-ui-react'
import {
  toggleUnit,
  searchCountries,
} from '../reducers/countryReducer'

import '../assets/css/App.css'

const HeaderNav = () => {
  const [value, setValue] = useState('')
  const unit = useSelector((state) => state.unit.unit)

  const reset = useSelector((state) => state.countries.filter.reset)

  useEffect(() => {
    if (reset) {
      setValue('')
    }
  }, [reset])

  const dispatch = useDispatch()

  const handleInput = (e) => {
    e.preventDefault()
    const input = e.target.value
    console.log('Header input', input)
    dispatch(searchCountries(input))
    setValue(input)
  }

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
        <Menu.Item style={{ padding: 0 }} header>
          <Icon className="App-logo" name="globe" color="teal" size="big" />
          <p> World Countries</p>
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
              style={{ padding: 4 }}
            >
              Metric
            </Button>
            <Button
              size="medium"
              basic={unit === 'metric' ? true : false}
              inverted
              color="teal"
              onClick={() => changeUnit('imperial')}
              style={{ padding: 4 }}
            >
              Imperial
            </Button>
          </Button.Group>
        </Menu.Item>
      </Menu>
    </>
  )
}

export default connect(null, { searchCountries })(HeaderNav)
