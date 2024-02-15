import React, { useState, useEffect } from "react";

const Content = ({ ingredients }) => {
    console.log(ingredients);

    useEffect(() => {
        const getRecipesByIngredients = async () => {
            const stringifyIngredients = ingredients.join(",+");
            const response = await fetch(
                `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&ingredients=${stringifyIngredients}`
            );
            const parseResponse = await response.json();
            console.log(parseResponse);
        };
        // getRecipesByIngredients();
    }, [ingredients]);

    return (
        <div className="content-container">
            <div className="content-title">Recipes</div>
            <div className="recipes-container">Recipes</div>
        </div>
    );
};

export default Content;
