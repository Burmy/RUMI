import { React, Component } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProfile from "../../Helpers/UserProfile";
import Axios from "axios";
import "./Navbar.css";

export default class Navbar extends Component {
    state = {
        isOpen: false,
        reload: false,
    };

    handleToggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    refreshPage = () => {
        this.setState({ reload: true }, () => this.setState({ reload: false }));
    };

    logout() {
        UserProfile.setName = "";
        localStorage.clear();
        window.location.reload();
        console.log(localStorage.getItem("user"));
        Axios.post("http://localhost:3001/users/logout").then((res) => {
            toast.success("Logged Out!", {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                closeButton: false,
                progress: 0,
            });
            console.log(res);
        });
    }

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
                        {localStorage.getItem("user") ? (
                            <>
                                <Link className="nav-links" to="/createpost">
                                    Create
                                </Link>
                                <Link className="nav-links" onClick={this.logout} to="/">
                                    Log Out
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link className="nav-links" to="/login">
                                    Log In
                                </Link>
                                <Link className="nav-links" to="/register">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="hamburger" onClick={this.handleToggle}>
                        <HiOutlineMenuAlt3 />
                    </div>
                </div>
            </div>
        );
    }
}
