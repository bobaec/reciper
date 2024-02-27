import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Popular from "../components/Recipes";
import Veggie from "../components/Veggie";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import "../styling/Homepage.scss";

const Homepage = () => {
    const [ingredients, setIngredients] = useState([]);
    const [ownedIngredients, setOwnedIngredients] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);

    const getAuth = async () => {
        try {
            const response = await fetch("http://localhost:5000/auth/verify/", {
                method: "GET",
                headers: {
                    token: localStorage.token,
                },
            });
            const parseResponse = await response.json();
            setLoggedIn(parseResponse);
        } catch (error) {
            console.log('getAuth', error.message);
        }
    }

    const getIngredients = async () => {
        try {
            if (loggedIn) {
                const response = await fetch('http://localhost:5000/recipes/get-ingredients', {
                    method: "GET",
                    headers: {
                        token: localStorage.token,
                    },
                });
                const parseResponse = await response.json();
                const splitIngredients = await parseResponse.owned_ingredients.split(',+');
                setIngredients(splitIngredients);
            }
        } catch (error) {
            console.log('getIngredients', error.message);
        }
    }

    useEffect(() => {
        getAuth();
        getIngredients();
    }, [])

    const saveIngredients = async (allIngredients) => {
        setIngredients(allIngredients);
        const filterOwnedIngredients = {
            owned_ingredients: allIngredients.length > 0 ? allIngredients.join(',+') : null
        }
        setOwnedIngredients(filterOwnedIngredients);
        try {
            if (loggedIn) {
                const response = await fetch('http://localhost:5000/recipes/save-ingredients', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        token: localStorage.token,
                    },
                    body: JSON.stringify(ownedIngredients),
                });
            }
            setIngredients(allIngredients);
            if (loggedIn) {
                await getIngredients();
            }
        } catch (error) {
            console.log('saveIngredients', error.message);
        }
    }

    return (
        <div className="homepage-container">
            {/* {console.log(ingredients)} */}
            <Sidebar
                saveIngredients={(allIngredients) => saveIngredients(allIngredients)}
                ingredients={ingredients}
            />
            {/* <Content ingredients={ingredients} /> */}
        </div>
    );
};

export default Homepage;
