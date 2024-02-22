import React, { useState } from "react";
import { Link } from "react-router-dom";
import Popular from "../components/Recipes";
import Veggie from "../components/Veggie";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import "../styling/Homepage.scss";

const Homepage = () => {
    const [ingredients, setIngredients] = useState([]);
    return (
        <div className="homepage-container">
            <Sidebar
                getRecipes={(ingredients) => setIngredients(ingredients)}
            />
            <Content ingredients={ingredients} />
            {/* <h1>Homepage</h1>
            <Link to="/login">Login</Link>
            <Popular />
            <Veggie /> */}
        </div>
    );
};

export default Homepage;
