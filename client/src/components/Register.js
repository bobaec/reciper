import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: "",
    });
    const { email, password, name } = inputs;
    const onFormChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { name, email, password };
            const response = await fetch(
                "http://localhost:5000/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            );
            const parseResponse = await response.json();
            localStorage.setItem("token", parseResponse.token);
            setAuth(true);
        } catch (error) {
            console.log("onSubmitForm Register", error.message);
        }
    };
    return (
        <div>
            <h1 className="text-center my-5">Register</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    className="form-control my-3"
                    type="type"
                    name="name"
                    placeholder="name"
                    value={name}
                    onChange={(e) => onFormChange(e)}
                />
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
                <button className="btn btn-success btn-block form-control">
                    Submit
                </button>
                <Link to="/login">Login</Link>
            </form>
        </div>
    );
};

export default Register;
