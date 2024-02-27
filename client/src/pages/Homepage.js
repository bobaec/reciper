import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import "../styling/Homepage.scss";
import LoginModal from "../components/Modals/LoginModal";
import LogoutModal from "../components/Modals/LogoutModal";

const Homepage = ({ setAuth, isAuthenticated }) => { //rename
    const [ingredients, setIngredients] = useState([]);
    const [ownedIngredients, setOwnedIngredients] = useState([]);
    const [authenticated, setAuthenticated] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        setAuthenticated(isAuthenticated);
    }, [isAuthenticated])

    useEffect(() => {
        getIngredients();
    }, [])

    useEffect(() => {
        console.log('here')
    }, [ingredients])

    const getIngredients = async () => {
        try {
            const response = await fetch('http://localhost:5000/recipes/get-ingredients', {
                method: "GET",
                headers: {
                    token: localStorage.token,
                },
            });
            const parseResponse = await response.json();
            if (parseResponse.owned_ingredients) {
                const splitIngredients = await parseResponse.owned_ingredients.split(',+');
                setIngredients(splitIngredients);
            }

        } catch (error) {
            console.log('getIngredients', error.message);
        }
    }

    const saveIngredients = async (allIngredients) => {
        // setIngredients(allIngredients);
        const filterOwnedIngredients = {
            owned_ingredients: allIngredients.length > 0 ? allIngredients.join(',+') : null
        }
        setOwnedIngredients(filterOwnedIngredients);
        try {
            if (authenticated) {
                await fetch('http://localhost:5000/recipes/save-ingredients', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        token: localStorage.token,
                    },
                    body: JSON.stringify(filterOwnedIngredients),
                });
            }
            setIngredients(allIngredients);
            if (authenticated) {
                await getIngredients();
            }
        } catch (error) {
            console.log('saveIngredients', error.message);
        }
    }

    return (
        <div className="homepage-container">
            <Sidebar
                saveIngredients={(allIngredients) => saveIngredients(allIngredients)}
                ingredients={ingredients}
                isAuthenticated={authenticated}
                setShowLoginModal={(e) => setShowLoginModal(e)}
                setShowLogoutModal={(e) => setShowLogoutModal(e)}
            />
            <Content ingredients={ingredients} />
            {showLoginModal ? <LoginModal show={showLoginModal} setAuth={setAuth} setShowLoginModal={(e) => setShowLoginModal(e)} /> : null}
            {showLogoutModal ? <LogoutModal show={showLogoutModal} setAuth={setAuth} setShowLogoutModal={(e) => setShowLogoutModal(e)} /> : null}
        </div>
    );
};

export default Homepage;
