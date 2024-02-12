import React, { useState, useEffect } from "react";

const Dashboard = ({ setAuth }) => {
    const [name, setName] = useState("");
    const getName = async () => {
        try {
            const response = await fetch("http://localhost:5000/dashboard", {
                method: "GET",
                headers: {
                    token: localStorage.token,
                },
            });
            const parseResponse = await response.json();
            setName(parseResponse.user_name);
        } catch (error) {
            console.log('getName', error.message);
        }
    };
    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
    };
    useEffect(() => {
        getName();
    }, []);
    return (
        <div>
            <h1>Dashboard {name}</h1>
            <button
                className="btn btn-primary btn-block"
                onClick={(e) => logout(e)}
            >
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
