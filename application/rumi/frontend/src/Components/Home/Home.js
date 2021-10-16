import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
    return (
        <div>
            <p>Welcome to RUMI</p>

            <Link to="/rooms">
                <p className="search-links">Find a room</p>
            </Link>
            <Link to="/roommates">
                <p className="search-links">Find a roommate</p>
            </Link>
        </div>
    );
};

export default Home;
