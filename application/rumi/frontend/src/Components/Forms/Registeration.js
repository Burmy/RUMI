import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";
import "./Form.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineCaretRight, AiOutlineCaretLeft } from "react-icons/ai";
import configData from "../../Configs/config.json";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../Chat/Firebase";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import firebase from "firebase/compat/app";

const Registeration = () => {
    let history = useHistory();

    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        password2: "",
        description: "",
        gender: "",
        school: "",
        major: "",
        smoker: "",
        pets: "",
    });

    const [currentStep, setCurrentStep] = useState(0);

    const makeRequest = (formData) => {
        Axios.post(configData.SERVER_URL + "users/registration", formData)
            .then((response) => {
                console.log("IT WORKED");
                console.log(formData);
                toast.success("Registered Successfully!", {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    closeButton: false,
                    progress: 0,
                });
                history.push("/login");
            })
            .catch((error) => {
                // Error
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(formData);
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

    const handleNextStep = (newData, final = false) => {
        setData((prev) => ({ ...prev, ...newData }));

        if (final) {
            makeRequest(newData);
            return;
        }

        setCurrentStep((prev) => prev + 1);
    };

    const handlePrevStep = (newData) => {
        setData((prev) => ({ ...prev, ...newData }));
        setCurrentStep((prev) => prev - 1);
    };

    const steps = [
        <StepOne next={handleNextStep} data={data} />,
        <StepTwo next={handleNextStep} prev={handlePrevStep} data={data} />,
    ];

    // console.log("data", data);

    return <div className="App">{steps[currentStep]}</div>;
};

const stepOneValidationSchema = Yup.object({
    username: Yup.string()
        .min(3)
        .max(15)
        .required("✖ You must create a Username")
        .matches(/^[a-zA-Z]+/g, "✖ Username must start with a character (a-z or A-Z)"),
    email: Yup.string().required("✖ You must enter an Email").email("Email must be valid"),
    password: Yup.string()
        .required("✖ You must enter a Password")
        .matches(
            /^(?=.*[A-Z])(?=.*[0-9])(?=.*[(-/*+!@#$^&*)])/g,
            "✖ Must contain at least 1 upper case letter and 1 number and 1 of the following special characters ( / * - + ! @ # $ ^ & * )."
        ),
    password2: Yup.string()
        .required("✖ You must enter a Password")
        .oneOf([Yup.ref("password"), null], "✖ Passwords must match"),
});

const StepOne = (props) => {
    // const [fireUser, setFireUser] = useState("");
    // const [fireEmail, setFireEmail] = useState("");
    // const [firePass, setFirePass] = useState("");

    const handleSubmit = (values) => {
        props.next(values);
        // createUserWithEmailAndPassword(auth, fireEmail, firePass).then(() => {
        //     const userObj = {
        //         email: fireEmail,
        //         username: fireUser,
        //         friends: [],
        //         messages: [],
        //     };
        //     firebase
        //         .firestore()
        //         .collection("users")
        //         .doc(fireEmail)
        //         .set(userObj)
        //         .catch((error) => {
        //             // Error
        //             if (error.response) {
        //                 console.log(error.response.data);
        //                 console.log(error.response.status);
        //                 console.log(error.response.headers);
        //             } else if (error.request) {
        //                 console.log(error.request);
        //             } else {
        //                 console.log("Error", error.message);
        //             }
        //             console.log(error.config);
        //         });
        // });
    };

    return (
        <div className="form-container">
            <Formik validationSchema={stepOneValidationSchema} initialValues={props.data} onSubmit={handleSubmit}>
                {() => (
                    <Form className="reg-form">
                        <div className="reg-card">
                            <p className="form-heading">Join Us!</p>

                            <Field
                                // onBlur={(event) => {
                                //     setFireUser(event.target.value);
                                // }}
                                className="form-input"
                                name="username"
                                placeholder="Enter Your Username"
                            />
                            <ErrorMessage className="form-error" name="username" component="span" />

                            <Field
                                // onBlur={(event) => {
                                //     setFireEmail(event.target.value);
                                // }}
                                className="form-input"
                                name="email"
                                placeholder="Enter Your Email"
                            />
                            <ErrorMessage className="form-error" name="email" component="span" />

                            <Field
                                // onBlur={(event) => {
                                //     setFirePass(event.target.value);
                                // }}
                                className="form-input"
                                type="text"
                                name="password"
                                placeholder="Enter Password"
                            />
                            <ErrorMessage className="form-error" name="password" component="span" />

                            <Field className="form-input" type="text" name="password2" placeholder="Confirm Password" />
                            <ErrorMessage className="form-error" name="password2" component="span" />

                            {/* <div className="form-input-btn-step">
                            <div className="form-input-btn-step-text">Continue</div>
                            <AiOutlineCaretRight />
                        </div> */}
                            <div>age and terms of service</div>
                            <button type="submit">Next</button>

                            <p className="form-input-reg">
                                Already have an account? Login{" "}
                                <Link className="login-link" to="/login">
                                    here.
                                </Link>
                            </p>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

const stepTwoValidationSchema = Yup.object({
    description: Yup.string().required("✖ You must enter "),
    school: Yup.string().required("✖ You must enter a School"),
    // major: Yup.string().required("✖ You must specify your Major"),
    // gender: Yup.string().required("✖ You must select a Gender"),
    // smoker: Yup.string().required("✖ You must specify if you Smoke"),
    // pets: Yup.string().required("✖ You must specify if you have any Pets"),
});

const StepTwo = (props) => {
    const handleSubmit = (values) => {
        props.next(values, true);
    };

    return (
        <div className="form-container">
            <Formik validationSchema={stepTwoValidationSchema} initialValues={props.data} onSubmit={handleSubmit}>
                {({ values }) => (
                    <Form className="reg-form">
                        <div className="reg-card">
                            <p className="form-heading">Tell us about yourself!</p>
                            <Field
                                id="textarea"
                                component="textarea"
                                className="form-input"
                                type="text"
                                name="description"
                                placeholder="What are you looking for on this website?"
                            />
                            <ErrorMessage className="form-error" name="description" component="span" />

                            <Field className="form-input" name="school" placeholder="Enter School" />
                            <ErrorMessage className="form-error" name="school" component="span" />

                            <Field component="select" className="form-input-select-reg" name="major">
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
                            <ErrorMessage className="form-error" name="major" component="span" />

                            <div className="reg-check" role="group" aria-labelledby="my-radio-group">
                                <Field type="radio" name="gender" value="M" id="gen1" />
                                <label htmlFor="gen1" required>
                                    Male
                                </label>

                                <Field type="radio" name="gender" value="F" id="gen2" />
                                <label htmlFor="gen2" required>
                                    Female
                                </label>

                                <Field type="radio" name="gender" value="N" id="gen3" />
                                <label htmlFor="gen3" required>
                                    Non-Binary
                                </label>
                            </div>
                            <ErrorMessage className="form-error" name="gender" component="span" />

                            <div className="reg-check-pref" role="group" aria-labelledby="my-radio-group">
                                Do you Smoke?
                                <Field type="radio" name="smoker" value="1" id="smok1" />
                                <label htmlFor="smok1" required>
                                    Yes
                                </label>
                                <Field type="radio" name="smoker" value="0" id="smok2" />
                                <label htmlFor="smok2" required>
                                    No
                                </label>
                            </div>
                            <ErrorMessage className="form-error" name="smoker" component="span" />

                            <div className="reg-check-pref" role="group" aria-labelledby="my-radio-group">
                                Have any Pets?
                                <Field type="radio" name="pets" value="1" id="pet1" />
                                <label htmlFor="pet1" required>
                                    Yes
                                </label>
                                <Field type="radio" name="pets" value="0" id="pet2" />
                                <label htmlFor="pet2" required>
                                    No
                                </label>
                            </div>
                            <ErrorMessage className="form-error" name="pets" component="span" />

                            {/* <div className="step-container">
                            <div className="step">
                                <label for="step2">
                                    <div className="form-input-btn-step">
                                        <AiOutlineCaretLeft />
                                        <div className="form-input-btn-step-text">Back</div>
                                    </div>
                                </label>
                            </div>

                            <div className="step">
                                <label for="step3">
                                    <div className="form-input-btn-step">
                                        <div className="form-input-btn-step-text">Continue</div>
                                        <AiOutlineCaretRight />
                                    </div>
                                </label>
                            </div>
                        </div> */}

                            <button type="button" onClick={() => props.prev(values)}>
                                Back
                            </button>
                            <button type="submit">Submit</button>

                            {/* <button
                            //  onClick={createFirebaseUser}
                            className="form-input-btn"
                            type="submit"
                        >
                            Submit
                        </button> */}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

//     //Yup npm package used to do form validation
//     const validationSchema = Yup.object().shape({
//         username: Yup.string()
//             .min(3)
//             .max(15)
//             .required("✖ You must create a Username")
//             .matches(/^[a-zA-Z]+/g, "✖ Username must start with a character (a-z or A-Z)"),
//         email: Yup.string().required("✖ You must enter an Email").email("Email must be valid"),
//         password: Yup.string()
//             .required("✖ You must enter a Password")
//             .matches(
//                 /^(?=.*[A-Z])(?=.*[0-9])(?=.*[(-/*+!@#$^&*)])/g,
//                 "✖ Must contain at least 1 upper case letter and 1 number and 1 of the following special characters ( / * - + ! @ # $ ^ & * )."
//             ),
//         password2: Yup.string()
//             .required("✖ You must enter a Password")
//             .oneOf([Yup.ref("password"), null], "✖ Passwords must match"),
//     });

//     const onSubmit = (data) => {
//         Axios.post(configData.SERVER_URL + "users/registration", data)
//             .then((response) => {
//                 console.log("IT WORKED");
//                 console.log(data);
//                 toast.success("Registered Successfully!", {
//                     position: "top-right",
//                     autoClose: 4000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     closeButton: false,
//                     progress: 0,
//                 });
//                 history.push("/login");
//             })
//             .catch((error) => {
//                 // Error
//                 if (error.response) {
//                     // The request was made and the server responded with a status code
//                     // that falls out of the range of 2xx
//                     console.log(data);
//                     console.log(error.response.data);
//                     console.log(error.response.status);
//                     console.log(error.response.headers);
//                 } else if (error.request) {
//                     // The request was made but no response was received
//                     // `error.request` is an instance of XMLHttpRequest in the
//                     // browser and an instance of
//                     // http.ClientRequest in node.js
//                     console.log(error.request);
//                 } else {
//                     // Something happened in setting up the request that triggered an Error
//                     console.log("Error", error.message);
//                 }
//                 console.log(error.config);
//             });
//     };

//     const createFirebaseUser = async () => {
//         createUserWithEmailAndPassword(auth, fireEmail, firePass).then(() => {
//             const userObj = {
//                 email: fireEmail,
//                 username: fireUser,
//                 friends: [],
//                 messages: [],
//             };

//             firebase
//                 .firestore()
//                 .collection("users")
//                 .doc(fireEmail)
//                 .set(userObj)
//                 .then(() => {
//                     history.push("/login");
//                 })
//                 .catch((error) => {
//                     // Error
//                     if (error.response) {
//                         console.log(error.response.data);
//                         console.log(error.response.status);
//                         console.log(error.response.headers);
//                     } else if (error.request) {
//                         console.log(error.request);
//                     } else {
//                         console.log("Error", error.message);
//                     }
//                     console.log(error.config);
//                 });
//         });
//     };

//     return (
//         <div className="form-container">
//             <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
//                 <Form className="reg-form">
//                     <div className="reg-card" id="part1">
//                         <p className="form-heading">Join Us!</p>

//                         <Field
//                             onBlur={(event) => {
//                                 setFireUser(event.target.value);
//                             }}
//                             className="form-input"
//                             name="username"
//                             placeholder="Enter Your Username"
//                         />
//                         <ErrorMessage className="form-error" name="username" component="span" />

//                         <Field
//                             onBlur={(event) => {
//                                 setFireEmail(event.target.value);
//                             }}
//                             className="form-input"
//                             name="email"
//                             placeholder="Enter Your Email"
//                         />
//                         <ErrorMessage className="form-error" name="email" component="span" />

//                         <Field
//                             onBlur={(event) => {
//                                 setFirePass(event.target.value);
//                             }}
//                             className="form-input"
//                             type="text"
//                             name="password"
//                             placeholder="Enter Password"
//                             onClick={validationSchema}
//                         />
//                         <ErrorMessage className="form-error" name="password" component="span" />

//                         <Field className="form-input" type="text" name="password2" placeholder="Confirm Password" />
//                         <ErrorMessage className="form-error" name="password2" component="span" />

//                         <div className="step">
//                             <label for="step2">
//                                 <div className="form-input-btn-step">
//                                     <div className="form-input-btn-step-text">Continue</div>
//                                     <AiOutlineCaretRight />
//                                 </div>
//                             </label>
//                         </div>

//                         <p className="form-input-reg">
//                             Already have an account? Login{" "}
//                             <Link className="login-link" to="/login">
//                                 here.
//                             </Link>
//                         </p>
//                     </div>
//                 </Form>
//             </Formik>

//             <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
//                 <Form className="reg-form">
//                     <div className="reg-card">
//                         <p className="form-heading">Tell us about yourself!</p>
//                         <Field
//                             id="textarea"
//                             component="textarea"
//                             className="form-input"
//                             type="text"
//                             name="description"
//                             placeholder="What are you looking for on this website?"
//                         />
//                         <Field className="form-input" name="school" placeholder="Enter School" />

//                         <Field component="select" className="form-input-select-reg" name="major">
//                             <option value="0">Select a Major</option>
//                             <option value="9">Accounting</option>
//                             <option value="10">Computer Science</option>
//                             <option value="11">Finance</option>
//                             <option value="12">Business Management</option>
//                             <option value="13">Biology</option>
//                             <option value="14">Economics</option>
//                             <option value="15">Chinese</option>
//                             <option value="16">English</option>
//                             <option value="17">Law</option>
//                             <option value="18">Physical Science</option>
//                         </Field>

//                         <div className="reg-check" role="group" aria-labelledby="my-radio-group">
//                             <Field type="radio" name="gender" value="M" id="gen1" />
//                             <label htmlFor="gen1" required>
//                                 Male
//                             </label>

//                             <Field type="radio" name="gender" value="F" id="gen2" />
//                             <label htmlFor="gen2" required>
//                                 Female
//                             </label>

//                             <Field type="radio" name="gender" value="N" id="gen3" />
//                             <label htmlFor="gen3" required>
//                                 Non-Binary
//                             </label>
//                         </div>

//                         <div className="reg-check-pref" role="group" aria-labelledby="my-radio-group">
//                             Do you Smoke?
//                             <Field type="radio" name="smoker" value="1" id="smok1" />
//                             <label htmlFor="smok1" required>
//                                 Yes
//                             </label>
//                             <Field type="radio" name="smoker" value="0" id="smok2" />
//                             <label htmlFor="smok2" required>
//                                 No
//                             </label>
//                         </div>

//                         <div className="reg-check-pref" role="group" aria-labelledby="my-radio-group">
//                             Have any Pets?
//                             <Field type="radio" name="pets" value="1" id="pet1" />
//                             <label htmlFor="pet1" required>
//                                 Yes
//                             </label>
//                             <Field type="radio" name="pets" value="0" id="pet2" />
//                             <label htmlFor="pet2" required>
//                                 No
//                             </label>
//                         </div>

//                         <div className="step-container">
//                             <div className="step">
//                                 <label for="step2">
//                                     <div className="form-input-btn-step">
//                                         <AiOutlineCaretLeft />
//                                         <div className="form-input-btn-step-text">Back</div>
//                                     </div>
//                                 </label>
//                             </div>

//                             <div className="step">
//                                 <label for="step3">
//                                     <div className="form-input-btn-step">
//                                         <div className="form-input-btn-step-text">Continue</div>
//                                         <AiOutlineCaretRight />
//                                     </div>
//                                 </label>
//                             </div>
//                         </div>

//                         <button onClick={createFirebaseUser} className="form-input-btn" type="submit">
//                             Submit
//                         </button>
//                     </div>
//                 </Form>
//             </Formik>

//             <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
//                 <Form className="reg-form">
//                     <div className="reg-card">
//                         <p className="form-heading">Join Us!</p>

//                         {/* <label class="continue">
//                             <button type="submit" class="btn btn-default btn-success btn-lg">
//                                 Submit
//                             </button>
//                         </label> */}
//                     </div>
//                 </Form>
//             </Formik>
//         </div>
//     );
// };

export default Registeration;
