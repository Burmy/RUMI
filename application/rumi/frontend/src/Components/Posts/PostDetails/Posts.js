import { React, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

function Posts() {
    let { id } = useParams();
    useEffect(() => {
        Axios.get(`http://18.190.48.206:3001/posts?id=${id}`).then((response) => {
            console.log(response.data.results);
        });
    });
    return <div>{id}</div>;
}

export default Posts;
