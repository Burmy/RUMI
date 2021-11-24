import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import configData from "../../../Configs/config.json";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineCaretLeft } from "react-icons/ai";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Avatar from "react-avatar";
import ScaleLoader from "react-spinners/ScaleLoader";
import { GetFav } from "./GetFav";

function RoommateDetails() {
    let { id } = useParams();
    let history = useHistory();
    const [userObject, setUserObject] = useState([]);
    const [userPosts, setUserPosts] = useState([]);
    const [postCount, setPostCount] = useState([]);

    const [userComments, setUserComments] = useState([]);
    const [commentsCount, setCommentsCount] = useState([]);

    const [userFav, setUserFav] = useState([]);
    const [favCount, setFavCount] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
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
            })
            .finally(() => {
                setLoading(false);
            });

        Axios.get(configData.SERVER_URL + `posts?creator_id=${id}`)
            .then((response) => {
                console.log(response.data.results);
                setUserPosts(response.data.results);
                setPostCount(response.data.message);
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

        Axios.get(configData.SERVER_URL + `comments?creator_id=${id}`)
            .then((response) => {
                console.log(response.data.results);
                setUserComments(response.data.results);
                setCommentsCount(response.data.message);
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

        Axios.get(configData.SERVER_URL + `favorites?saved_by=${id}`)
            .then((response) => {
                console.log(response.data.results);
                setUserFav(response.data.results);
                setFavCount(response.data.message);
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
                window.location.reload();
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

    const deleteComment = (commentid) => {
        const data = { id: commentid };
        Axios.delete(configData.SERVER_URL + `comments`, { data })
            .then(() => {
                console.log("deleted");
                window.location.reload();
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
                <div>
                    {userObject.map(
                        (value, key) => (
                            // eslint-disable-next-line no-sequences
                            (value.created_date = new Date(value.created_date).toDateString()),
                            (
                                <div key={value.id} className="user-container">
                                    <div className="user-info-plus-back">
                                        <div class="back-link">
                                            <span class="addText">Go Back</span>
                                            <AiOutlineCaretLeft
                                                style={style}
                                                className="room-back-button"
                                                onClick={() => history.goBack()}
                                            />
                                        </div>
                                        <div className="user-info-container">
                                            <div className="user-info-main">
                                                <Avatar
                                                    className="user-info-profile"
                                                    name={value.username[0].split("")[0]}
                                                    round
                                                    size="240px"
                                                    color="white"
                                                    src={configData.SERVER_URL + `files/download?name=${value.photo}`}
                                                />
                                                <div className="user-info-main-main">
                                                    {value.username}{" "}
                                                    <span className="user-info-highlight">{value.last_name}</span>
                                                </div>
                                                <div className="user-info-main-desc">{value.description}</div>
                                            </div>
                                            <ul className="user-info-sub">
                                                <li>
                                                    {value.first_name} goes to{" "}
                                                    <span className="user-info-highlight">{value.school}</span>.
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
                                                    {value.first_name} loves{" "}
                                                    <span className="user-info-highlight">{value.hobbies}</span>.
                                                </li>
                                            </ul>
                                            <div className="user-info-main-cont">
                                                Contact - {value.phone}, {value.email}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="user-info-posts-container">
                                        <div className="user-info-posts-heading">{value.username}'s </div>
                                        <Tabs>
                                            <TabList>
                                                <Tab>Posts</Tab>
                                                <Tab>Comments</Tab>
                                                <Tab>Favorites</Tab>
                                            </TabList>

                                            <TabPanel>
                                                <div>{postCount}</div>
                                                <div className="user-info-container-posts">
                                                    {userPosts &&
                                                        userPosts
                                                            .slice(0)
                                                            .reverse()
                                                            .map((value, key) => {
                                                                value.created_date = new Date(value.created_date).toDateString();
                                                                return (
                                                                    <div key={value.id}>
                                                                        <div className="post-card">
                                                                            <img
                                                                                className="post-image"
                                                                                src={
                                                                                    configData.SERVER_URL +
                                                                                    `files/download?name=${value.photo}`
                                                                                }
                                                                                alt="Missing"
                                                                                onClick={() => {
                                                                                    history.push(`/post/${value.id}`);
                                                                                }}
                                                                            />

                                                                            <div className="post-price-container">
                                                                                <div className="post-price">${value.price}</div>
                                                                            </div>
                                                                            {/* only logged in user can delete their posts */}
                                                                            {Cookies.get("token") &&
                                                                                Cookies.get("username") === value.username && (
                                                                                    <button
                                                                                        className="post-delete-button"
                                                                                        onClick={() => {
                                                                                            deletePost(value.id);
                                                                                        }}
                                                                                    >
                                                                                        Delete
                                                                                    </button>
                                                                                )}
                                                                            <div
                                                                                className="post-info-container"
                                                                                onClick={() => {
                                                                                    history.push(`/post/${value.id}`);
                                                                                }}
                                                                            >
                                                                                <div className="post-caption">
                                                                                    {value.caption}
                                                                                </div>
                                                                                <div className="post-desc">
                                                                                    {value.description}
                                                                                </div>
                                                                                {/* <div className="post-desc-pref">
                                                                        <div className="">{value.parking}park</div>
                                                                        <div className="">{value.pet}pet</div>
                                                                        <div className="">{value.smoking}smoke</div>
                                                                    </div> */}

                                                                                <div className="post-date">
                                                                                    {value.created_date}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                </div>
                                            </TabPanel>
                                            <TabPanel>
                                                <div style={{ marginBottom: `50px` }}>{commentsCount}</div>
                                                <div>
                                                    {userComments
                                                        ? userComments
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
                                                                              <div className="author-text">
                                                                                  @{comment.username}
                                                                              </div>
                                                                              <div className="date-posted">
                                                                                  {comment.created_date}
                                                                              </div>
                                                                              <div
                                                                                  className="comment-text"
                                                                                  onClick={() => {
                                                                                      history.push(`/post/${comment.post_id}`);
                                                                                  }}
                                                                                  style={{ cursor: `pointer` }}
                                                                              >
                                                                                  - {comment.text}
                                                                              </div>
                                                                              {Cookies.get("token") &&
                                                                                  Cookies.get("username") === value.username && (
                                                                                      <button
                                                                                          className="comment-delete-button"
                                                                                          onClick={() => {
                                                                                              deleteComment(comment.id);
                                                                                          }}
                                                                                      >
                                                                                          Delete
                                                                                      </button>
                                                                                  )}
                                                                          </div>
                                                                      )
                                                                  )
                                                              )
                                                        : null}
                                                </div>
                                            </TabPanel>
                                            <TabPanel>
                                                <div>{favCount}</div>
                                                <div className="user-info-container-posts">
                                                    {userFav &&
                                                        userFav
                                                            .slice(0)
                                                            .reverse()
                                                            .map((value, key) => {
                                                                value.created_date = new Date(value.created_date).toDateString();
                                                                return (
                                                                    <div key={value.id}>
                                                                        <GetFav key={key} id={value.post_id} />
                                                                    </div>
                                                                );
                                                            })}
                                                </div>
                                            </TabPanel>
                                        </Tabs>
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

export default RoommateDetails;
