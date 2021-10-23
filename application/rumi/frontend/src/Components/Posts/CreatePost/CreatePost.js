import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Axios from "axios";
import React from "react";

const CreatePost = () => {
    const initialValues = {
        caption: "",
        description: "",
    };

    //Yup npm package used to do form validation
    const validationSchema = Yup.object().shape({
        caption: Yup.string().min(3).max(15).required("✖ You must create a Cap"),
        description: Yup.string().required("✖ You must enter an Desc"),
    });

    const onSubmit = (data) => {
        Axios.post("http://18.190.48.206:3001/posts", data).then((response) => {
            console.log("IT WORKED");
        });
    };
    return (
        <div className="form-container">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="reg-card">
                    <p className="form-heading">test</p>
                    <Field className="form-input" name="caption" placeholder="Enter Your Caption" />
                    <ErrorMessage className="form-error" name="caption" component="span" />

                    <Field className="form-input" name="description" placeholder="Enter Your Description" />
                    <ErrorMessage className="form-error" name="description" component="span" />

                    <button className="form-input-btn" type="submit">
                        Submit
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

export default CreatePost;
