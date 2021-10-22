import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Axios from "axios";
import React from "react";
import "./Form.css";

const Registeration = () => {
    const initialValues = {
        username: "",
        email: "",
        password1: "",
        password2: "",
    };

    //Yup npm package used to do form validation
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .min(3)
            .max(15)
            .required("✖ You must create a Username")
            .matches(/^[a-zA-Z]+/g, "✖ Username must start with a character (a-z or A-Z)"),
        email: Yup.string().required("✖ You must enter an Email").email("Email must be valid"),
        password1: Yup.string()
            .required("✖ You must enter a Password")
            .matches(
                /^(?=.*[A-Z])(?=.*[0-9])(?=.*[(/*-+!@#$^&*)])/g,
                "✖ Must contain at least 1 upper case letter and 1 number and 1 of the following special characters ( / * - + ! @ # $ ^ & * )."
            ),
        password2: Yup.string()
            .required("✖ You must enter a Password")
            .oneOf([Yup.ref("password1"), null], "✖ Passwords must match"),
    });

    const onSubmit = (data) => {
        // Axios.post("http://localhost:3001/???????", data).then((response) => {
        //     console.log("IT WORKED");
        // });
    };
    return (
        <div className="form-container">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="reg-card">
                    <p className="form-heading">Join Us!</p>
                    <Field className="form-input" name="username" placeholder="Enter Your Username" />
                    <ErrorMessage className="form-error" name="username" component="span" />

                    <Field className="form-input" name="email" placeholder="Enter Your Email" />
                    <ErrorMessage className="form-error" name="email" component="span" />

                    <Field className="form-input" type="password" name="password1" placeholder="Enter Password" />
                    <ErrorMessage className="form-error" name="password1" component="span" />

                    <Field className="form-input" type="password" name="password2" placeholder="Confirm Password" />
                    <ErrorMessage className="form-error" name="password2" component="span" />
                    <button className="form-input-btn" type="submit">
                        Submit
                    </button>
                    <p className="form-input-login">
                        Already have an account? Login{" "}
                        <Link className="login-link" to="/login">
                            here.
                        </Link>
                    </p>
                </Form>
            </Formik>
        </div>
    );
};

export default Registeration;
