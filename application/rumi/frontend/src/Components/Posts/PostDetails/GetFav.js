import { React, useEffect, useState } from "react";
import Axios from "axios";
import configData from "../../../Configs/config.json";
import Cookies from "js-cookie";
export const GetFav = ({ id }) => {
    const [userFav, setUserFav] = useState([]);
    const [favCount, setFavCount] = useState([]);

    useEffect(() => {
        Axios.get(configData.SERVER_URL + `posts?id=${id}`)
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

    const unsavePost = (saveid) => {
        const data = { post_id: saveid };

        Axios.delete(configData.SERVER_URL + "favorites", data)
            .then(() => {
                console.log(saveid, "post_id");
                console.log(Cookies.get("loggedUserid"), "saved_by");
                console.log("unsaved");
                window.location.reload();
            })
            .catch((error) => {
                // Error
                console.log(saveid, "post_id");
                console.log(Cookies.get("loggedUserid"), "saved_by");
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
            {userFav &&
                userFav
                    .slice(0)
                    .reverse()
                    .map((value, key) => {
                        value.created_date = new Date(value.created_date).toDateString();
                        return (
                            <div key={value.id}>
                                <div className="post-card">
                                    <img
                                        className="post-image"
                                        src={configData.SERVER_URL + `files/download?name=${value.photo}`}
                                        alt="Missing"
                                        onClick={() => {
                                            // history.push(`/post/${value.id}`);
                                        }}
                                    />

                                    <div className="post-price-container">
                                        <div className="post-price">${value.price}</div>
                                    </div>

                                    {Cookies.get("token") && !Cookies.get("admin") && (
                                        <button
                                            className="post-save-button"
                                            onClick={() => {
                                                unsavePost(value.id);
                                            }}
                                        >
                                            {value.id}
                                            UnSave
                                        </button>
                                    )}
                                    <div
                                        className="post-info-container"
                                        onClick={() => {
                                            // history.push(`/post/${value.id}`);
                                        }}
                                    >
                                        <div className="post-caption">{value.caption}</div>
                                        <div className="post-desc">{value.description}</div>
                                        <div className="post-desc-pref">
                                            {(() => {
                                                // eslint-disable-next-line eqeqeq
                                                if (value.parking == "1") {
                                                    return <div>{/* <RiParkingBoxLine style={style} /> */}</div>;
                                                } else {
                                                    return <></>;
                                                }
                                            })()}
                                            {(() => {
                                                // eslint-disable-next-line eqeqeq
                                                if (value.pet == "1") {
                                                    return <div>{/* <MdOutlinePets style={style} /> */}</div>;
                                                } else {
                                                    return <></>;
                                                }
                                            })()}
                                            {(() => {
                                                // eslint-disable-next-line eqeqeq
                                                if (value.smoking == "1") {
                                                    return <div>{/* <FaSmoking style={style} /> */}</div>;
                                                } else {
                                                    return <></>;
                                                }
                                            })()}
                                        </div>

                                        <div className="post-date">{value.created_date}</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
        </div>
    );
};
