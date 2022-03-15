import React, { useState, useRef, useEffect } from 'react'
import H from '@here/maps-api-for-javascript'
import onResize from 'simple-element-resize-detector'

const Map1 = ({ lt, lg, zm }) => {
  const [map, setMap] = useState(null)

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
          center: { lat: lt, lng: lg },
          zoom: zm,
        })
      )
    } else {
      // add resize feature
      onResize(mapUseRef.current, () => {
        map.getViewPort().resize()
      })
      // add zoom and pan
      setTimeout(() => {
        map.setZoom(zm)
        map.setCenter({ lat: lt, lng: lg })
      }, 100)
    }
  }, [map])

  useEffect(() => {
    // interactive feature i.e. scroll zoom & pan
    if (map) {
      new H.mapevents.Behavior(new H.mapevents.MapEvents(map))
    }
  }, [map])

  return (
    <>
      <div
        id="map"
        ref={mapUseRef}
      />
    </>
  )
}

const Map = React.memo(Map1)

export default Map
