import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <div className="navbar">
                <Link className="nav-links" to="/">
                    Home
                </Link>
                <Link className="nav-links" to="/team">
                    Team
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
