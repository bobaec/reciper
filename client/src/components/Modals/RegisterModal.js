import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const RegisterModal = ({ show, setAuth, setShowRegisterModal }) => {

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
        <Modal show={show}>
            <Modal.Header closeButton>Register</Modal.Header>
            <Modal.Body>
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
                    <Button type="btn btn-success" className="form-control">Submit</Button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowRegisterModal(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default RegisterModal