// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import Axios from "axios";
// import React from "react";

// // // const CreatePost = () => {
// // //     const initialValues = {
// // //         caption: "",
// // //         description: "",
// // //         location: "",
// // //         price: "",
// // //         parking: false,
// // //         pet: false,
// // //         smoking: false,
// // //         gender: "",
// // //     };

// // //     //Yup npm package used to do form validation
// // //     // const validationSchema = Yup.object().shape({
// // //     //     caption: Yup.string().min(3).max(15).required("✖ You must create a Cap"),
// // //     //     description: Yup.string().required("✖ You must enter an Desc"),
// // //     // });

// // //     const onSubmit = (data) => {
// // //         console.log(data);
// // //         // Axios.post("http://18.190.48.206:3001/posts", data)
// // //         //     .then((response) => {
// // //         //         console.log("IT WORKED");
// // //         //         console.log(data);
// // //         //     })
// // //         //     .catch((error) => {
// // //         //         console.error(error.response.data);
// // //         //     });
// // //     };
// // //     return (
// // //         <div className="form-container">
// // //             <Formik
// // //                 initialValues={initialValues}
// // //                 onSubmit={onSubmit}
// // //                 // validationSchema={validationSchema}
// // //             >
// // //                 <Form className="reg-card">
// // //                     <p className="form-heading">test</p>
// // //                     <Field className="form-input" name="caption" placeholder="Enter Your Caption" />
// // //                     <ErrorMessage className="form-error" name="caption" component="span" />

// // //                     <Field className="form-input" name="description" placeholder="Enter Your Description" />
// // //                     <ErrorMessage className="form-error" name="description" component="span" />

// // //                     <Field className="form-input" name="location" placeholder="Enter Your Location" />

// // //                     <select name="location">
// // //                         <option value="" label="Select a color" />
// // //                         <option value="red" label="red" />
// // //                         <option value="blue" label="blue" />
// // //                         <option value="green" label="green" />
// // //                     </select>

// // //                     <Field className="form-input" name="price" placeholder="Enter Your Price" />

// // //                     <div>
// // //                         <Field type="checkbox" name="parking" />
// // //                         Parking Available
// // //                     </div>

// // //                     <div>
// // //                         <Field type="checkbox" name="pet" />
// // //                         Pets Allowed
// // //                     </div>

// // //                     <div>
// // //                         <Field type="checkbox" name="smoking" />
// // //                         Smoking Allowed
// // //                     </div>

// // //                     <div>
// // //                         <label>
// // //                             <Field type="radio" name="gender" value="M" />
// // //                             Male
// // //                         </label>
// // //                         <label>
// // //                             <Field type="radio" name="gender" value="F" />
// // //                             Female
// // //                         </label>
// // //                         <label>
// // //                             <Field type="radio" name="gender" value="N" />
// // //                             Non-Binary
// // //                         </label>
// // //                     </div>

// // //                     <div className="form-group">
// // //                         <label for="file">File upload</label>
// // //                         <input
// // //                             id="file"
// // //                             name="file"
// // //                             type="file"
// // //                             onChange={(event) => {
// // //                                 setFieldValue("file", event.currentTarget.files[0]);
// // //                             }}
// // //                             className="form-control"
// // //                         />
// // //                         <Thumb file={values.file} />
// // //                     </div>

// // //                     <button className="form-input-btn" type="submit">
// // //                         Submit
// // //                     </button>
// // //                 </Form>
// // //             </Formik>
// // //         </div>
// // //     );
// // // };

// // // export default CreatePost;

// import { Component } from "react";

// class Thumb extends React.Component {
//     state = {
//         loading: false,
//         thumb: undefined,
//     };

//     componentWillReceiveProps(nextProps) {
//         if (!nextProps.file) {
//             return;
//         }

//         this.setState({ loading: true }, () => {
//             let reader = new FileReader();

//             reader.onloadend = () => {
//                 this.setState({ loading: false, thumb: reader.result });
//             };

//             reader.readAsDataURL(nextProps.file);
//         });
//     }

//     render() {
//         const { file } = this.props;
//         const { loading, thumb } = this.state;

//         if (!file) {
//             return null;
//         }

//         if (loading) {
//             return <p>loading...</p>;
//         }

//         return <img src={thumb} alt={file.name} className="img-thumbnail mt-2" height={200} width={200} />;
//     }
// }

// export default class CreatePost extends Component {
//     render() {
//         return (
//             <div className="container">
//                 <Formik
//                     initialValues={{
//                         caption: "",
//                         description: "",
//                         location: 1,
//                         price: "",
//                         parking: false,
//                         pet: false,
//                         smoking: false,
//                         gender: "",
//                         photo: null,
//                     }}
//                     onSubmit={(values, files) => {
//                         let formData = new FormData();
//                         const config = {
//                             header: { "content-type": "multipart/form-data" },
//                         };
//                         formData.append("file", files[0]);
//                         console.log(values);
//                         //save the Image we chose inside the Node Server
//                         Axios.post("http://18.190.48.206:3001/posts", files, config)
//                             .then((response) => {
//                                 if (response.data.success) {
//                                     console.log(response.data);
//                                 } else {
//                                     console.log(response.data);
//                                 }
//                             })
//                             .catch((error) => {
//                                 console.log(error.response);
//                             });
//                     }}
//                     // validationSchema={Yup.object().shape({
//                     //     file: Yup.mixed().required(),
//                     // })}
//                     render={({ values, handleSubmit, setFieldValue }) => {
//                         return (
//                             <div className="form-container">
//                                 <Form className="reg-card" onSubmit={handleSubmit}>
//                                     <div>
//                                         <p className="form-heading">test</p>
//                                         <Field className="form-input" name="caption" placeholder="Enter Your Caption" />
//                                         <ErrorMessage className="form-error" name="caption" component="span" />

//                                         <Field className="form-input" name="description" placeholder="Enter Your Description" />
//                                         <ErrorMessage className="form-error" name="description" component="span" />

//                                         <Field className="form-input" name="location" placeholder="Enter Your Location" />

//                                         <Field className="form-input" name="price" placeholder="Enter Your Price" />

//                                         <div>
//                                             <Field type="checkbox" name="parking" />
//                                             Parking Available
//                                         </div>

//                                         <div>
//                                             <Field type="checkbox" name="pet" />
//                                             Pets Allowed
//                                         </div>

//                                         <div>
//                                             <Field type="checkbox" name="smoking" />
//                                             Smoking Allowed
//                                         </div>

//                                         <div>
//                                             <label>
//                                                 <Field type="radio" name="gender" value="M" />
//                                                 Male
//                                             </label>
//                                             <label>
//                                                 <Field type="radio" name="gender" value="F" />
//                                                 Female
//                                             </label>
//                                             <label>
//                                                 <Field type="radio" name="gender" value="N" />
//                                                 Non-Binary
//                                             </label>
//                                         </div>
//                                         <label for="photo">File upload</label>
//                                         <input
//                                             id="photo"
//                                             name="photo"
//                                             type="file"
//                                             onChange={(event) => {
//                                                 setFieldValue("photo", event.currentTarget.files[0]);
//                                             }}
//                                         />
//                                         <Thumb file={values.photo} />
//                                     </div>
//                                     <button type="submit" className="form-input-btn">
//                                         submit
//                                     </button>
//                                 </Form>
//                             </div>
//                         );
//                     }}
//                 />
//             </div>
//         );
//     }
// }
