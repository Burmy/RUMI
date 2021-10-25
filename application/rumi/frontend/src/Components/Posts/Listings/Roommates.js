import React from "react";
import Axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Listings.css";

import Location from "./CategoryLists/Location";
import Gender from "./CategoryLists/Gender";
import RoomPref from "./CategoryLists/RoomPref";

function Roommates() {
    const [searchTerm, setSearchTerm] = useState("");
    const [listOfPosts, setListOfPosts] = useState([]);
    const [location, setLocation] = useState("");
    const [startPrice, setStartPrice] = useState("");
    const [endPrice, setEndPrice] = useState("");
    const [parking, setParking] = useState("");
    const [smoking, setSmoking] = useState("");
    const [pet, setPet] = useState("");
    const [gender, setGender] = useState("");

    let history = useHistory();
    async function getPosts() {
        Axios.get(`http://18.190.48.206:3001/users?id=1`)
            .then((response) => {
                console.log(response.data.results);
                setListOfPosts(response.data.results);
            })
            .catch((error) => {
                console.log(error, error.message, error.response);
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
                    placeholder="Start Price"
                    value={startPrice}
                    onChange={(e) => setStartPrice(e.target.value)}
                />
                <input
                    className="search-price"
                    type="text"
                    placeholder="End Price"
                    value={endPrice}
                    onChange={(e) => setEndPrice(e.target.value)}
                />
                <input className="search-button" type="submit" value="Search" />
            </form>

            <div className="post-listings">
                <div className="filter-container">
                    <div className="filter-location">
                        <div className="filter-heading">Select Location</div>
                        <Location location={setLocation} />
                    </div>
                    <div className="filter-location">
                        <div className="filter-heading">Select Gender</div>
                        <Gender gender={setGender} />
                    </div>
                    <div className="">
                        <div className="filter-heading">Select Preferences</div>
                        {/* <RoomPref parking={setParking} pet={setPet} smoking={setSmoking} /> */}
                    </div>
                </div>
                <div className="post-container">
                    {listOfPosts.map((value, key) => {
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
                                    <div className="post-info-container">
                                        <div className="post-caption">{value.username}</div>
                                        <div className="post-desc">{value.school}</div>
                                        <div className="post-desc">{value.birthday}</div>
                                        <div className="post-date">{value.created_date}</div>
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
