import React from "react";
import { Link } from "react-router-dom";
import Popular from "../components/Popular";
import Veggie from "../components/Veggie";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import "../styling/Homepage.scss";

const Homepage = () => {
    return (
        <div className="homepage-container">
            <Sidebar />
            <Content />
            {/* <h1>Homepage</h1>
            <Link to="/login">Login</Link>
            <Popular />
            <Veggie /> */}
        </div>
    );
};

export default Homepage;
