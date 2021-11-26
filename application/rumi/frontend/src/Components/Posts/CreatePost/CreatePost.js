import React from "react";
import Axios from "axios";
import "./CreatePost.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import configData from "../../../Configs/config.json";
import Cookies from "js-cookie";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import ImageUpload from "image-upload-react";

export const CreatePost = ({ history }) => {
    // const [imageSrc, setImageSrc] = useState();

    // const handleImageSelect = (e) => {
    //     setImageSrc(URL.createObjectURL(e.target.files[0]));
    // };
    const initialValues = {
        caption: "",
        description: "",
        price: "",
        location: "",
        parking: "",
        pet: "",
        gender: "",
        smoking: "",
        photo: "",
        longitude: "",
        latitude: "",
    };
    const onSubmit = (values) => {
        let data = new FormData();
        var photo = document.getElementById("photo");
        data.append("photo", photo.files[0]);
        data.append("caption", values.caption);
        data.append("description", values.description);
        data.append("price", values.price);
        data.append("latitude", values.latitude);
        data.append("longitude", values.longitude);
        data.append("location", values.location);
        data.append("parking", values.parking);
        data.append("pet", values.pet);
        data.append("smoking", values.smoking);
        data.append("gender", values.gender);
        data.append("creator_id", Cookies.get("loggedUserid"));

        Axios.post(configData.SERVER_URL + "posts/", data, {
            headers: { "content-type": "multipart/form-data" },
        })
            .then((response) => {
                console.log("IT WORKED");
                console.log(response);
                toast.success("Posted Successfully!", {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    closeButton: false,
                    progress: 0,
                });
                history.push("/post/" + response.data.id);
            })
            .catch((error) => {
                // Error
                toast.error("You must fill all the fields to continue.", {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    closeButton: false,
                    progress: 0,
                });
                if (error.response) {
                    console.log(data);
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

    const validationSchema = Yup.object().shape({
        caption: Yup.string().required("✖ You must create a Caption"),
        description: Yup.string()
            .min(3, "✖ Description must be at least 3 characters")
            .required("✖ You must create a Description"),
        photo: Yup.mixed().required("✖ A photo is required"),
    });

    return (
        <div className="form-container">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {(formProps) => (
                    <Form className="upload-card">
                        <p className="form-heading">Post</p>

                        <div className="upload-container">
                            <div className="upload-image">
                                <ErrorMessage className="form-error" name="photo" component="span" />
                                <label htmlFor="upload">Upload your Image:</label>
                                {/* <input
                                    type="file"
                                    id="photo"
                                    accept="image/jpg,image/jpeg,image/png"
                                    onChange={onSelectFile}
                                    autoComplete="off"
                                />
                                <img src={this.state.file} id="imgPreview" /> */}

                                <input
                                    id="photo"
                                    type="file"
                                    name="photo"
                                    accept="image/jpg,image/jpeg,image/png"
                                    onChange={(event) => formProps.setFieldValue("photo", event.target.files[0])}
                                />
                                {/* <ImageUpload
                                    id="photo"
                                    name="photo"
                                    // onChange={(event) => formProps.setFieldValue("photo", event.target.files[0])}
                                    handleImageSelect={(event) => setImageSrc(URL.createObjectURL(event.target.files[0]))}
                                    imageSrc={imageSrc}
                                    setImageSrc={setImageSrc}
                                    defaultDeleteIconSize={60}
                                    defaultDeleteIconColor="#222"
                                    deleteIcon={<div>Delete</div>}
                                    style={{
                                        width: 700,
                                        height: 500,
                                        background: "gold",
                                    }}
                                /> */}
                            </div>

                            <div className="upload-info">
                                <Field className="form-input" name="caption" placeholder="Enter a Caption" />
                                <ErrorMessage className="form-error" name="caption" component="span" />

                                <Field
                                    id="textarea"
                                    component="textarea"
                                    className="form-input"
                                    type="text"
                                    name="description"
                                    placeholder="Enter a Description"
                                />
                                <ErrorMessage className="form-error" name="description" component="span" />

                                <div className="upload-info-price">
                                    <Field className="form-input" type="number" name="price" placeholder="Enter Price($)" />

                                    <Field component="select" className="form-input-select-reg" name="location">
                                        <option value="0">Select a Location</option>
                                        <option value="1">Daly City</option>
                                        <option value="2">San Francisco</option>
                                        <option value="3">South San Francisco</option>
                                        <option value="4">Berkeley</option>
                                        <option value="5">Oakland</option>
                                        <option value="6">Alameda</option>
                                        <option value="7">San Mateo</option>
                                        <option value="8">San Leandro</option>
                                    </Field>
                                </div>

                                <div className="upload-info-pref">
                                    <div>
                                        <div className="upload-info-pref-heading">Parking Available?</div>
                                        <div className="upload-info-pref-values">
                                            <Field type="radio" id="p1" name="parking" value="1" />
                                            <label htmlFor="p1">Yes</label>
                                            <Field type="radio" id="p2" name="parking" value="0" />
                                            <label htmlFor="p2">No</label>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="upload-info-pref-heading">Pets Allowed?</div>
                                        <div className="upload-info-pref-values">
                                            <Field type="radio" id="pe1" name="pet" value="1" />
                                            <label htmlFor="pe1">Yes</label>
                                            <Field type="radio" id="pe2" name="pet" value="0" />
                                            <label htmlFor="pe2">No</label>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="upload-info-pref-heading">Smoking Allowed?</div>
                                        <div className="upload-info-pref-values">
                                            <Field type="radio" id="s1" name="smoking" value="1" />
                                            <label htmlFor="s1">Yes</label>
                                            <Field type="radio" id="s2" name="smoking" value="0" />
                                            <label htmlFor="s2">No</label>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="upload-info-pref-heading">Gender Specific?</div>
                                        <div className="upload-info-pref-values">
                                            <Field type="radio" id="g1" name="gender" value="M" />
                                            <label htmlFor="g1">Male</label>
                                            <Field type="radio" id="g2" name="gender" value="F" />
                                            <label htmlFor="g2">Female</label>
                                            <Field type="radio" id="g3" name="gender" value="N" />
                                            <label htmlFor="g3">Non-Binary</label>
                                            <Field type="radio" id="g4" name="gender" value=" " />
                                            <label htmlFor="g4">No Preference</label>
                                        </div>
                                    </div>
                                </div>
                                <Field className="form-input" name="longitude" placeholder="TEMP long" />
                                <Field className="form-input" name="latitude" placeholder="TEMP lat" />
                            </div>
                        </div>

                        <button type="submit" className="form-input-btn">
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreatePost;
