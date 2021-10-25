import React, { Component } from "react";
import Axios from "axios";
import "./CreatePost.css";

class CreatePost extends Component {
    render() {
        var caption;
        var description;
        var price;
        var creator_id;
        return (
            <div className="form-container">
                <div className="upload-card">
                    <form>
                        <p className="form-heading">Post</p>

                        <div class="upload-container">
                            <div class="upload-image">
                                <label for="upload">Upload your Image:</label>
                                <input type="file" id="photo" accept="image/jpg,image/jpeg,image/png" />
                            </div>

                            <div class="upload-info">
                                <input
                                    className="form-input"
                                    value={caption}
                                    name="caption"
                                    placeholder="Enter Your Caption"
                                    onChange={(word) => {
                                        caption = word.target.value;
                                    }}
                                />
                                <input
                                    className="form-input"
                                    value={description}
                                    onChange={(des) => {
                                        description = des.target.value;
                                    }}
                                    name="description"
                                    placeholder="Enter Your Description"
                                />

                                <div class="upload-info-price">
                                    <input
                                        className="form-input"
                                        type="number"
                                        value={price}
                                        onChange={(money) => {
                                            price = money.target.value;
                                        }}
                                        name="price"
                                        placeholder="Enter Your Price($)"
                                    />

                                    <select className="form-input" name="location" id="location">
                                        <option value="0" selected disabled>
                                            Select a Location
                                        </option>
                                        <option value="1">Daly City</option>
                                        <option value="2">San Francisco</option>
                                        <option value="3">South San Francisco</option>
                                        <option value="4">Berkeley</option>
                                        <option value="5">Oakland</option>
                                        <option value="6">Alameda</option>
                                        <option value="7">San Mateo</option>
                                        <option value="8">San Leandro</option>
                                    </select>
                                </div>

                                <div className="upload-info-pref">
                                    <div>
                                        <div className="upload-info-pref-heading">Parking Allowed?</div>
                                        <div className="upload-info-pref-values">
                                            <input type="radio" id="p1" name="park" value="1" /> Yes
                                            <input type="radio" id="p2" name="park" value="0" /> No
                                        </div>
                                    </div>

                                    <div>
                                        <div className="upload-info-pref-heading">Pets Allowed?</div>
                                        <div className="upload-info-pref-values">
                                            <input type="radio" id="pe1" name="pet" value="1" /> Yes
                                            <input type="radio" id="pe2" name="pet" value="0" /> No
                                        </div>
                                    </div>

                                    <div>
                                        <div className="upload-info-pref-heading">Smoking Allowed</div>
                                        <div className="upload-info-pref-values">
                                            <input type="radio" id="s1" name="smoke" value="1" /> Yes
                                            <input type="radio" id="s2" name="smoke" value="0" /> No
                                        </div>
                                    </div>

                                    <div>
                                        <div className="upload-info-pref-heading">Gender Specific?</div>
                                        <div className="upload-info-pref-values">
                                            <input type="radio" id="g1" name="gender" value="M" /> Male
                                            <input type="radio" id="g2" name="gender" value="F" /> Female
                                            <input type="radio" id="g2" name="gender" value="N" /> Non-Binary
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div>
                        <button
                            type="submit"
                            className="form-input-btn"
                            onClick={() => {
                                if (!caption || !caption.length || !description || !description.length || !price) {
                                    return alert("You must fill the form to continue.");
                                } else {
                                    var photo = document.getElementById("photo");
                                    var form = new FormData();
                                    form.append("caption", caption);
                                    form.append("description", description);
                                    form.append("price", price);
                                    form.append("location", document.getElementById("location").value);
                                    form.append("parking", document.querySelector('input[name="park"]:checked').value);
                                    form.append("pet", document.querySelector('input[name="pet"]:checked').value);
                                    form.append("smoking", document.querySelector('input[name="smoke"]:checked').value);
                                    form.append("gender", document.querySelector('input[name="gender"]:checked').value);
                                    form.append("creator_id", 1);
                                    form.append("photo", photo.files[0]);

                                    console.log(
                                        form.getAll("caption"),
                                        form.getAll("description"),
                                        form.getAll("price"),
                                        form.getAll("location"),
                                        form.getAll("parking"),
                                        form.getAll("pet"),
                                        form.getAll("smoking"),
                                        form.getAll("gender"),
                                        form.getAll("creator_id"),
                                        form.getAll("photo")
                                    );
                                    Axios.post("http://18.190.48.206:3001/posts/", form, {
                                        headers: { "content-type": "multipart/form-data" },
                                    })
                                        .then((result) => {
                                            console.log(result);
                                            alert("Successfully Posted");
                                        })
                                        .catch((error) => {
                                            console.log(error.response);
                                        });
                                }
                            }}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
export default CreatePost;
