// import React, { useState } from "react";
// import FileUpload from "./FileUpload";
// import Axios from "axios";
// const Location = [
//     { key: 1, value: "Daly City" },
//     { key: 2, value: "San Francisco" },
//     { key: 3, value: "South San Francisco" },
//     { key: 4, value: "Berkeley" },
//     { key: 5, value: "Oakland" },
//     { key: 6, value: "Alameda" },
//     { key: 7, value: "San Mateo" },
//     { key: 8, value: "San Leandro" },
// ];

// const CreatePost = (props) => {
//     const [caption, setCaption] = useState("");
//     const [description, setDescription] = useState("");
//     const [price, setPrice] = useState(0);
//     const [location, setLocation] = useState(1);

//     const [Images, setImages] = useState([]);

//     const onCaptionChange = (event) => {
//         setCaption(event.currentTarget.value);
//     };

//     const onDescriptionChange = (event) => {
//         setDescription(event.currentTarget.value);
//     };

//     const onPriceChange = (event) => {
//         setPrice(event.currentTarget.value);
//     };

//     const onLocationChange = (event) => {
//         setLocation(event.currentTarget.value);
//     };

//     const updateImages = (newImages) => {
//         setImages(newImages);
//     };

//     const onSubmit = (event) => {
//         event.preventDefault();

//         // if (!TitleValue || !DescriptionValue || !PriceValue ||
//         //     !ContinentValue || !Images) {
//         //     return alert('fill all the fields first!')
//         // }

//         const variables = {
//             // writer: props.user.userData._id,
//             caption: caption,
//             description: description,
//             price: price,
//             images: Images,
//             location: location,
//         };
//         console.log(variables);
//         Axios.post("http://18.190.48.206:3001/posts", variables).then((response) => {
//             if (response.data.success) {
//                 alert("Product Successfully Uploaded");
//                 props.history.push("/");
//             } else {
//                 alert("Failed to upload Product");
//             }
//         });
//     };

//     return (
//         <div className="form-container">
//             <form className="reg-card">
//                 <p className="form-heading">test</p>
//                 <input
//                     className="form-input"
//                     onChange={onCaptionChange}
//                     value={caption}
//                     name="caption"
//                     placeholder="Enter Your Caption"
//                 />
//                 {/* <ErrorMessage className="form-error" name="caption" component="span" /> */}

//                 <input
//                     className="form-input"
//                     onChange={onDescriptionChange}
//                     value={description}
//                     name="description"
//                     placeholder="Enter Your Description"
//                 />
//                 {/* <ErrorMessage className="form-error" name="description" component="span" /> */}

//                 <input
//                     className="form-input"
//                     type="number"
//                     onChange={onPriceChange}
//                     value={price}
//                     name="price"
//                     placeholder="Enter Your Price($)"
//                 />

//                 <select className="form-input" onChange={onLocationChange} value={location}>
//                     {Location.map((item) => (
//                         <option key={item.key} value={item.key}>
//                             {item.value}{" "}
//                         </option>
//                     ))}
//                 </select>

//                 {/* <div>
//                     <input type="checkbox" name="parking" />
//                     Parking Available
//                 </div>

//                 <div>
//                     <input type="checkbox" name="pet" />
//                     Pets Allowed
//                 </div>

//                 <div>
//                     <input type="checkbox" name="smoking" />
//                     Smoking Allowed
//                 </div>

//                 <div>
//                     <label>
//                         <input type="radio" name="gender" value="M" />
//                         Male
//                     </label>
//                     <label>
//                         <input type="radio" name="gender" value="F" />
//                         Female
//                     </label>
//                     <label>
//                         <input type="radio" name="gender" value="N" />
//                         Non-Binary
//                     </label>
//                 </div> */}

//                 <div className="form-group">
//                     <label for="file">File upload</label>
//                 </div>

//                 <FileUpload refreshFunction={updateImages} />

//                 <button className="form-input-btn" type="submit" onClick={onSubmit}>
//                     Submit
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default CreatePost;
