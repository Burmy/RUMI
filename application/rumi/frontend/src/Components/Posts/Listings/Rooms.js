import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Listings.css";

import Location from "./CategoryLists/Location";
import Gender from "./CategoryLists/Gender";
import RoomPref from "./CategoryLists/RoomPref";
import { Link } from "react-router-dom";
import { ImHome } from "react-icons/im";

function Rooms() {
    const [listOfPosts, setListOfPosts] = useState([]);
    const [postCount, setPostCount] = useState([]);

    //searchTerm
    const [search, setSearch] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    //start price
    const [price1, setPrice1] = useState("");
    const [startPrice, setStartPrice] = useState("");

    //end price
    const [price2, setPrice2] = useState("");
    const [endPrice, setEndPrice] = useState("");

    const [location, setLocation] = useState([]);
    const [parking, setParking] = useState("");
    const [smoking, setSmoking] = useState("");
    const [pet, setPet] = useState("");
    const [gender, setGender] = useState("");

    let history = useHistory();

    useEffect(() => {
        async function getPosts() {
            Axios.get(
                `http://18.190.48.206:3001/posts?search=${searchTerm}&location=${location}&pricefrom=${startPrice}&priceto=${endPrice}&parking=${parking}&smoking=${smoking}&pet=${pet}&gender=${gender}`
            )
                .then((response) => {
                    console.log(response.data.results);
                    console.log(response.data);
                    setPostCount(response.data.message);
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
        getPosts();
    }, [searchTerm, location, startPrice, endPrice, parking, smoking, pet, gender]);

    const submit = (e) => {
        e.preventDefault();
        setSearchTerm(search);
        setStartPrice(price1);
        setEndPrice(price2);
    };

    return (
        <div className="home">
            <form className="search" onSubmit={submit}>
                <Link className="search-icon" to="/roommates">
                    <ImHome />
                </Link>
                <input
                    type="text"
                    className="search-text"
                    placeholder="Search a Room . . . "
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <input
                    className="search-price"
                    type="number"
                    placeholder="Start Price ($)"
                    value={price1}
                    onChange={(e) => setPrice1(e.target.value)}
                />
                <input
                    className="search-price"
                    type="number"
                    placeholder="End Price ($)"
                    value={price2}
                    onChange={(e) => setPrice2(e.target.value)}
                />
                <input className="search-button" type="submit" value="Search" />
            </form>
            <div>{postCount}</div>
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
                        <RoomPref parking={setParking} pet={setPet} smoking={setSmoking} />
                    </div>
                </div>
                <div className="post-container">
                    {listOfPosts
                        .slice(0)
                        .reverse()
                        .map((value, key) => {
                            value.created_date = new Date(value.created_date).toDateString();
                            return (
                                <div key={value.id}>
                                    <div
                                        className="post-card"
                                        onClick={() => {
                                            history.push(`/post/${value.id}`);
                                        }}
                                    >
                                        <img
                                            className="post-image"
                                            src={`http://18.190.48.206:3001/files/download?name=${value.photo}`}
                                            alt="Missing"
                                        />
                                        <div className="post-price-container">
                                            <div className="post-price">${value.price}</div>
                                        </div>
                                        <div className="post-info-container">
                                            <div className="post-caption">{value.caption}</div>
                                            <div className="post-desc">{value.description}</div>
                                            <div className="post-desc-pref">
                                                <div className="">{value.parking}park</div>
                                                <div className="">{value.pet}pet</div>
                                                <div className="">{value.smoking}smoke</div>
                                            </div>
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

export default Rooms;
