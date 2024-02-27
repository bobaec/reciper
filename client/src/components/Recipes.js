import React, { useState, useEffect } from "react";
import "../styling/Recipes.scss";
import missingImage from '../assets/images/missing.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faFlag,
    faHeart,
} from "@fortawesome/free-solid-svg-icons";
import RecipeModal from "./RecipeModal";

const Recipes = ({ recipes, ingredients }) => {
    const [show, setShow] = useState(false);
    const [currentRecipe, setCurrentRecipe] = useState({});
    const openRecipeModal = (recipe) => {
        setShow(true);
        setCurrentRecipe(recipe);
    }
    return (
        <div className="recipes-container">
            <div className="recipes-title">Random Recipes for Inspiration</div>
            <div className="recipes">
                {recipes?.length ? recipes.map((recipe, index) => {
                    const { image, summary, sourceUrl, title, likes, missedIngredients, usedIngredients } = recipe;
                    return (
                        <div className="recipe" key={index} onClick={() => openRecipeModal(recipe)}>
                            <img
                                className="recipe-image"
                                src={image || missingImage}
                                alt={summary}
                            />
                            <div className="recipe-info-container">
                                <div className="recipe-title-and-where">
                                    <a href={sourceUrl}>{title.replace(/\b\w/g, (char) => char.toUpperCase())}</a>
                                    {/* <div className="recipe-name">{getNameFromSourceName(recipe.sourceName)}</div>
                                    <div className="recipe-servings">{recipe.servings} servings</div>
                                    <div className="recipe-time">{recipe.readyInMinutes} mins</div> */}
                                </div>
                                <div className="recipe-icon-container">
                                    {ingredients?.length ? <div className="recipe-used-ingredients">
                                        <FontAwesomeIcon icon={faCheck} /> {usedIngredients?.length}
                                    </div> : null}
                                    {ingredients?.length ? <div className="recipe-missed-ingredients">
                                        <FontAwesomeIcon icon={faFlag} /> {missedIngredients?.length}
                                    </div> : null}
                                    <div className="recipe-number-of-likes">
                                        <FontAwesomeIcon icon={faHeart} /> {likes || recipe.aggregateLikes}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }) : <div>No recipes found.</div>}
            </div>
            {currentRecipe?.id ? <RecipeModal show={show} setShow={setShow} recipe={currentRecipe} /> : null}
        </div>
    );
};

export default Recipes;
