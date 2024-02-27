import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const LogoutModal = ({ show, setShowLogoutModal, setAuth }) => {
    const logout = (e) => {
        localStorage.removeItem("token");
        setAuth(false);
        setShowLogoutModal(false);
        window.location.reload();
    }
    return (
        <Modal show={show} size="sm" onHide={() => setShowLogoutModal(false)}>
            <Modal.Header closeButton>Logout</Modal.Header>
            <Modal.Body>Are you sure you want to log out?</Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setShowLogoutModal(false)}>Close</Button>
                <Button onClick={() => logout()}>Logout</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default LogoutModal;