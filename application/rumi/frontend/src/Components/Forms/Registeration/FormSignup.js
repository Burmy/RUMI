import React from "react";
import validate from "./ValidateInfo";
import useForm from "./UseForm";
import { Link } from "react-router-dom";
import "./Form.css";

const FormSignup = ({ submitForm }) => {
    const { handleChange, handleSubmit, values, errors } = useForm(submitForm, validate);

    return (
        <div className="reg-card">
            <form onSubmit={handleSubmit} className="form" noValidate>
                <p className="form-heading">Join Us!</p>
                <input
                    className="form-input"
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={values.username}
                    onChange={handleChange}
                />
                {errors.username && <p className="form-error">{errors.username}</p>}

                <input
                    className="form-input"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={values.email}
                    onChange={handleChange}
                />
                {errors.email && <p className="form-error">{errors.email}</p>}

                <input
                    className="form-input"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                />
                {errors.password && <p className="form-error">{errors.password}</p>}

                <input
                    className="form-input"
                    type="password"
                    name="password2"
                    placeholder="Confirm your password"
                    value={values.password2}
                    onChange={handleChange}
                />
                {errors.password2 && <p className="form-error">{errors.password2}</p>}

                {/* <div class="check">
                    <form class="age">
                        <input type="checkbox" name="confirmAge" required="required" />
                        <label for="age">I accept I am 13+ years of age.</label>
                    </form>
                    <div class="policy">
                        <input type="checkbox" name="confirmPolicy" required="required" />
                        <label for="policy">I have read and accept the</label>
                        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
                            TOS and Privacy Rules.
                        </a>
                    </div>
                </div> */}

                <button className="form-input-btn" type="submit">
                    Sign Up
                </button>
                <p className="form-input-login">
                    Already have an account? Login{" "}
                    <Link className="login-link" to="/login">
                        here.
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default FormSignup;
