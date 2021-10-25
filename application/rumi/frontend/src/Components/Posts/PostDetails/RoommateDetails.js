import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

function RoommateDetails() {
    let { id } = useParams();
    const [userObject, setUserObject] = useState([]);
    useEffect(() => {
        Axios.get(`http://18.190.48.206:3001/users?id=${id}`).then((response) => {
            setUserObject(response.data.results);
            // console.log(response.data.results, "yoo");
        });
    });
    return (
        <div>
            {/* {id} */}
            <div>
                {userObject.map(
                    (value) => (
                        (value.created_date = new Date(value.created_date).toDateString()),
                        (
                            <div className="user-container">
                                <div className="user-info-container">
                                    <div className="user-info-main">
                                        <div>
                                            {value.first_name} <span className="user-info-highlight">{value.last_name}</span>
                                        </div>
                                        <div className="user-info-main-desc">
                                            I’m a responsible roommate who is clean, and easy-going with a great credit score. I
                                            am always with my pup and I always pick up after her. She and I both are really
                                            friendly and will get along with just about anyone!
                                        </div>
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
                                <div className="user-info-container">
                                    <div className="user-info-main">Posts posted by user</div>
                                    Here
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
