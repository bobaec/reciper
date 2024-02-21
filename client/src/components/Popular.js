import React, { useState, useEffect } from "react";
import "../styling/Popular.scss";
import missingImage from '../assets/images/missing.png';

const Popular = () => {
    const [popular, setPopular] = useState([]);
    useEffect(() => {
        const getPopular = async () => {
            const response = await fetch(
                `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&number=9`
            );
            const parseResponse = await response.json();
            setPopular(parseResponse.recipes);
            console.log(parseResponse.recipes);
        };
        getPopular();
    }, []);
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
        <div className="popular-recipes-container">
            <div className="popular-recipes-title">Popular</div>
            <div className="popular-recipes">
                {popular.map((recipe, index) => {
                    return (
                        <div className="popular-recipe" key={index}>
                            <img
                                className="popular-recipe-image"
                                src={recipe.image || missingImage}
                                alt={recipe.summary}
                            />
                            <div className="popular-recipe-info-container">
                                <div className="popular-recipe-title-and-where">
                                    <a href={recipe.sourceUrl}>{recipe.title.replace(/\b\w/g, (char) => char.toUpperCase())}</a>
                                    <div className="recipe-name">{getNameFromSourceName(recipe.sourceName)}</div>
                                    <div className="recipe-servings">{recipe.servings} servings</div>
                                    <div className="recipe-time">{recipe.readyInMinutes} mins</div>
                                    
                                </div>
                                <div className="popular-recipe-extra-info-container">
                                    {recipe.vegan || recipe.vegetarian ? <div className="recipe-vegan">Vegetarian</div> : null}
                                    {recipe.veryPopular ? <div className="recipe-popular">Popular</div> : null}
                                    {recipe.veryHealthyveryHealthy? <div className="recipe-healthy">Healthy</div> : null}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Popular;
