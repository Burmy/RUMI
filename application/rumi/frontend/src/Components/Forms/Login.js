import { useState, React, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import Axios from "axios";
import "./Form.css";
import configData from "../../Configs/config.json";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../Chat/Firebase";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let history = useHistory();

    const login = () => {
        // const data = { username: username, password: password };

        // Axios.defaults.withCredentials = true;
        // Axios.post(configData.SERVER_URL + "users/login", data)
        //     .then((response) => {
        //         console.log(response.data);
        //         console.log(response.headers);
        //         // toast.success("Logged In!", {
        //         //     position: "top-right",
        //         //     autoClose: 4000,
        //         //     hideProgressBar: false,
        //         //     closeOnClick: true,
        //         //     pauseOnHover: true,
        //         //     draggable: true,
        //         //     closeButton: false,
        //         //     progress: 0,
        //         // });
        //         localStorage.setItem("loggedUserid", Cookies.get("loggedUserid"));
        //         history.push("/");
        //         window.location.reload();
        //     })
        //     .catch((error) => {
        //         // Error
        //         if (error.response) {
        //             // The request was made and the server responded with a status code
        //             // that falls out of the range of 2xx
        //             toast.error("Invalid Username and Password!", {
        //                 position: "top-right",
        //                 autoClose: 4000,
        //                 hideProgressBar: false,
        //                 closeOnClick: true,
        //                 pauseOnHover: true,
        //                 draggable: true,
        //                 closeButton: false,
        //                 progress: 0,
        //             });
        //             console.log(data);
        //             console.log(error.response.data, "yo");
        //             console.log(error.response.status);
        //             console.log(error.response.headers);
        //         } else if (error.request) {
        //             // The request was made but no response was received
        //             // `error.request` is an instance of XMLHttpRequest in the
        //             // browser and an instance of
        //             // http.ClientRequest in node.js
        //             console.log(error.request);
        //         } else {
        //             // Something happened in setting up the request that triggered an Error
        //             console.log("Error", error.message);
        //         }
        //         console.log(error.config);
        //     });
            let email = Axios.post(configData.SERVER_URL + "users/getEmailbyUser", username)
        signInWithEmailAndPassword(auth, email, password)
            .then((cred) => {
                console.log("logged in firebase", cred.user);
                history.push("/chat");
            })
            .catch((error) => {
                // Errorn
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
    };

    return (
        <div className="form-container">
            <div className="login-card">
                <form className="form" noValidate>
                    <p className="form-heading">Welcome Back!</p>
                    <input
                        className="form-input"
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />

                    <input
                        className="form-input"
                        type="text"
                        name="password"
                        placeholder="Password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <button className="form-input-btn" onClick={login} type="button">
                        Log in
                    </button>
                    <p className="form-input-login">
                        Not a member yet? Sign up{" "}
                        <Link className="login-link" to="/register">
                            here.
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
