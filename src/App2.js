import React, { useState, useCallback, useEffect, useRef } from 'react'

/* const App = () => {
  const [userText, setUserText] = useState('')
  const handleUserKeyPress = useCallback((event) => {
    console.log('event', event)
    const { key, keyCode } = event
    if (keyCode === 32 || (keyCode >= 65 && keyCode <= 90)) {
      setUserText((prevUserText) => `${prevUserText}${key}`)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress)
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress)
    }
  }, [handleUserKeyPress])

  return (
    <div>
      <h1>Feel free to type!</h1>
      <blockquote>{userText}</blockquote>
    </div>
  )
}

export default App */
export default function App() {
  const ref = useRef()
  useEffect(() => {
    ref.current.addEventListener('mousemove', (e) => {
      console.log('moving in the blue box', e.x, e.y)
    })
  }, [])
  return (
    <div className="App">
      <div ref={ref} style={blueBox} />
      <div style={orangeBox} />
    </div>
  )
}

const box = { minWidth: '300px', minHeight: '300px' }
const blueBox = { ...box, backgroundColor: 'cornflowerblue' }
const orangeBox = { ...box, backgroundColor: 'coral' }
