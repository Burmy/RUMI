/* eslint-disable eqeqeq */
import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import axios from "axios";
import configData from "../../../Configs/config.json";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const EditProfile = () => {
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    let history = useHistory();
    const editValues = {
        username: "",
        email: "",
        password: "",
        description: "",
        gender: "",
        school: "",
        major: "",
        smoker: "",
        pets: "",
    };

    //const[email,setEmail] = React.useState('');
    //const[username,setUsername] = React.useState('');
    const [description, setDescription] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [school, setSchool] = React.useState("");
    const [major, setMajor] = React.useState("");
    const [smoker, setSmoker] = React.useState("");
    const [pets, setPets] = React.useState("");
    // const[originalUsername,getOriginalUsername] = React.useState('');
    const originalUsername = Cookies.get("username");
    // const handleOriginalUseraname = (e) =>{
    //   getOriginalUsername(e.target.value);
    // }
    // const handleUsername = (e) =>{

    //     setUsername(Cookies.get("username"));
    //     }

    const handleDescription = (e) => {
        setDescription(e.target.value);
    };

    const handleSchool = (e) => {
        setSchool(e.target.value);
    };

    const handleMajor = (e) => {
        setMajor(e.target.value);
    };

    const data = {
        description: description,
        gender: gender,
        school: school,
        major: major,
        smoker: smoker,
        pets: pets,
        originalUsername: originalUsername,
    };
    const handlePost = () => {
        console.log(data);
        axios
            .post(configData.SERVER_URL + "users/update", data)
            // .then(document.write(json));
            .then((response) => {
                history.goBack();
            });
    };

    return (
        <div>
            <button className="edit-input-btn" onClick={onOpenModal}>
                Edit Your Details
            </button>
            <Modal open={open} onClose={onCloseModal} center>
                <Formik>
                    {() => (
                        <Form>
                            <div className="reg-form">
                                <p className="form-heading">Edit Details!</p>
                                <Field
                                    id="textarea"
                                    component="textarea"
                                    className="form-input"
                                    type="text"
                                    placeholder="What are you looking for on this website?"
                                    value={description}
                                    onChange={handleDescription}
                                />

                                <Field className="form-input" placeholder="Enter School" value={school} onChange={handleSchool} />

                                <Field component="select" className="form-input-select-reg" value={major} onChange={handleMajor}>
                                    <option value="0">Select a Major</option>
                                    <option value="9">Accounting</option>
                                    <option value="10">Computer Science</option>
                                    <option value="11">Finance</option>
                                    <option value="12">Business Management</option>
                                    <option value="13">Biology</option>
                                    <option value="14">Economics</option>
                                    <option value="15">Chinese</option>
                                    <option value="16">English</option>
                                    <option value="17">Law</option>
                                    <option value="18">Physical Science</option>
                                </Field>

                                <div className="reg-check">
                                    <input
                                        type="radio"
                                        value={gender}
                                        name="tripType"
                                        checked={gender == "M"}
                                        id="gen1"
                                        onClick={() => {
                                            setGender("M");
                                        }}
                                    />
                                    <label htmlFor="gen1" required>
                                        Male
                                    </label>

                                    <input
                                        type="radio"
                                        value={gender}
                                        name="tripType"
                                        checked={gender == "F"}
                                        id="gen2"
                                        onClick={() => {
                                            setGender("F");
                                        }}
                                    />
                                    <label htmlFor="gen2" required>
                                        Female
                                    </label>

                                    <input
                                        type="radio"
                                        value={gender}
                                        name="tripType"
                                        checked={gender == "N"}
                                        id="gen3"
                                        onClick={() => {
                                            setGender("N");
                                        }}
                                    />
                                    <label htmlFor="gen3" required>
                                        Non-Binary
                                    </label>
                                </div>

                                <div className="reg-check-pref">
                                    Do you Smoke?
                                    <input
                                        type="radio"
                                        value={smoker}
                                        name="smoke"
                                        checked={smoker == "1"}
                                        id="smoke1"
                                        onClick={() => {
                                            setSmoker("1");
                                        }}
                                    />
                                    <label htmlFor="smoke1" required>
                                        Yes
                                    </label>
                                    <input
                                        type="radio"
                                        value={smoker}
                                        name="smoke"
                                        checked={smoker == "0"}
                                        id="smoke2"
                                        onClick={() => {
                                            setSmoker("0");
                                        }}
                                    />
                                    <label htmlFor="smoke2" required>
                                        No
                                    </label>
                                </div>

                                <div className="reg-check-pref">
                                    Have any Pets?
                                    <input
                                        type="radio"
                                        value={pets}
                                        name="pet"
                                        checked={pets == "1"}
                                        id="pet1"
                                        onClick={() => {
                                            setPets("1");
                                        }}
                                    />
                                    <label htmlFor="pet1" required>
                                        Yes
                                    </label>
                                    <input
                                        type="radio"
                                        value={pets}
                                        name="pet"
                                        checked={pets == "0"}
                                        id="pet2"
                                        onClick={() => {
                                            setPets("0");
                                        }}
                                    />
                                    <label htmlFor="pet2" required>
                                        No
                                    </label>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div>
                    <form className="reg-form">
                        <button className="form-input-btn" onClick={handlePost}>
                            Save
                        </button>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default EditProfile;
