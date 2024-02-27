import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';

const Login = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const { email, password } = inputs;

    const onFormChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmitForm = async (e) => {
        e.preventDefault(e);
        try {
            const body = { email, password };
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            const parseResponse = await response.json();
            if (parseResponse.token) {
                localStorage.setItem("token", parseResponse.token);
                setAuth(true);
            } else {
                setAuth(false);
            }
        } catch (error) {
            console.log("onSubmitForm Login", error.message);
        }
    };
    return (
        <div>
            <h1 className="text-center my-5">Login</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    className="form-control my-3"
                    type="email"
                    name="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => onFormChange(e)}
                />
                <input
                    className="form-control my-3"
                    type="password"
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => onFormChange(e)}
                />
                <button type="btn btn-success btn-block">Login</button>
                <Link to="/register">Register</Link>
            </form>
        </div>
    );
};

export default Login;
