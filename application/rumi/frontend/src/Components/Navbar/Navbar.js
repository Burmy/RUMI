import { React, useRef, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
// import { useAuth } from "../../Helpers/AuthContext";
import Cookies from "js-cookie";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { MdOutlineLogout } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import Avatar from "react-avatar";
// import configData from "../../../Configs/config.json";
const Navbar = () => {
    let history = useHistory();
    let logged = Cookies.get("logged");
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

    const onClick = () => setIsActive(!isActive);

    const logout = () => {
        history.push("/");
        window.location.reload();
        firebase.auth().signOut();
        console.log("clicked");
        Cookies.remove("username");
        Cookies.remove("loggedUserid");
        Cookies.remove("logged");
        Cookies.remove("admin");
        Cookies.remove("token");
        Cookies.remove("csid");
    };
    const style = { width: "30px", height: "30px", marginLeft: "10px", marginTop: "-5px" };
    return (
        <div>
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
                        <Link className="nav-links" to="/map">
                            Map
                        </Link>
                    </div>
                    <div className="logo-div">
                        <Link to="/">
                            <div className="logo"></div>
                            RUMI
                        </Link>
                    </div>
                    <div className="resp-nav-links">
                        {logged ? (
                            <>
                                <Link className="nav-links" to="/createpost">
                                    Create
                                </Link>
                                <div className="nav-links">
                                    <div className="menu-container">
                                        <button onClick={onClick} className="menu-trigger">
                                            {/* <span>{Cookies.get("username")}</span> */}
                                            <Avatar
                                                className="menu-profile"
                                                name={Cookies.get("username")[0].split("")[0]}
                                                round
                                                size="60px"
                                                color="white"
                                                // src={configData.SERVER_URL + `files/download?name=${value.photo}`}
                                            />
                                        </button>
                                        <nav ref={dropdownRef} className={`menu ${isActive ? "active" : "inactive"}`}>
                                            <ul>
                                                <li>
                                                    <Link to={`/user/${Cookies.get("loggedUserid")}`} className="nav-links">
                                                        <div className="menu-trigger-option">
                                                            Dashboard
                                                            <BiUser style={style} />
                                                        </div>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to={`/chat`} className="nav-links">
                                                        <div className="menu-trigger-option">
                                                            Chat
                                                            <RiQuestionAnswerLine style={style} />
                                                        </div>
                                                    </Link>
                                                </li>

                                                <li>
                                                    <Link
                                                        to="/"
                                                        className="nav-links"
                                                        onClick={logout}
                                                        // toast.success("Logged Out!", {
                                                        //     position: "top-right",
                                                        //     autoClose: 4000,
                                                        //     hideProgressBar: false,
                                                        //     closeOnClick: true,
                                                        //     pauseOnHover: true,
                                                        //     draggable: true,
                                                        //     closeButton: false,
                                                        //     progress: 0,
                                                        // });
                                                    >
                                                        <div className="menu-trigger-option">
                                                            Logout
                                                            <MdOutlineLogout style={style} />
                                                        </div>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link id="login-link" className="nav-links" to="/login">
                                    LogIn
                                </Link>
                                <Link id="register-link" className="nav-links" to="/register">
                                    SignUp
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="hamburger">
                        <HiOutlineMenuAlt3 />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
