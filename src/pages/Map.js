import React, { useState, useRef, useEffect } from 'react'
import H from '@here/maps-api-for-javascript'
import onResize from 'simple-element-resize-detector'

const Map = ({ lat, lng }) => {
  const [map, setMap] = useState(null)
  const [state, setState] = useState({
    zoom: 4,
    lat: lat,
    lng: lng,
  })
  console.log('Map props lat, lng', lat, ', ', lng)
  const mapUseRef = useRef()

  useEffect(() => {
    if (!map) {
      // instantiate a platform, default layers and a map as usual
      const platform = new H.service.Platform({
        apikey: process.env.REACT_APP_HERE_KEY,
      })
      const layers = platform.createDefaultLayers()
      setMap(
        new H.Map(mapUseRef.current, layers.vector.normal.map, {
          pixelRatio: window.devicePixelRatio,
          center: { lat: lat, lng: lng },
          zoom: state.zoom,
        })
      )
    } else {
      // add resize feature
      onResize(mapUseRef.current, () => {
        map.getViewPort().resize()
      })

      map.setZoom(state.zoom)
      map.setCenter({ lat: state.lat, lng: state.lng })

      // add the interactive behaviour to the map
      mapUseRef.current.addEventListener('mapviewchange', (e) => e)
      new H.mapevents.Behavior(new H.mapevents.MapEvents(map))
    }
    return () => {
      mapUseRef.current.removeEventListener('mapviewchange', (e) => e)
    }
  }, [map, state])

  return (
    <>
      <div
        style={{ position: 'relative', width: '100%', height: '300px' }}
        ref={mapUseRef}
      />
    </>
  )
}

export default Map
