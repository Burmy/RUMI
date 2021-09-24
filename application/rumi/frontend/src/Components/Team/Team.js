import React from "react";

const Team = () => {
    const profiles = [
        {
            name: "Alex Shirazi",
            // image: OrionProfileImage,
        },
        {
            name: "Jasmine Kilani",
            // image: JohnathanProfileImage,
        },
        {
            name: "Nakulan Karthikeyan",
            // image: NyaProfileImage,
        },
        {
            name: "Joshua Miranda",
            // image: AmanProfileImage,
        },
        {
            name: "Anmol Burmy",
            // image: BrendaProfileImage,
        },
        {
            name: "Cheng-Yu(Alan) Chuang",
            // image: JainamProfileImage,
        },
        {
            name: "Rasul Imanov",
            // image: JohanaProfileImage,
        },
    ];
    return (
        <div>
            <div style={{ marginTop: 50 }}>
                <div className="heading-3">
                    <span>OUR TEAM</span>
                </div>
                <div>
                    <div>
                        {profiles.map((profile) => (
                            <div key={profile.name}>
                                {/* <img src={profile.image} /> */}
                                <div className="profileName">{profile.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Team;
