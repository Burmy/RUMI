import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import configData from "../../../Configs/config.json";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function RoommateDetails() {
    let { id } = useParams();
    let history = useHistory();
    const [userObject, setUserObject] = useState([]);
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        Axios.get(configData.SERVER_URL + `users?id=${id}`)
            .then((response) => {
                setUserObject(response.data.results);
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
        Axios.get(configData.SERVER_URL + `posts?creator_id=${id}`)
            .then((response) => {
                console.log(response.data.results);
                setUserPosts(response.data.results);
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
    }, [id]);

    const deletePost = (postid) => {
        const data = { id: postid };
        Axios.delete(configData.SERVER_URL + `posts`, { data })
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
        <div>
            <div>
                {userObject.map(
                    (value, key) => (
                        // eslint-disable-next-line no-sequences
                        (value.created_date = new Date(value.created_date).toDateString()),
                        (
                            <div key={value.id} className="user-container">
                                <div className="user-info-container">
                                    <div className="user-info-main">
                                        <div>
                                            {value.username} <span className="user-info-highlight">{value.last_name}</span>
                                        </div>
                                        <div className="user-info-main-desc">{value.description}</div>
                                    </div>
                                    <ul className="user-info-sub">
                                        <li>
                                            {value.first_name} goes to <span className="user-info-highlight">{value.school}</span>
                                            .
                                        </li>
                                        <li>
                                            {value.first_name} speaks{" "}
                                            <span className="user-info-highlight">{value.language}</span>.
                                        </li>
                                        <li>
                                            {value.first_name} is interested in{" "}
                                            <span className="user-info-highlight">{value.interests}</span>.
                                        </li>
                                        <li>
                                            {value.first_name} loves <span className="user-info-highlight">{value.hobbies}</span>.
                                        </li>
                                    </ul>
                                    <div className="user-info-main-cont">
                                        Contact - {value.phone}, {value.email}
                                    </div>
                                </div>
                                <div className="user-info-posts-container">
                                    <div className="user-info-posts-heading">{value.username}'s Posts</div>
                                    <div className="user-info-container-posts">
                                        {userPosts &&
                                            userPosts
                                                .slice(0)
                                                .reverse()
                                                .map((value, key) => {
                                                    value.created_date = new Date(value.created_date).toTimeString();
                                                    return (
                                                        <div key={value.id}>
                                                            <div
                                                                className="post-card"
                                                                // onClick={() => {
                                                                //     history.push(`/post/${value.id}`);
                                                                // }}
                                                            >
                                                                <img
                                                                    className="post-image"
                                                                    src={
                                                                        configData.SERVER_URL +
                                                                        `files/download?name=${value.photo}`
                                                                    }
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

                                                                {Cookies.get("username") === value.username && (
                                                                    <button
                                                                        className="post-delete-button"
                                                                        onClick={() => {
                                                                            deletePost(value.id);
                                                                        }}
                                                                    >
                                                                        Delete Post
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                    </div>
                                </div>
                            </div>
                        )
                    )
                )}
            </div>
        </div>
    );
}

export default RoommateDetails;
