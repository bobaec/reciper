import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faSearch,
    faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { pantryEssentials } from "../assets/PantryEssentials";
import "../styling/Sidebar.scss";
import Tooltip from "@mui/material/Tooltip";

const Sidebar = ({ saveIngredients, ingredients, isAuthenticated, setShowLoginModal, setShowLogoutModal }) => {
    const [currentIngredient, setCurrentIngredient] = useState("");

    const onIngredientFormSubmit = (e) => {
        e.preventDefault();
        addIngredientToPantry(currentIngredient);
    }

    const addIngredientToPantry = (ingredient) => {
        setCurrentIngredient(ingredient);
        if (!ingredients.includes(ingredient)) {
            const updatedIngredients = [...ingredients, ingredient];
            saveIngredients(updatedIngredients);
        }
        setCurrentIngredient("");
    }
    const removeIngredientFromPantry = (ingredientToRemove) => {
        const modifyAllIngredients = ingredients.filter(
            (ingredient) => ingredient !== ingredientToRemove && ingredient !== ''
        );
        saveIngredients(modifyAllIngredients);
        setCurrentIngredient("");
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
                        onSubmit={(e) => onIngredientFormSubmit(e)}
                    >
                        <FontAwesomeIcon
                            className="search-icon"
                            icon={faSearch}
                        />
                        <input
                            type="text"
                            placeholder="Enter an ingredient..."
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
                    {ingredients.length === 0 ? (
                        <div className="conditional-ingredient">
                            Enter an ingredient above or click an ingredient
                            below and it will show here
                        </div>
                    ) : null}
                    <div className="ingredients">
                        {ingredients.map((ingredient, index) => {
                            return (
                                <div
                                    className="ingredient"
                                    key={index}
                                    onClick={() => removeIngredientFromPantry(ingredient)}
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
                                    onClick={() => addIngredientToPantry(essential)}
                                >
                                    {essential}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {!isAuthenticated ?
                <div className="auth-container" onClick={() => setShowLoginModal(true)}>
                    Login
                </div> : <div className="auth-container" onClick={() => setShowLogoutModal(true)}>
                    Logout
                </div>}
        </div>
    );
};

export default Sidebar;
