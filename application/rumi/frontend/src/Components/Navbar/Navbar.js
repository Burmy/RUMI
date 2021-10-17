import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <div className="demo-only">SFSU Software Engineering Project CSC 648-848, Fall 2021. For Demonstration Only</div>
            <div className="navbar">
                <div className="resp-nav-links">
                    <Link className="nav-links" to="/">
                        Home
                    </Link>
                    <Link className="nav-links" to="/team">
                        About
                    </Link>
                </div>
                <div>
                    <div className="logo"></div>
                    RUMI
                </div>
                <div className="resp-nav-links">
                    <Link className="nav-links" to="/">
                        LogIn
                    </Link>
                    <Link className="nav-links" to="/">
                        SignUp
                    </Link>
                </div>
                <div className="hamburger">hamburger</div>
            </div>
        </div>
    );
};

export default Navbar;
