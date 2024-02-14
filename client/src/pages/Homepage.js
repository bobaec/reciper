import React from "react";
import { Link } from "react-router-dom";
import Popular from "../components/Popular";
import Veggie from "../components/Veggie";
const Homepage = () => {
    return (
        <div>
            <h1>Homepage</h1>
            <Link to="/login">Login</Link>
            <Popular />
            <Veggie />
        </div>
    );
};

export default Homepage;
