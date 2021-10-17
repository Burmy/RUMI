import React from "react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Listings.css";

function Roommates() {
    const [searchTerm, setSearchTerm] = useState("");
    const [listOfPosts, setListOfPosts] = useState([]);
    const [location, setLocation] = useState("");
    const [startPrice, setStartPrice] = useState("");
    const [endPrice, setEndPrice] = useState("");
    let history = useHistory();
    async function getPosts() {
        axios
            .get(
                `http://18.190.48.206:3001/posts?search=${searchTerm}&location=${location}&pricefrom=${startPrice}&priceto=${endPrice}`
            )
            .then((response) => {
                console.log(response.data.results);
                setListOfPosts(response.data.results);
            })
            .catch((error) => {
                console.error(error);
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
                    placeholder="Search a Roommate . . ."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <input
                    className="search-price"
                    type="text"
                    placeholder="Select Major"
                    value={startPrice}
                    onChange={(e) => setStartPrice(e.target.value)}
                />
                <input
                    className="search-price"
                    type="text"
                    placeholder="Select School"
                    value={endPrice}
                    onChange={(e) => setEndPrice(e.target.value)}
                />
                <input className="search-button" type="submit" value="Search" />
            </form>
            <input className="option-button" type="submit" onClick={() => setLocation(1)} value="Pet Friendly" />
            <input className="option-button" type="submit" onClick={() => setLocation(2)} value="Smoker" />
            <input className="option-button" type="submit" onClick={() => setLocation(3)} value="Male" />
            <input className="option-button" type="submit" onClick={() => setLocation(6)} value="Female" />
            <input className="option-button" type="submit" onClick={() => setLocation(3)} value="??" />
            <input className="option-button" type="submit" onClick={() => setLocation(6)} value="??" />
            <div className="post-container">
                {listOfPosts.map((value, key) => {
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
                                    <div className="post-date">{value.created_date}</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Roommates;
