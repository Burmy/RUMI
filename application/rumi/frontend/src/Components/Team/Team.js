import React from "react";
import "./Team.css";
import Members from "./Members";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";

const Team = () => {
    const { path, url } = useRouteMatch();

    // const members = [
    //     {
    //         name: "Alex Shirazi",
    //         // image: AlexProfileImage,
    //     },
    //     {
    //         name: "Jasmine Kilani",
    //     },
    //     {
    //         name: "Nakulan Karthikeyan",
    //     },
    //     {
    //         name: "Joshua Miranda",
    //     },
    //     {
    //         name: "Anmol Burmy",
    //     },
    //     {
    //         name: "Cheng-Yu(Alan) Chuang",
    //     },
    //     {
    //         name: "Rasul Imanov",
    //     },
    // ];
    return (
        // <div>
        //     <div style={{ marginTop: 50 }}>
        //         <div>
        //             <div id="heading">
        //                 <h1>Software Engineering SFSU</h1>
        //                 <h1>Fall 2021</h1>
        //                 <h1>Section 02</h1>
        //                 <h1>Team 01</h1>
        //             </div>
        //         </div>
        //         <div>
        //             <div>
        //                 <div id="team">
        //                     {members.map((profile) => (
        //                         <div class="member">
        //                             <Link to={``}>
        //                                 <div key={profile.name}>
        //                                     {/* <img src={profile.image} /> */}
        //                                     <div>{profile.name}</div>
        //                                 </div>
        //                             </Link>
        //                         </div>
        //                     ))}
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <div>
            <div id="heading">
                <h1>Software Engineering SFSU</h1>
                <h1>Fall 2021</h1>
                <h1>Section 02</h1>
                <h1>Team 01</h1>
            </div>

            <div id="team">
                <div class="member">
                    <Link to={`${url}/alex`}>
                        <h1>Alex Shirazi</h1>
                    </Link>
                </div>

                <a href="members?name=nakulan">
                    <div class="member">
                        <h1>Nakulan Karthikeyan</h1>
                    </div>
                </a>

                <a href="members?name=jasmine">
                    <div class="member">
                        <h1>Jasmine Kilani</h1>
                    </div>
                </a>

                <a href="members?name=josh">
                    <div class="member">
                        <h1>Joshua Miranda</h1>
                    </div>
                </a>

                <a href="members?name=anmol">
                    <div class="member">
                        <h1>Anmol Burmy</h1>
                    </div>
                </a>

                <a href="members?name=alan">
                    <div class="member">
                        <h1>Cheng-Yu(Alan) Chuang</h1>
                    </div>
                </a>

                <a href="members?name=rasul">
                    <div class="member">
                        <h1>Rasul Imanov</h1>
                    </div>
                </a>
            </div>

            <Switch>
                <Route path={`${path}/:members`}>
                    <Members />
                </Route>
            </Switch>
        </div>
    );
};

export default Team;
