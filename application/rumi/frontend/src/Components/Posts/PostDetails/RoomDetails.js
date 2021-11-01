import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import "./PostDetails.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function RoomDetails() {
    let history = useHistory();
    let { id } = useParams();
    const [postObject, setPostObject] = useState([]);
    useEffect(() => {
        Axios.get(`http://18.190.48.206:3001/posts?id=${id}`).then((response) => {
            setPostObject(response.data.results);
        });
    });

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
                                            src={`http://18.190.48.206:3001/files/download?name=${value.photo}`}
                                            alt="Missing"
                                        />
                                        <input
                                            className="room-back-button"
                                            type="submit"
                                            onClick={() => history.goBack()}
                                            value="Go Back"
                                        />
                                    </div>
                                    <div className="room-comments-container">Comments Here.....................</div>
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
                                            Posted by: <Link to={`/user/${value.id}`}>{value.id}</Link>
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
