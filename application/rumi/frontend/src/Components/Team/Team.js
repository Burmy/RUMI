import React from "react";
import "./Team.css";

import { Link, useRouteMatch } from "react-router-dom";

const Team = () => {
    const { url } = useRouteMatch();

    return (
        <div>
            <div id="heading">
                <h1>Software Engineering SFSU</h1>
                <h1>Fall 2021</h1>
                <h1>Section 02</h1>
                <h1>Team 01</h1>
            </div>

            <div id="team">
                <div className="member">
                    <Link to={`${url}/alex`}>
                        <h1>Alex Shirazi</h1>
                    </Link>
                </div>

                <div className="member">
                    <Link to={`${url}/nakulan`}>
                        <h1>Nakulan Karthikeyan</h1>
                    </Link>
                </div>

                <div className="member">
                    <Link to={`${url}/jasmine`}>
                        <h1>Jasmine Kilani</h1>
                    </Link>
                </div>

                <div className="member">
                    <Link to={`${url}/josh`}>
                        <h1>Joshua Miranda</h1>
                    </Link>
                </div>

                <div className="member">
                    <Link to={`${url}/anmol`}>
                        <h1>Anmol Burmy</h1>
                    </Link>
                </div>

                <div className="member">
                    <Link to={`${url}/alan`}>
                        <h1>Cheng-Yu(Alan) Chuang</h1>
                    </Link>
                </div>

                <div className="member">
                    <Link to={`${url}/rasul`}>
                        <h1>Rasul Imanov</h1>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Team;
