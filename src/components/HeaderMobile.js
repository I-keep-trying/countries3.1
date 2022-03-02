import React, { useRef } from 'react'
import { Menu, Icon, Input } from 'semantic-ui-react'
import '../assets/css/App.css'
import { isMobile } from 'react-device-detect'

const HeaderNav = ({
  visible,
  reset,
  setMenu,
  visibilityToggle,
  input,
  setInput,
  countries,
  isLoading,
  setIsLoading,
  setRegion,
  setActiveRegion,
  setSubRegion,
  setActiveSubregion,
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
    if (countries.length === 1) {
      setRegion('All')
      setSubRegion('')
    }
    if (!inputRef.current) {
      inputRef.current = e.target
    }

    !isLoading ? setIsLoading(true) : isLoading
    setInput(e.target.value)
  }

  if (countries.length === 1) {
    setRegion(countries[0].region)
    setSubRegion(countries[0].subregion)
  }

  const closeMobileMenu = () => {
    reset()
    visibilityToggle()
    setMenu(false)
  }

  return (
    <>
      <Menu id="nav menu" attached="top" inverted borderless>
        <Menu.Item style={{ padding: 0 }} header>
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
              placeholder="Start typing to search"
            />
          )}
        </Menu.Item>
        <Menu.Menu position="right"></Menu.Menu>
      </Menu>
    </>
  )
}

export default HeaderNav
