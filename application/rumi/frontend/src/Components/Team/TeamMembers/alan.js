import React from "react";
import photo from "../../../Assets/Members/alan.jpg"

const alan = () => {
    return (
        <div>
            <div id="heading">
                <h1>Cheng-Yu(Alan) Chuang</h1>
            </div>

            <div class="center">
                <img src={photo} alt="Cheng-Yu(Alan) Chuang" width="100%" height="100%" />
                <h2>Backend Developer</h2>
                <p>
                    I'm a backend developer and generally interested in Machine Learning and Bioinformatics.
                </p>
            </div>
        </div>
    );
};

export default alan;
