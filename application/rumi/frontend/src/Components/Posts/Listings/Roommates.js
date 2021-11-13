import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Listings.css";

import Major from "./CategoryLists/Major";
import Gender from "./CategoryLists/Gender";
import RoommatePref from "./CategoryLists/RoommatePref";
import { Link } from "react-router-dom";
import { BsPersonFill } from "react-icons/bs";
import { AiFillCaretRight } from "react-icons/ai";
import configData from "../../../Configs/config.json";
import Cookies from "js-cookie";

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

    let history = useHistory();

    useEffect(() => {
        async function getPosts() {
            Axios.get(
                configData.SERVER_URL +
                    `users?search=${searchTerm}&major=${major}&school=${school}&smoker=${smoking}&pet=${pet}&gender=${gender}`
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
    }, [searchTerm, major, school, smoking, pet, gender]);

    const submit = (e) => {
        e.preventDefault();
        setSearchTerm(search);
        setSchool(searchSchool);
        setMajor(searchMajor);
    };
    const deleteComment = (commentid) => {
        const data = { id: commentid };
        Axios.delete(configData.SERVER_URL + `comments`, { data })
            .then(() => {
                console.log("deleted");
                // history.push("/");
                window.location.reload();
                // toast.success("Post Deleted!", {
                //     position: "top-right",
                //     autoClose: 4000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     closeButton: false,
                //     progress: 0,
                // });
            })
            .catch((error) => {
                // Error
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
    };
    return (
        <div className="home">
            <form className="search" onSubmit={submit}>
                <Link className="search-icon" to="/rooms">
                    <BsPersonFill />
                </Link>
                <input
                    type="text"
                    className="search-text"
                    placeholder="Search a Roommate . . . "
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
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
                <input className="search-button" type="submit" value="Search" />
            </form>
            <div>{postCount}</div>
            <div className="post-listings">
                <div className="filter-toggle">
                    <label className="collapse" for="_2">
                        Filters
                        <AiFillCaretRight
                            style={{
                                position: "absolute",
                                top: "18px",
                                right: "20px",
                            }}
                        />
                    </label>
                    <input id="_2" type="checkbox" />

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
                </div>
                <div className="post-container">
                    {listOfPosts &&
                        listOfPosts
                            .slice(0)
                            .reverse()
                            .map((value, key) => {
                                // value.created_date = new Date(value.created_date).toDateString();
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
                                                <div className="user-card-desc2">Studies at {value.school}</div>
                                                <div className="user-card-desc2">Was born on {value.birthday}</div>
                                                {/* <div className="user-card-date">{value.created_date}</div> */}
                                                {Cookies.get("admin") && (
                                                    <button
                                                        className="post-delete-button"
                                                        onClick={() => {
                                                            // deleteComment(comment.id);
                                                        }}
                                                    >
                                                        Delete User
                                                    </button>
                                                )}
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
