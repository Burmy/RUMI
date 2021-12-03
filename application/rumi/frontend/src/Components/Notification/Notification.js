import React from "react";
import Axios from "axios";
import configData from "../../Configs/config.json";
import { useFormik } from "formik";
import "./noti.css";

const Notification = () => {
    // Note that we have to initialize ALL of fields with values. These
    // could come from props, but since we don’t want to prefill this form,
    // we just use an empty string. If we don’t do this, React will yell
    // at us.
    const formik = useFormik({
        initialValues: {
            trigger: "",
        },

        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));
            console.log(values.trigger);

            const data = { text: values.trigger };
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
        },
    });
    return (
        <form className="noti-form" onSubmit={formik.handleSubmit}>
            <textarea
                className="noti-form-input"
                id="trigger"
                name="trigger"
                type="text"
                placeholder="Notify all the users.."
                onChange={formik.handleChange}
                value={formik.values.trigger}
            />
            <button className="noti-form-btn" type="submit">
                Notify
            </button>
        </form>
    );
};

export default Notification;
