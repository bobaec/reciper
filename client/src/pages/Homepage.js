import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Popular from "../components/Recipes";
import Veggie from "../components/Veggie";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import "../styling/Homepage.scss";

const Homepage = () => {
    const [ingredients, setIngredients] = useState([]);
    const getIngredients = async() => {
        try {
            const response = await fetch('http://localhost:5000/recipes/get-ingredients', {
                method: "GET",
                headers: {
                    token: localStorage.token,
                },
            });
            const parseResponse = await response.json();
            const splitIngredients = await parseResponse.owned_ingredients.split(',+');
            setIngredients(splitIngredients);
        } catch (error) {
            console.log('getIngredients', error.message);
        }
    }

    useEffect(() => {
        getIngredients();
    }, [])

    const saveIngredients = async(allIngredients) => {
        setIngredients(allIngredients);
        const ownedIngredients = {
            owned_ingredients: allIngredients.length > 0 ? allIngredients.join(',+') : null
        }
        try {
            const response = await fetch('http://localhost:5000/recipes/save-ingredients', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.token,
                },
                body: JSON.stringify(ownedIngredients),
            });
            setIngredients(allIngredients);
            await getIngredients();
        } catch (error) {
            console.log('saveIngredients', error.message);
        }
    }
   
    return (
        <div className="homepage-container">
            <Sidebar
                saveIngredients={(allIngredients) => saveIngredients(allIngredients)}
                ingredients={ingredients}
            />
            <Content ingredients={ingredients} />
        </div>
    );
};

export default Homepage;
