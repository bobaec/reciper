import React, { useState, useEffect } from "react";
import "../styling/Content.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Recipes from "./Recipes";

const Content = ({ ingredients }) => {
    const [recipes, setRecipes] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const getRecipesByIngredients = setTimeout(async () => {
            if (ingredients.length > 0) {
                const stringifyIngredients = ingredients.join(",+");
                try {
                    const response = await fetch(
                        `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&ingredients=${stringifyIngredients}`
                    );
                    const parseResponse = await response.json();
                    setRecipes(parseResponse);
                    console.log(parseResponse);
                } catch (error) {
                    console.log("getRecipesByIngredients", error.message);
                }
            }
        }, 1000);

        return () => clearTimeout(getRecipesByIngredients);
    }, [ingredients]);

    useEffect(() => {
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
        getRandom();
    }, [ingredients]);

    const onSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            const stringifyIngredients = ingredients.join(",+");
            const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&query=${searchText}&addRecipeInformation=true&addRecipeNutrition=true&includeIngredients=${stringifyIngredients}&fillIngredients=true`);
            const parseResponse = await response.json();
            const results = parseResponse.results;
            setRecipes(results);
            console.log(results);
        } catch (error) {
            console.log('onSearchSubmit', error.message);
        }
    }
    return (
        <div className="content-container">
            <div className="content-title">Recipes</div>
            <div className="content-search-container">
                <form
                    className="content-search"
                    onSubmit={(e) => onSearchSubmit(e)}
                >
                    <FontAwesomeIcon className="search-icon" icon={faSearch} />
                    <input
                        type="text"
                        placeholder="Find a recipe..."
                        onChange={(e) => setSearchText(e.target.value)}
                        value={searchText}
                    />
                </form>
            </div>
            <Recipes recipes={recipes}/>
        </div>
    );
};

export default Content;
