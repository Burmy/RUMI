import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Axios from "axios";
import React from "react";
import "./Form.css";
import Major from "../Posts/Listings/CategoryLists/Major";

const Registeration = () => {
    const initialValues = {
        username: "",
        email: "",
        password: "",
        description: "",
        gender: "",
        school: "",
        major: "",
        smoker: "",
        pets: "",
        interests: "",
    };

    //Yup npm package used to do form validation
    const validationSchema = Yup.object().shape({
        // username: Yup.string()
        //     .min(3)
        //     .max(15)
        //     .required("✖ You must create a Username")
        //     .matches(/^[a-zA-Z]+/g, "✖ Username must start with a character (a-z or A-Z)"),
        email: Yup.string().required("✖ You must enter an Email").email("Email must be valid"),
        // password: Yup.string()
        //     .required("✖ You must enter a Password")
        //     .matches(
        //         /^(?=.*[A-Z])(?=.*[0-9])(?=.*[(/*-+!@#$^&*)])/g,
        //         "✖ Must contain at least 1 upper case letter and 1 number and 1 of the following special characters ( / * - + ! @ # $ ^ & * )."
        //     ),
        // password2: Yup.string()
        //     .required("✖ You must enter a Password")
        //     .oneOf([Yup.ref("password1"), null], "✖ Passwords must match"),
    });
    const onSubmit = (data) => {
        Axios.post("http://localhost:3001/users/registration", data)
            .then((response) => {
                console.log("IT WORKED");
                console.log(data);
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
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="reg-card">
                    <p className="form-heading">Join Us!</p>
                    <Field className="form-input" name="username" placeholder="Enter Your Username" />
                    <ErrorMessage className="form-error" name="username" component="span" />

                    <Field className="form-input" name="email" placeholder="Enter Your Email" />
                    <ErrorMessage className="form-error" name="email" component="span" />

                    <Field className="form-input" type="text" name="password" placeholder="Enter Password" />
                    <ErrorMessage className="form-error" name="password" component="span" />

                    <Field className="form-input" type="text" name="description" placeholder="Enter Description" />

                    <div role="group" aria-labelledby="my-radio-group">
                        <label>
                            <Field type="radio" name="gender" value="M" />
                            Male
                        </label>
                        <label>
                            <Field type="radio" name="gender" value="F" />
                            Female
                        </label>
                        <label>
                            <Field type="radio" name="gender" value="N" />
                            Non-Binary
                        </label>
                    </div>

                    <Field className="form-input" name="school" placeholder="Enter School" />

                    <Field className="form-input" name="major" placeholder="Enter Major" />

                    <div role="group" aria-labelledby="my-radio-group">
                        Do you Smoke?
                        <label>
                            <Field type="radio" name="smoker" value="1" />
                            Yes
                        </label>
                        <label>
                            <Field type="radio" name="smoker" value="0" />
                            No
                        </label>
                    </div>

                    <div role="group" aria-labelledby="my-radio-group">
                        Have any pets?
                        <label>
                            <Field type="radio" name="pets" value="1" />
                            Yes
                        </label>
                        <label>
                            <Field type="radio" name="pets" value="0" />
                            No
                        </label>
                    </div>

                    <Field className="form-input" name="interests" placeholder="Enter Interests" />

                    {/* <Major major={props.major} /> */}

                    {/* <Field className="form-input" type="password" name="password2" placeholder="Confirm Password" />
                    <ErrorMessage className="form-error" name="password2" component="span" /> */}
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
