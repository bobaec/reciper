import React, { useState, useEffect } from "react";
import "../styling/Content.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Popular from "./Popular";

const Content = ({ ingredients }) => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const getRecipesByIngredients = setTimeout(async () => {
            const stringifyIngredients = ingredients.join(",+");
            try {
                const response = await fetch(
                    `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&ingredients=${stringifyIngredients}`
                );
                const parseResponse = await response.json();
                setRecipes(parseResponse);
            } catch (error) {
                console.log("getrecipebyingredients", error.message);
            }
        }, 1000);
        return () => clearTimeout(getRecipesByIngredients);
    }, [ingredients]);

    return (
        <div className="content-container">
            <div className="content-title">Recipes</div>
            <div className="content-search-container">
                <form
                    className="content-search"
                    // onSubmit={(e) => onIngredientSubmit(e)}
                >
                    <FontAwesomeIcon className="search-icon" icon={faSearch} />
                    <input
                        type="text"
                        placeholder="Find a recipe..."
                        // onChange={(e) => setCurrentIngredient(e.target.value)}
                        // value={currentIngredient}
                    />
                </form>
            </div>
            <Popular />
        </div>
    );
};

export default Content;
