import React from "react";
import { useParams } from "react-router-dom";
import "./Team.js";

const Members = () => {
    let { members } = useParams();

    return (
        <div>
            {members}
            testtt
        </div>
    );
};

export default Members;
