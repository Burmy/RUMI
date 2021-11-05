import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import "./PostDetails.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { AiOutlineCaretRight } from "react-icons/ai";

function RoomDetails() {
    let history = useHistory();
    let { id } = useParams();
    const [postObject, setPostObject] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        Axios.get(`http://localhost:3001/posts?id=${id}`)
            .then((response) => {
                console.log(id, "post");
                console.log(Cookies.get("loggedUserid"), "creator");
                setPostObject(response.data.results);
                console.log(response.data.results);
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
        Axios.get(`http://localhost:3001/comments?post_id=${id}`).then((response) => {
            console.log(response.data.results);
            setComments(response.data.results);
        });
    }, [id]);

    const addComment = () => {
        Axios.post("http://localhost:3001/comments", {
            text: newComment,
            post_id: id,
            creator_id: Cookies.get("loggedUserid"),
        })
            .then((response) => {
                console.log(id, "post");
                console.log(Cookies.get("loggedUserid"), "creator");
                const commentToAdd = { text: newComment };
                setComments([...comments, commentToAdd]);
                setNewComment("");
            })
            .catch((error) => {
                console.log(id, "post");
                console.log(Cookies.get("loggedUserid"), "creator");
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
            <div className="room-container">
                {postObject.map(
                    (value, key) => (
                        // eslint-disable-next-line no-sequences
                        (value.created_date = new Date(value.created_date).toDateString()),
                        (
                            <div key={value.id}>
                                <div className="room-post-container">
                                    <div className="room-post-card">
                                        <img
                                            className="room-post-image"
                                            src={`http://localhost:3001/files/download?name=${value.photo}`}
                                            alt="Missing"
                                        />
                                        <input
                                            className="room-back-button"
                                            type="submit"
                                            onClick={() => history.push("/rooms")}
                                            value="Go Back"
                                        />
                                    </div>
                                    <div className="room-comments-container">
                                        <div className="messages">
                                            {comments
                                                .slice(0)
                                                .reverse()
                                                .map(
                                                    (comment, key) => (
                                                        // eslint-disable-next-line no-sequences
                                                        (comment.created_date = new Date(comment.created_date).toDateString()),
                                                        (
                                                            <div id="message-" key={key}>
                                                                <div className="author-text">@{comment.username}</div>
                                                                <div className="date-posted">{comment.created_date}</div>
                                                                <div className="comment-text">- {comment.text}</div>
                                                            </div>
                                                        )
                                                    )
                                                )}
                                        </div>
                                        <div className="enter-comments-container">
                                            <input
                                                className="comment-input"
                                                type="text"
                                                placeholder="Comment..."
                                                autoComplete="off"
                                                value={newComment}
                                                onChange={(event) => {
                                                    setNewComment(event.target.value);
                                                }}
                                            />
                                            <button onClick={addComment} className="comment-button">
                                                <AiOutlineCaretRight />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="room-info-container">
                                    <div className="room-info-container-caption">{value.caption}</div>
                                    <div className="room-info-container-desc">{value.description}</div>
                                    <div className="room-info-container-price">
                                        Starting from <span className="user-info-highlight">${value.price}</span>
                                    </div>
                                    <div className="room-info-main-cont">
                                        <div>Posted on: {value.created_date}</div>
                                        <div>
                                            Posted by: <Link to={`/user/${value.creator_id}`}>{value.username}</Link>
                                        </div>
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

export default RoomDetails;
