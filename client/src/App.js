import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const isAuth = async () => {
        try {
            const response = await fetch("http://localhost:5000/auth/verify/", {
                method: "GET",
                headers: {
                    token: localStorage.token,
                },
            });
            const parseResponse = await response.json();
            parseResponse === true
                ? setIsAuthenticated(true)
                : setIsAuthenticated(false);
        } catch (error) {
            console.log("isAuth", error.message);
        }
    };
    useEffect(() => {
        isAuth();
    }, []);
    return (
        <div className="website-container">
            <Router>
                <div className="container">
                    <Routes>
                        <Route
                            exact
                            path="/login"
                            element={
                                !isAuthenticated ? (
                                    <Login
                                        setAuth={(e) => setIsAuthenticated(e)}
                                    />
                                ) : (
                                    <Navigate to="/dashboard" />
                                )
                            }
                        />
                        <Route
                            exact
                            path="/register"
                            element={
                                !isAuthenticated ? (
                                    <Register
                                        setAuth={(e) => setIsAuthenticated(e)}
                                    />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        z
                        <Route
                            exact
                            path="/dashboard"
                            element={
                                isAuthenticated ? (
                                    <Dashboard
                                        setAuth={(e) => setIsAuthenticated(e)}
                                    />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
