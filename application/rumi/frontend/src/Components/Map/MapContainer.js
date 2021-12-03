import React from "react";
//import {GoogleMaps, withScriptjs, withGoogleMap} from "react-google-maps";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import mapStyles from "./mapStyles.js";

function MapContainer(props) {
  const libraries = ["places"];
  const locations = {1: {lat:37.686560758420626, long: -122.47240217807168}, 
                      2: {lat: 37.76518642961319, long: -122.41984437911691}, 
                      3: {lat: 37.65421253823516, long: -122.40915053716171}, 
                      4: {lat: 37.871322647185245, long: -122.27269693107489},
                      5: {lat: 37.80401220098167, long: -122.27072282473891}, 
                      6: {lat: 37.77989353417927, long: -122.28108100529343}, 
                      7: {lat: 37.56297463461893, long: -122.32560615141871}, 
                      8: {lat: 37.7259941817611, long: -122.15748223822142},
                    }

  const MapContainerStyle = {
    width: "75vw",
    height: "100vh",
  };
  const mapCenter = {
    lat: locations[props.location].lat,
    lng: locations[props.location].long, 
  }; 

  const options = {
    styles: mapStyles,
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD-yb6PzLmam0q76MsEb-HJ1qkPJaIs5h8",
    libraries,
  });

  if (loadError) return "Error Loading map";
  if (!isLoaded) return "Map loading";

  return (
    <div>
      <GoogleMap
        mapContainerStyle={MapContainerStyle}
        zoom={15}
        center={mapCenter}
        options={options}



        ></GoogleMap>
    </div>
  );
}
export default MapContainer;

