import React, { useState, useEffect } from "react";
import "../styling/Content.scss";
import Recipes from "./Recipes";

const Content = ({ ingredients, isAuthenticated }) => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const getRecipesByIngredients = setTimeout(async () => {
            if (ingredients.length > 0) {
                const stringifyIngredients = ingredients.join(",");
                try {
                    const response = await fetch(
                        `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&ingredients=${stringifyIngredients}`
                    );
                    const parseResponse = await response.json();
                    setRecipes(parseResponse);
                } catch (error) {
                    console.log("getRecipesByIngredients", error.message);
                }
            } else {
                await getRandom();
            }
        }, 1000);

        const getRandom = async () => {
            try {
                const response = await fetch(
                    `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&number=9`
                );
                const parseResponse = await response.json();
                setRecipes(parseResponse.recipes);
            } catch (error) {
                console.log('getRandom', error.message);
            }
        };
        return () => clearTimeout(getRecipesByIngredients);
    }, [ingredients]);

    return (
        <div className="content-container">
            <div className="content-title">Recipes</div>
            {recipes.length ? <Recipes recipes={recipes} ingredients={ingredients} isAuthenticated={isAuthenticated} /> : null}
        </div>
    );
};

export default Content;
