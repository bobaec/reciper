import React, { useState, useEffect } from "react";
import "../styling/Content.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Popular from "./Popular";

const Content = ({ ingredients }) => {
    const [recipes, setRecipes] = useState([]);
    const [searchText, setSearchText] = useState("");

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
                console.log("getRecipesByIngredients", error.message);
            }
        }, 1000);
        return () => clearTimeout(getRecipesByIngredients);
    }, [ingredients]);

    const onSearchSubmit = (e) => {
        e.preventDefault();
        console.log(e);
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
            <Popular />
        </div>
    );
};

export default Content;
