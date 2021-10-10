import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Home.css";

function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [listOfPosts, setListOfPosts] = useState([]);

    let history = useHistory();
    useEffect(() => {
        axios
            .get(`http://18.190.48.206:3001/posts?search`)
            .then((response) => {
                console.log(response.data.results);
                setListOfPosts(response.data.results);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div className="home">
            <div class="search">
                <input
                    type="text"
                    class="search-text"
                    placeholder="Search a post!"
                    onChange={(event) => {
                        setSearchTerm(event.target.value);
                    }}
                />
                <button type="submit" class="search-button">
                    Search
                </button>
            </div>

            {/* Connect it to the backend */}

            <div className="category">
                <div className="search-category">
                    <p>Select Location: </p>
                    <select className="search-category-select">
                        <option>Los Angeles</option>
                        <option>San Francisco</option>
                        <option>San Diego</option>
                        <option>Finance</option>
                    </select>
                </div>

                <div className="search-category">
                    <p>Select Major: </p>
                    <select className="search-category-select">
                        <option>Computer Science</option>
                        <option>English Literature</option>
                    </select>
                </div>
            </div>

            <div className="post-container">
                {listOfPosts
                    .filter((val) => {
                        if (searchTerm === "") {
                            return val;
                        } else if (
                            val.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            val.description.toLowerCase().includes(searchTerm.toLowerCase())
                        ) {
                            return val;
                        }
                        return false;
                    })
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
                                    <div className="post-caption">{value.caption}</div>
                                    <div className="post-desc">{value.description}</div>
                                    <div className="post-date">Posted on: {value.created_date}</div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default Home;
