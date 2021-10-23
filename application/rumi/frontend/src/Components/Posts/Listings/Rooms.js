import React from "react";
import Axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Listings.css";

function Rooms() {
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
        Axios.get(
            `http://18.190.48.206:3001/posts?search=${searchTerm}&location=${location}&pricefrom=${startPrice}&priceto=${endPrice}&parking=${parking}&smoking=${smoking}&pet=${pet}&gender=${gender}`
        )
            .then((response) => {
                console.log(response.data.results);
                setListOfPosts(response.data.results);
            })
            .catch((error) => {
                console.error(error);
                <p>test</p>;
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
                    placeholder="Search a Room . . . "
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
                    Select Location
                    <div className="location-filter">
                        <div>
                            <input type="radio" id="location1" name="location" onClick={() => setLocation(1)} />
                            <label className="filter-label" for="location1">
                                LA
                            </label>
                        </div>
                        <div>
                            <input type="radio" id="location2" name="location" onClick={() => setLocation(2)} />
                            <label className="filter-label" for="location2">
                                SF
                            </label>
                        </div>
                        <div>
                            <input type="radio" id="location3" name="location" onClick={() => setLocation(3)} />
                            <label className="filter-label" for="location3">
                                ??
                            </label>
                        </div>
                        <div>
                            <input type="radio" id="location4" name="location" onClick={() => setLocation(6)} />
                            <label className="filter-label" for="location4">
                                ??
                            </label>
                        </div>
                        <div>
                            <input type="radio" id="location5" name="location" onClick={() => setLocation("")} />
                            <label className="filter-label" for="location5">
                                Show All
                            </label>
                        </div>
                    </div>
                    Select Preferences
                    <div className="location-filter">
                        <div>
                            <input
                                type="radio"
                                id="pref1"
                                name="pref"
                                onClick={() => {
                                    setParking(1);
                                    setPet("");
                                    setSmoking("");
                                }}
                            />
                            <label className="filter-label" for="pref1">
                                With Parking
                            </label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="pref2"
                                name="pref"
                                onClick={() => {
                                    setPet(1);
                                    setParking("");
                                    setSmoking("");
                                }}
                            />
                            <label className="filter-label" for="pref2">
                                Pet Friendly
                            </label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="pref3"
                                name="pref"
                                onClick={() => {
                                    setSmoking(1);
                                    setParking("");
                                    setPet("");
                                }}
                            />
                            <label className="filter-label" for="pref3">
                                Smoking
                            </label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="pref4"
                                name="pref"
                                onClick={() => {
                                    setSmoking("");
                                    setParking("");
                                    setPet("");
                                }}
                            />
                            <label className="filter-label" for="pref4">
                                Reset
                            </label>
                        </div>
                        {/* <div>
                            <input type="radio" id="pref4" name="pref" onClick={() => setGender("M")} />
                            <label className="filter-label" for="pref4">
                                For Males
                            </label>
                        </div>
                        <div>
                            <input type="radio" id="pref5" name="pref" onClick={() => setGender("F")} />
                            <label className="filter-label" for="pref5">
                                For Females
                            </label>
                        </div>
                        <div>
                            <input type="radio" id="pref6" name="pref" onClick={() => setGender("N")} />
                            <label className="filter-label" for="pref6">
                                For Non Binaries
                            </label>
                        </div>
                        <div>
                            <input type="radio" id="pref7" name="pref" onClick={() => setLocation("")} />
                            <label className="filter-label" for="pref7">
                                Show All
                            </label>
                        </div> */}
                    </div>
                </div>
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
        </div>
    );
}

export default Rooms;
