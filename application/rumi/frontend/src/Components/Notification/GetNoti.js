import React, { useEffect, useState } from "react";
import Axios from "axios";
import configData from "../../Configs/config.json";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = () => {
    const [noti, setNoti] = useState([]);

    useEffect(() => {
        Axios.get(configData.SERVER_URL + `notifications`)
            .then((response) => {
                setNoti(response.data.results);
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
    }, []);

    const notifySuccess = (message) => {
        console.log(message);
        toast.success(message, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            closeButton: false,
            progress: 0,
        });
    };

    return (
        <div>
            {noti
                ? noti.map((value) => (
                      <div>
                          {notifySuccess(value.text)}
                          {value.text}
                      </div>
                  ))
                : null}
        </div>
    );
};

export default Notification;