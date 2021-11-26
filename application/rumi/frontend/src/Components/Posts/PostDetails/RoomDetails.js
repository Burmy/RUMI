import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import "./PostDetails.css";
import { Link } from "react-router-dom";
import MapContainer from "../../Map/MapContainer.js";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { AiOutlineCaretRight } from "react-icons/ai";
import configData from "../../../Configs/config.json";
import { AiOutlineCaretLeft } from "react-icons/ai";
import UseAnimations from "react-useanimations";
import trash2 from "react-useanimations/lib/trash2";
import ScaleLoader from "react-spinners/ScaleLoader";

function RoomDetails() {
    let history = useHistory();
    let { id } = useParams();
    const [postObject, setPostObject] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        Axios.get(configData.SERVER_URL + `posts?id=${id}`)
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
            })
            .finally(() => {
                setLoading(false);
            });

        Axios.get(configData.SERVER_URL + `comments?post_id=${id}`)
            .then((response) => {
                console.log(response.data.results);
                setComments(response.data.results);
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

    const addComment = () => {
        Axios.post(configData.SERVER_URL + "comments", {
            text: newComment,
            post_id: id,
            creator_id: Cookies.get("loggedUserid"),
        })
            .then(() => {
                window.location.reload(); //comments dont update untill page is reloaded
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

    const style = { width: "37px", height: "37px" };
    return (
        <div>
            {loading ? (
                <div>
                    <div className="loading">
                        <ScaleLoader
                            className={loading}
                            height={50}
                            width={8}
                            radius={0}
                            margin={2}
                            color="#1da699"
                            speedMultiplier={1.7}
                        />
                        <div className="loading">Loading...</div>
                    </div>
                </div>
            ) : (
                <div className="room-container">
                    <div class="back-link">
                        <span class="addText">Go Back</span>
                        <AiOutlineCaretLeft style={style} className="room-back-button" onClick={() => history.goBack()} />
                    </div>

                    {postObject.map(
                        (value, key) => (
                            // eslint-disable-next-line no-sequences
                            (value.created_date = new Date(value.created_date).toDateString()),
                            (
                                <div className="room-detail-container" key={value.id}>
                                    <div className="room-post-container">
                                        <div className="room-post-card">
                                            <img
                                                className="room-post-image"
                                                src={configData.SERVER_URL + `files/download?name=${value.photo}`}
                                                alt="Missing"
                                            />
                                        </div>
                                        <div className="room-comments-container">
                                            <div className="messages">
                                                <div className="nocomm">No Comments Yet!</div>
                                                {comments
                                                    ? comments
                                                          .slice(0)
                                                          .reverse()
                                                          .map(
                                                              (comment, key) => (
                                                                  // eslint-disable-next-line no-sequences
                                                                  (comment.created_date = new Date(
                                                                      comment.created_date
                                                                      // eslint-disable-next-line no-sequences
                                                                  ).toDateString()),
                                                                  (
                                                                      <div id="message-" key={key}>
                                                                          <div className="author-text">@{comment.username}</div>
                                                                          <div className="date-posted">
                                                                              {comment.created_date}
                                                                          </div>
                                                                          <div className="comment-text">- {comment.text}</div>
                                                                          {Cookies.get("token") && Cookies.get("admin") && (
                                                                              <div className="export-btn">
                                                                                  <UseAnimations
                                                                                      animation={trash2}
                                                                                      size={35}
                                                                                      className="comment-delete-button"
                                                                                      onClick={() => {
                                                                                          deleteComment(comment.id);
                                                                                      }}
                                                                                  />
                                                                              </div>
                                                                          )}
                                                                      </div>
                                                                  )
                                                              )
                                                          )
                                                    : null}
                                            </div>
                                            {Cookies.get("token") && Cookies.get("username") && (
                                                <div className="enter-comments-container">
                                                    <input
                                                        className="comment-input"
                                                        type="text"
                                                        placeholder="Comment Here..."
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
                                            )}
                                        </div>
                                    </div>
                                    <div className="room-info-container">
                                        <div className="room-info-container-caption">{value.caption}</div>
                                        <div className="room-info-container-desc">{value.description}</div>
                                        {/* <div className="room-info-container-desc">lat = {value.latitude}</div>
                                    <div className="room-info-container-desc">long = {value.longitude}</div> */}
                                        <div className="room-info-container-price">
                                            Starting from <span className="user-info-highlight">${value.price}</span>
                                        </div>
                                        <div className="room-info-main-cont">
                                            <div>Posted on: {value.created_date}</div>
                                            <div>
                                                Posted by: <Link to={`/user/${value.creator_id}`}>{value.username}</Link>
                                            </div>
                                            <Link className="offer-button" to={`/chat/${value.email}`}>
                                                Offer
                                            </Link>
                                        </div>
                                    </div>

                                    <div>
                                        <h1>Map</h1>
                                        <MapContainer />
                                    </div>
                                </div>
                            )
                        )
                    )}
                </div>
            )}
        </div>
    );
}

export default RoomDetails;
