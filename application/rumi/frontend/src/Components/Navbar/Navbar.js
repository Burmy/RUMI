import React, { Component } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

export default class Navbar extends Component {
    state = {
        isOpen: false,
    };
    handleToggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };
    render() {
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
                    <div className="logo-div">
                        <Link to="/">
                            <div className="logo"></div>
                            RUMI
                        </Link>
                    </div>
                    <div className="resp-nav-links">
                        <Link className="nav-links" to="/createpost">
                            Create
                        </Link>
                        <Link className="nav-links" to="/login">
                            LogIn
                        </Link>
                        <Link className="nav-links" to="/register">
                            SignUp
                        </Link>
                    </div>

                    <div className="hamburger" onClick={this.handleToggle}>
                        <HiOutlineMenuAlt3 />
                    </div>
                </div>
            </div>
        );
    }
}
