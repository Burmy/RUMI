import { useState, React } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./Form.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    Axios.defaults.withCredentials = true;
    const login = () => {
        const data = { username: username, password: password };
        Axios.post("http://18.190.48.206:3001/users/login", data)
            .then((response) => {
                console.log(response.data);
                console.log(response.headers);
            })
            .catch((error) => {
                console.log(data);
                console.log(error, error.message, error.response);
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
