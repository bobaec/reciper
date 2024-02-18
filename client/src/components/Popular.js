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
        };
        getPopular();
    }, []);
    console.log(popular);
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
                                <a href={recipe.sourceUrl}>{recipe.title.replace(/\b\w/g, (char) => char.toUpperCase())}</a>
                                <div>{recipe.sourceName}</div>
                                <div className="">You have x ingredients</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Popular;
