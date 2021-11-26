import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div>
            <h1>Page Not Found :/</h1>
            <h3>
                Go to the <Link to="/"> Home Page</Link>
            </h3>
        </div>
    );
};

export default Error;
