import React, { useState } from "react";
import Axios from "axios";
import configData from "../../Configs/config.json";

const Notification = (props) => {
    const [trigger, setTrigger] = useState("");
    const data = { text: trigger };

    Axios.post(configData.SERVER_URL + "notifications/trigger", data)
        .then((response) => {
            console.log("notification sent");
        })
        .catch((error) => {
            console.log("error sending notification");
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

    const onInputChange = (event) => {
        setTrigger(event.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(trigger);
    };

    return (
        <div>
            <form className="form" noValidate onSubmit={onSubmit}>
                <input className="form-input" type="text" onChange={onInputChange} />
                <button className="form-input-btn" type="submit">
                    Log in
                </button>
            </form>
        </div>
    );
};

export default Notification;
