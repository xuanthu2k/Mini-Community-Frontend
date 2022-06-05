import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SuccessModal = (props) => {
    const {showSuccess} = props
    const navigate = useNavigate()
    const handleClick=()=>{
        window.location.reload()
    }
    return (  
        <>
            <Modal show={showSuccess}>
                <Modal.Header>
                <Modal.Title >Successfully!</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                <Button variant="success" onClick={handleClick}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
 
export default SuccessModal;