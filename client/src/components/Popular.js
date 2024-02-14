import React, { useState, useEffect } from "react";

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
        <div>
            <h1>Popular</h1>
            <div className="popular-recipes-container">
                {popular.map((recipe, index) => {
                    return (
                        <div key={index}>
                            <p>{recipe.title}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Popular;
