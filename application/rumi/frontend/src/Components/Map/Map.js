import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import "./MapContainer.js";
import "./mapStyles.js";

const Map = () => {
    const { url } = useRouteMatch();

    return (
        <div>
            <div id="heading">
                <p>Find Roommates on the Map</p>
            </div> 
        </div>
    );
};

export default Map;
