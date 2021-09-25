import React from "react";
import "./Team.css";

const Team = () => {
    // const profiles = [
    //     {
    //         name: "Alex Shirazi",
    //         // image: OrionProfileImage,
    //     },
    //     {
    //         name: "Jasmine Kilani",
    //         // image: JohnathanProfileImage,
    //     },
    //     {
    //         name: "Nakulan Karthikeyan",
    //         // image: NyaProfileImage,
    //     },
    //     {
    //         name: "Joshua Miranda",
    //         // image: AmanProfileImage,
    //     },
    //     {
    //         name: "Anmol Burmy",
    //         // image: BrendaProfileImage,
    //     },
    //     {
    //         name: "Cheng-Yu(Alan) Chuang",
    //         // image: JainamProfileImage,
    //     },
    //     {
    //         name: "Rasul Imanov",
    //         // image: JohanaProfileImage,
    //     },
    // ];
    return (
        // <div>
        //     <div style={{ marginTop: 50 }}>
        //         <div className="heading-3">
        //             <span>OUR TEAM</span>
        //         </div>
        //         <div>
        //             <div>
        //                 {profiles.map((profile) => (
        //                     <div key={profile.name}>
        //                         {/* <img src={profile.image} /> */}
        //                         <div className="profileName">{profile.name}</div>
        //                     </div>
        //                 ))}
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
                <a href="members?name=alex">
                    <div class="member">
                        <h1>Alex Shirazi</h1>
                    </div>
                </a>

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
        </div>
    );
};

export default Team;
