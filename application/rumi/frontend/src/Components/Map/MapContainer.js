import React from "react";
//import {GoogleMaps, withScriptjs, withGoogleMap} from "react-google-maps";
import {GoogleMap, useLoadScript, Marker, InfoWindow,} from "@react-google-maps/api";
import mapStyles from "./mapStyles.js";

function MapContainer() {

const libraries = ["places"];
const MapContainerStyle = {
  width: '75vw',
  height: '100vh',
}
const mapCenter = {
  lat: 37.774929,
  lng: -122.419418,
} 

const options = {
  styles: mapStyles,
  }

const { isLoaded, loadError } = useLoadScript({
  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  libraries,
}); 



if(loadError) return "Error Loading map";
if(!isLoaded) return "Map loading";

return (
  <div>
<GoogleMap
mapContainerStyle = {MapContainerStyle}
zoom ={10}
center = {mapCenter}
options = {options}

></GoogleMap>
</div>
);
<div><h1>Map</h1>
                                <MapContainer/>
                                </div>


}
  export default MapContainer;





