import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const LoginModal = ({ show, setShowLoginModal, setAuth, setShowRegisterModal }) => {
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
                setShowLoginModal(false);
                window.location.reload();
            } else {
                setAuth(false);
            }

        } catch (error) {
            console.log("onSubmitForm Login", error.message);
        }
    };
    return (
        <Modal size="md" show={show} onHide={() => setShowLoginModal(false)}>
            <Modal.Header closeButton>Login</Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            <form
                                onSubmit={onSubmitForm}
                            >
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
                                <Button className="form-control mb-3" type="btn btn-success btn-block">Login</Button>
                                <Button className="form-control" type="btn btn-success" onClick={() => {
                                    setShowLoginModal(false);
                                    setShowRegisterModal(true);
                                }}>Register</Button>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowLoginModal(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LoginModal;
