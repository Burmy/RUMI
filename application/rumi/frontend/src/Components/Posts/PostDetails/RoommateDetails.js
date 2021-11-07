import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import configData from "../../../Configs/config.json";

function RoommateDetails() {
    let { id } = useParams();
    const [userObject, setUserObject] = useState([]);
    useEffect(() => {
        Axios.get(configData.SERVER_URL + `users?id=${id}`).then((response) => {
            setUserObject(response.data.results);
            // console.log(response.data.results, "yoo");
        });
    }, [id]);
    return (
        <div>
            {id}
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
