import { Stack, Form, Alert, Button, } from "react-bootstrap";
import {useNavigate} from "react-router-dom"
import { useState } from "react";
import axios from "axios";
import SuccessModal from "./SuccessModal";

const RegisterForm = () => {

    let flag = false

    const [wrongConfirm, setWrongConfirm] = useState(flag)
    const [wrongUsername, setWrongUsername] = useState(flag)
    const [invalidData,setInvalidData] = useState(flag)
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [showSuccess,setShowSuccess] = useState(false)

    const handleSubmit=(e)=>{
        e.preventDefault()
        setShowSuccess(!showSuccess)
        if(password!==confirmPass){
            setWrongConfirm(!flag)
            setInvalidData(flag)
            setWrongUsername(flag)
        }else{
            const URL = `https://mini-community.herokuapp.com/api/user`
            axios.post(URL,{
                username,
                password
            })
                .then(res=>{
                    if(res.data.code==400){
                        setWrongConfirm(flag)
                        setInvalidData(!flag)
                        setWrongUsername(flag)
                    }
                    if(res.data.code==500){
                        setWrongConfirm(flag)
                        setInvalidData(flag)
                        setWrongUsername(!flag)
                    }
                    if(res.data.code==200){
                        navigate('/login')
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
        }
        
    }
    const handleUsername = (e)=>{
        setUsername(e.target.value);
    }

    const handlePassword = (e)=>{
        setPassword(e.target.value)
    }

    const handleConfirmPass = (e)=>{
        setConfirmPass(e.target.value)
    }
    

    return (  
        <>
            <Stack className="col-md-5 mx-auto my-5" >
            <h2 className='mx-auto'>Register Form</h2>
            </Stack>
            <Form onSubmit={handleSubmit}>
            <Form.Group  className="col-md-5 mx-auto my-5" controlId="formBasicText">
                <Form.Label><h4>Username</h4></Form.Label>
                <Form.Control size="lg" type="text" onChange={handleUsername} />
            </Form.Group>
            <Form.Group className="col-md-5 mx-auto my-5" controlId="formBasicPassword">
                <Form.Label><h4>Password</h4></Form.Label>
                <Form.Control size="lg" type="password" onChange={handlePassword} />
            </Form.Group>
            <Form.Group className="col-md-5 mx-auto my-5" controlId="formBasicPassword">
                <Form.Label><h4>Confirm Password</h4></Form.Label>
                <Form.Control size="lg" type="password" onChange={handleConfirmPass} />
            </Form.Group>
            <Alert className="col-md-5 mx-auto my-2" variant="danger" show={wrongConfirm} >
                <Alert.Heading className='mx-auto'>Confirm Password not match !!!</Alert.Heading>
            </Alert>
            <Alert className="col-md-5 mx-auto my-2" variant="danger" show={wrongUsername} >
                <Alert.Heading className='mx-auto'>Username already used !!!</Alert.Heading>
            </Alert>
            <Alert className="col-md-5 mx-auto my-2" variant="danger" show={invalidData} >
                <Alert.Heading className='mx-auto'>Invalid Username or Pass !!!</Alert.Heading>
            </Alert>
            <Stack className="col-md-5 mx-auto mt-4 " >
                    <p>Do not have an account?</p>
            </Stack>
            <Stack className="col-md-5 mx-auto " >
                    <Button className='py-3' variant="success" type="submit" >Register</Button>
            </Stack>
            </Form>
            <SuccessModal showSuccess={showSuccess} />
        </>
    )
}
 
export default RegisterForm;