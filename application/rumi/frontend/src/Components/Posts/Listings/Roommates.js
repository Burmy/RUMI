import React from "react";
import Axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Listings.css";

import Major from "./CategoryLists/Major";
import Gender from "./CategoryLists/Gender";
import RoommatePref from "./CategoryLists/RoommatePref";

function Roommates() {
    const [searchTerm, setSearchTerm] = useState("");
    const [listOfPosts, setListOfPosts] = useState([]);
    const [major, setMajor] = useState("");
    const [school, setSchool] = useState("");
    const [smoking, setSmoking] = useState("");
    const [pet, setPet] = useState("");
    const [gender, setGender] = useState("");

    let history = useHistory();
    async function getPosts() {
        Axios.get(
            `http://18.190.48.206:3001/users?search=${searchTerm}&major=${major}&school=${school}&smoking=${smoking}&pet=${pet}&gender=${gender}`
        )

            .then((response) => {
                console.log(response.data.results);
                setListOfPosts(response.data.results);
            })
            .catch((error) => {
                // Error
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
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
    }

    const submit = (e) => {
        e.preventDefault();
        getPosts();
    };

    return (
        <div className="home">
            <form class="search" onSubmit={submit}>
                <input
                    type="text"
                    className="search-text"
                    placeholder="Search a Roommate . . . "
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <input
                    className="search-price"
                    type="text"
                    placeholder="Select School"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                />
                <div className="filter-gender">
                    <Major major={setMajor} />
                </div>
                <input className="search-button" type="submit" value="Search" />
            </form>

            <div className="post-listings">
                <div className="filter-container">
                    <div className="filter-location">
                        <div className="filter-heading">Select Gender</div>
                        <Gender gender={setGender} />
                    </div>

                    <div className="">
                        <div className="filter-heading">Select Preferences</div>
                        <RoommatePref pet={setPet} smoking={setSmoking} />
                    </div>
                </div>
                <div className="post-container">
                    {listOfPosts
                        .slice(0)
                        .reverse()
                        .map((value, key) => {
                            value.created_date = new Date(value.created_date).toDateString();
                            value.birthday = new Date(value.birthday).toDateString();
                            return (
                                <div key={value.id}>
                                    <div
                                        className="user-card"
                                        onClick={() => {
                                            history.push(`/user/${value.id}`);
                                        }}
                                    >
                                        <div className="user-card-info-container">
                                            <div className="user-card-caption">{value.username}</div>
                                            <div className="user-card-desc">{value.description}</div>
                                            <div className="user-card-desc">Studies at {value.school}</div>
                                            <div className="user-card-desc">Was born on {value.birthday}</div>
                                            <div className="user-card-date">{value.created_date}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default Roommates;
