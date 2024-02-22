import React, { useState, useEffect } from "react";
import "../styling/Recipes.scss";
import missingImage from '../assets/images/missing.png';

const Recipes = ({ recipes }) => {
    const getNameFromSourceName = (sourceName) => {
        if (sourceName.includes('/')) {
            const parts = sourceName.split('/');
            const replaceCom = parts[0].replace('.com', '');
            const result = replaceCom.charAt(0).toUpperCase() + replaceCom.slice(1);
            return result;
        }
        return sourceName;
    }
    return (
        <div className="recipes-container">
            <div className="recipes-title">Random Recipes for Inspiration</div>
            <div className="recipes">
                {recipes.length ? recipes.map((recipe, index) => {
                    return (
                        <div className="recipe" key={index}>
                            <img
                                className="recipe-image"
                                src={recipe.image || missingImage}
                                alt={recipe.summary}
                            />
                            <div className="recipe-info-container">
                                <div className="recipe-title-and-where">
                                    <a href={recipe.sourceUrl}>{recipe.title.replace(/\b\w/g, (char) => char.toUpperCase())}</a>
                                    {/* <div className="recipe-name">{getNameFromSourceName(recipe.sourceName)}</div>
                                    <div className="recipe-servings">{recipe.servings} servings</div>
                                    <div className="recipe-time">{recipe.readyInMinutes} mins</div> */}
                                </div>
                            </div>
                        </div>
                    );
                }) : <div>No recipes found.</div>}
            </div>
        </div>
    );
};

export default Recipes;
