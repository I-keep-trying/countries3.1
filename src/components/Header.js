import React, { useRef, useState } from 'react'
import { Menu, Icon, Input, Button } from 'semantic-ui-react'
import '../assets/css/App.css'
//import { isMobile } from 'react-device-detect'

const HeaderNav = ({
  input,
  setInput,
  isLoading,
  setIsLoading,
  setRegion,
  setActiveRegion,
  setSubRegion,
  setActiveSubregion,
  unit,
  handleUnitButtonClick,
}) => {
  const inputRef = useRef()

  const clearInput = () => {
    setInput('')
    setRegion('All')
    setActiveRegion('All')
    setSubRegion('')
    setActiveSubregion('')
  }

  const handleChange = (e) => {
    if (!inputRef.current) {
      inputRef.current = e.target
    }

    !isLoading ? setIsLoading(true) : isLoading
    setInput(e.target.value)
  }

  /*   const closeMobileMenu = () => {
    reset()
    // visibilityToggle()
    setMenu(false)
  } */

  return (
    <>
      <Menu id='nav menu' attached="top" inverted borderless>
        <Menu.Item style={{ padding: 0 }} header>
          {/*           {isMobile ? (
            <>
              {visible ? (
                <Icon
                  name="window close"
                  onClick={closeMobileMenu}
                  rotated="clockwise"
                  color="teal"
                  size="big"
                />
              ) : (
                <Icon
                  name="bars"
                  onClick={visibilityToggle}
                  color="teal"
                  size="big"
                />
              )}
            </>
          ) : (
            <Icon className="App-logo" name="globe" color="teal" size="big" />
          )} */}
          <Icon className="App-logo" name="globe" color="teal" size="big" />
          <p> World Countries</p>
        </Menu.Item>
        <Menu.Item>
          {input.length > 0 ? (
            <Input
              icon={<Icon name="close" link onClick={clearInput} />}
              type="search"
              value={input}
              onChange={handleChange}
            />
          ) : (
            <Input
              icon={<Icon name="search" />}
              type="search"
              value={input}
              onChange={handleChange}
              placeholder="Search by country name"
            />
          )}
        </Menu.Item>
        <Menu.Item
          position="right"
          /*   style={{
            padding: 0,
          }} */
        >
          <Button.Group>
            <Button
              size="medium"
              basic={unit === 'metric' ? false : true}
              // color="black"
              inverted
              color="teal"
              onClick={handleUnitButtonClick}
              style={{ padding: 4 }}
            >
              Metric
            </Button>
            <Button
              size="medium"
              basic={unit === 'metric' ? true : false}
              //  color="black"
              inverted
              color="teal"
              onClick={handleUnitButtonClick}
              style={{ padding: 4 }}
            >
              Imperial
            </Button>
          </Button.Group>
        </Menu.Item>
        {/*         <Menu.Menu position="right"></Menu.Menu>
         */}{' '}
      </Menu>
    </>
  )
}

export default HeaderNav
