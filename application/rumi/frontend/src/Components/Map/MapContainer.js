import React from "react";
import ReactMapGL from 'react-map-gl';

function MapContainer() {
    const [viewport, setViewport] = React.useState({
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    });
  
    return (
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        width="25%"
        height="25%"
        onViewportChange={(viewport) => setViewport(viewport)}
      />
    );
  }
  export default MapContainer;