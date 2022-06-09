import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const Notification = (props) => {
    return (  
        <>
            <Modal show={props.show}>
                <Modal.Title className="text-center p-2">Failed</Modal.Title>
                <Modal.Body>{props.content || "Error"}</Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={props.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
 
export default Notification;