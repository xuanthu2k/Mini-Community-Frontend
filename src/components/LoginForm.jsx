import {useNavigate} from "react-router-dom"
import {Form, Button, Stack, Alert} from 'react-bootstrap'
import { useState } from "react"
import axios from 'axios'

const LoginForm = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [wrongAlert, setWrongAlert] = useState(false)

    const handleSubmit = async(e)=>{
        e.preventDefault()
        axios.post(`https://mini-community.herokuapp.com/api/auth/login`,{
            username,
            password
        })
        .then(res=>{
            if(res.data.token){
                localStorage.setItem("token",res.data.token)
                localStorage.setItem("userID",res.data.userID)
                localStorage.setItem("admin",res.data.admin)
                console.log("login successfully");
                navigate('/')
            }else{
                setWrongAlert(true)
                console.log(res.data);
            }
            
        })
        .catch(err=>{
            setWrongAlert(true)
            console.log(err)
        })
    }

    const handleUsername = (e)=>{
        setUsername(e.target.value);
    }

    const handlePassword = (e)=>{
        setPassword(e.target.value)
    }

    const handleClick = ()=>{
        navigate('/register')
    }

    return ( 
        <>
            <Stack className="col-md-5 mx-auto my-5" >
            <h2 className='mx-auto'>Mini Community</h2>
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
            <Stack className="col-md-5 mx-auto " >
                    <Button className='py-3' variant="primary" type="submit">Login</Button>
            </Stack>
            <Alert className="col-md-5 mx-auto my-2" variant="danger" show={wrongAlert} >
                <Alert.Heading className='mx-auto'>Wrong Username or Password !!!</Alert.Heading>
            </Alert>
            <Stack className="col-md-5 mx-auto mt-4 " >
                    <p>Do not have an account?</p>
            </Stack>
            <Stack className="col-md-5 mx-auto " >
                    <Button className='py-3' variant="success" type="button" onClick={handleClick}>Register</Button>
            </Stack>
            </Form>


        </>
     );
}
 
export default LoginForm;