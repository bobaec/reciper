import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faSearch,
    faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { pantryEssentials } from "../assets/PantryEssentials";
import "../styling/Sidebar.scss";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

const Sidebar = () => {
    const [currentIngredient, setCurrentIngredient] = useState("");
    const [allIngredients, setAllIngredients] = useState([]);
    const onIngredientSubmit = (e) => {
        if (typeof e !== "string") {
            e.preventDefault();
        }
        if (!allIngredients.includes(e)) {
            setAllIngredients((prevIngredients) => [
                ...prevIngredients,
                currentIngredient || e,
            ]);
        }
        setCurrentIngredient("");
    };
    const removeIngredient = (ingredientToRemove) => {
        console.log(ingredientToRemove);
        const modifyAllIngredients = allIngredients.filter(
            (ingredient) => ingredient !== ingredientToRemove
        );
        setAllIngredients(modifyAllIngredients);
    };

    return (
        <div className="sidebar-container">
            <div className="sidebar-content-container">
                <div className="sidebar-title-container">
                    <div className="sidebar-title">Pantry</div>
                    <div className="sidebar-collapse">
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                </div>
                <div className="sidebar-search-container">
                    <form
                        className="sidebar-search"
                        onSubmit={(e) => onIngredientSubmit(e)}
                    >
                        <FontAwesomeIcon
                            className="search-icon"
                            icon={faSearch}
                        />
                        <input
                            type="text"
                            placeholder="Enter an ingredient"
                            onChange={(e) =>
                                setCurrentIngredient(e.target.value)
                            }
                            value={currentIngredient}
                        />
                    </form>
                </div>
                <div className="ingredients-help-text">
                    We assume you have Salt, Pepper, and Water
                </div>
                <div className="ingredients-container">
                    <div className="ingredients-title">Your Pantry</div>
                    {allIngredients.length === 0 ? (
                        <div className="conditional-ingredient">
                            Enter an ingredient above or click an ingredient
                            below and it will show here
                        </div>
                    ) : null}
                    <div className="ingredients">
                        {allIngredients.map((ingredient, index) => {
                            return (
                                <div
                                    className="ingredient"
                                    key={index}
                                    onClick={() => removeIngredient(ingredient)}
                                >
                                    {ingredient}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="pantry-essentials-container">
                    <div className="pantry-essentials-title">
                        Pantry Essentials
                        <Tooltip title="Click an ingredient and it will be added to your pantry. These are simply common ingredients to start with.">
                            <FontAwesomeIcon
                                className="search-icon"
                                icon={faCircleInfo}
                                style={{ marginLeft: "5px" }}
                            />
                        </Tooltip>
                    </div>
                    <div className="pantry-essentials">
                        {pantryEssentials.map((essential, index) => {
                            return (
                                <div
                                    className="essential"
                                    key={index}
                                    onClick={() =>
                                        onIngredientSubmit(essential)
                                    }
                                >
                                    {essential}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="auth-container">
                <Link to="/login">Login</Link>
            </div>
        </div>
    );
};

export default Sidebar;
