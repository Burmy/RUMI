import { React, useRef } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
// import { useAuth } from "../../Helpers/AuthContext";
import Cookies from "js-cookie";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { useDetectOutsideClick } from "./useDetectOutsideClick";

const Navbar = () => {
    // const { authTokens, setAuthTokens } = useAuth();
    let history = useHistory();
    let logged = Cookies.get("logged");
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);

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
                    </div>
                    <div className="logo-div">
                        <Link to="/">
                            <div className="logo"></div>
                            RUMI
                        </Link>
                    </div>
                    <div className="resp-nav-links">
                        {/* {!authTokens && (
                            <>
                                <Link className="nav-links" to="/createpost">
                                    Create
                                </Link>
                            </>
                        )} */}
                        {logged ? (
                            <>
                                <Link className="nav-links" to="/createpost">
                                    Create
                                </Link>
                                <div className="nav-links">
                                    <div className="menu-container">
                                        <button onClick={onClick} className="menu-trigger">
                                            {/* <span>{Cookies.get("username")}</span> */}
                                            {/* <img src="https://i.redd.it/v0caqchbtn741.jpg" alt="User avatar" /> */}
                                        </button>
                                        <nav ref={dropdownRef} className={`menu ${isActive ? "active" : "inactive"}`}>
                                            <ul>
                                                <li>
                                                    <Link to={`/user/${Cookies.get("loggedUserid")}`} className="nav-links">
                                                        Dashboard
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/"
                                                        className="nav-links"
                                                        onClick={() => {
                                                            // axios post logout api
                                                            history.push("/");
                                                            console.log("clicked");
                                                            Cookies.remove("username");
                                                            Cookies.remove("loggedUserid");
                                                            Cookies.remove("logged");
                                                            Cookies.remove("admin");
                                                            Cookies.remove("token");
                                                            Cookies.remove("csid");
                                                            window.location.reload();

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
                                                        }}
                                                    >
                                                        Logout
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
