import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Listings.css";

import Major from "./CategoryLists/Major";
import Gender from "./CategoryLists/Gender";
import RoommatePref from "./CategoryLists/RoommatePref";
import configData from "../../../Configs/config.json";
import Cookies from "js-cookie";
import Avatar from "react-avatar";
import ReactTooltip from "react-tooltip";
import { Link } from "react-router-dom";
import { BsPersonFill } from "react-icons/bs";
import { FaSmoking } from "react-icons/fa";
import { MdOutlinePets } from "react-icons/md";
import useFullPageLoader from "../../../Helpers/Loader/UseLoader";
import { DeleteUser } from "../Delete-Edit-Save/DeleteUser";
import { BsFilter } from "react-icons/bs";
function Roommates() {
    const [listOfPosts, setListOfPosts] = useState([]);
    const [postCount, setPostCount] = useState([]);

    //searchTerm
    const [search, setSearch] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    //start price
    const [searchSchool, setSearchSchool] = useState("");
    const [school, setSchool] = useState("");

    //end price
    const [searchMajor, setSearchMajor] = useState("");
    const [major, setMajor] = useState("");

    const [smoking, setSmoking] = useState("");
    const [pet, setPet] = useState("");
    const [gender, setGender] = useState("");

    const [loader, showLoader, hideLoader] = useFullPageLoader();

    let history = useHistory();
    const filterstyle = { marginBottom: "-12px" };
    useEffect(() => {
        async function getPosts() {
            showLoader();
            Axios.get(
                configData.SERVER_URL +
                    `users?search=${searchTerm}&major=${major}&school=${school}&smoker=${smoking}&pet=${pet}&gender=${gender}`
            )

                .then((response) => {
                    hideLoader();
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
                })
                .finally(() => {});
        }
        getPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, major, school, smoking, pet, gender]);

    const submit = (e) => {
        e.preventDefault();
        setSearchTerm(search);
        setSchool(searchSchool);
        setMajor(searchMajor);
    };

    const style = { width: "32px", height: "32px" };

    return (
        <div className="home">
            <form className="search" onSubmit={submit}>
                <Link data-tip="Look for Rooms" className="search-icon" to="/rooms">
                    <BsPersonFill />
                </Link>
                <div className="filter-toggle">
                    <label className="collapse" data-tip="Filters" for="_2">
                        <BsFilter style={filterstyle} />
                    </label>
                    <input id="_2" type="checkbox" />

                    <div className="filter-container">
                        <div className="search-text-price-resp">
                            <input
                                className="search-price"
                                type="text"
                                placeholder="Select School"
                                value={searchSchool}
                                onChange={(e) => setSearchSchool(e.target.value)}
                            />
                            <div className="filter-gender">
                                <Major major={setSearchMajor} />
                            </div>
                        </div>
                        <div className="filter-location">
                            <div className="filter-heading">Select Gender</div>
                            <Gender gender={setGender} />
                        </div>

                        <div className="">
                            <div className="filter-heading">Select Preferences</div>
                            <RoommatePref pet={setPet} smoking={setSmoking} />
                        </div>
                    </div>
                </div>
                <ReactTooltip className="tooltip" place="bottom" type="dark" effect="solid" />
                <input
                    type="text"
                    className="search-text"
                    placeholder="Search a Roommate . . . "
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="search-text-price">
                    <input
                        className="search-price"
                        type="text"
                        placeholder="Select School"
                        value={searchSchool}
                        onChange={(e) => setSearchSchool(e.target.value)}
                    />
                    <div className="filter-gender">
                        <Major major={setSearchMajor} />
                    </div>
                </div>
                <input className="search-button" type="submit" value="Search" />
            </form>
            <div>{postCount}</div>

            <div className="post-listings">
                <div className="post-container">
                    {loader}
                    {listOfPosts &&
                        listOfPosts
                            .slice(0)
                            .reverse()
                            .map((value, key) => {
                                // value.created_date = new Date(value.created_date).toDateString();
                                value.birthday = new Date(value.birthday).toDateString();
                                return (
                                    <div key={value.id}>
                                        <div className="user-card">
                                            {/* only admin can delete any users */}
                                            {Cookies.get("token") && Cookies.get("admin") && <DeleteUser id={value.id} />}

                                            <div
                                                className="user-card-info-container"
                                                onClick={() => {
                                                    history.push(`/user/${value.id}`);
                                                }}
                                            >
                                                <div className="user-card-info-profile-cont">
                                                    <Avatar
                                                        className="user-card-info-profile"
                                                        name={value.username[0].split("")[0]}
                                                        round
                                                        size="200px"
                                                        color="white"
                                                        src={configData.SERVER_URL + `files/download?name=${value.photo}`}
                                                    />
                                                </div>

                                                <div className="user-card-info-cont">
                                                    <div className="user-card-caption">{value.username}</div>
                                                    <div className="user-card-desc">{value.description}</div>
                                                    <div className="post-desc-pref">
                                                        {(() => {
                                                            // eslint-disable-next-line eqeqeq
                                                            if (value.pets == "1") {
                                                                return (
                                                                    <div>
                                                                        <MdOutlinePets style={style} />
                                                                    </div>
                                                                );
                                                            } else {
                                                                return <></>;
                                                            }
                                                        })()}
                                                        {(() => {
                                                            // eslint-disable-next-line eqeqeq
                                                            if (value.smoker == "1") {
                                                                return (
                                                                    <div>
                                                                        <FaSmoking style={style} />
                                                                    </div>
                                                                );
                                                            } else {
                                                                return <></>;
                                                            }
                                                        })()}
                                                    </div>
                                                </div>
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
