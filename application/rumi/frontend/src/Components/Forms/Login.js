import { useState, React } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import "./Form.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        const data = { username: username, password: password };

        // fetch("http://18.190.48.206:3001/users/login", {
        //     method: "POST",
        //     headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json",
        //     },
        //     credentials: "include",
        //     body: JSON.stringify(data),
        // })
        //     .then((res) => {
        //         console.log(res.headers.get("set-cookie")); // undefined
        //         console.log(document.cookie); // nope
        //         return res.json();
        //     })
        //     .then((json) => {
        //         if (json.success) {
        //             this.setState({ error: "" });
        //             this.context.router.push(json.redirect);
        //         } else {
        //             this.setState({ error: json.error });
        //         }
        //     })
        Axios.defaults.withCredentials = true;
        Axios.post("http://localhost:3001/users/login", data)
            .then((response) => {
                console.log(response.data);
                console.log(response.headers);
                alert("Successfully Logged In");
            })
            .catch((error) => {
                // Error
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(data);
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the
                    // browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
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
                        placeholder="Enter your username"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />

                    <input
                        className="form-input"
                        type="text"
                        name="password"
                        placeholder="Enter your password"
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
