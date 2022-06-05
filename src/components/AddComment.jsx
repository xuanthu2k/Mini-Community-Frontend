import axios from "axios";
import { useState } from "react";
import { FormControl, Button, InputGroup } from "react-bootstrap";

const AddComment = (props) => {

    const {handleClick, handleChange} = props

    return (  
        <>
            <InputGroup>
                <FormControl onChange={handleChange} placeholder="Enter your comment"/>
                <Button onClick={handleClick}>Add comment</Button>
            </InputGroup>           
        </>
    )
}
 
export default AddComment;