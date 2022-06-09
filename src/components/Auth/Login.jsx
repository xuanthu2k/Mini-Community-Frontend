import { useEffect, useState } from 'react';
import { Button, Container, Form, FormGroup, Row } from 'react-bootstrap'
import { Navigate, useNavigate } from 'react-router-dom';
import authAPI from '../../api/authAPI';
import Notification from '../Modal/Notification';

const Login = () => {

    const navigate = useNavigate()
    const [show,setShow] = useState(false)
    const [content,setContent] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleClose=()=>{
        setShow(!show)
    }

    const handleUsername=(e)=>{
        setUsername(e.target.value)
    }

    const handlePassword=(e)=>{
        setPassword(e.target.value)
    }

    const handleLogin=(e)=>{
        e.preventDefault()
        const loginData = {username,password}
        authAPI.login(loginData).then(res=>{
            if(res.code===200){
                localStorage.setItem("token",res.token)
                localStorage.setItem("userID",res.userID)
                localStorage.setItem("admin",res.admin)
                navigate('/')
            }else{
                setShow(true)
                setContent(res.message)
            }
        }).catch(err=>{
            console.log("err",err);
        })
    }

    const clickBtnRegister=()=>{
        navigate('/register')
    }

    if(localStorage.getItem("token")){
        return <Navigate to="/"/>
    }

    return (  
        <>
            <Container >
                <div className='lg-form'>
                    <Row className='justify-content-center'>
                        LoginForm
                    </Row>
                    <Row>
                        <Form onSubmit={handleLogin}>
                            <FormGroup className='py-2'>
                                <Form.Label>username</Form.Label>
                                <Form.Control type='text' onChange={handleUsername}></Form.Control>
                            </FormGroup>
                            <FormGroup className='py-2'>
                                <Form.Label>password</Form.Label>   
                                <Form.Control autoComplete="on" type='password' onChange={handlePassword}></Form.Control>
                            </FormGroup>
                            <FormGroup className='py-2 text-center'>
                                <Button className='px-5' type='submit'>Login</Button> 
                            </FormGroup>
                        </Form>
                    </Row>
                    <Row>
                        <FormGroup className='py-2 text-center'>
                            <Form.Text className='mx-2'>Don't have an account?</Form.Text>
                            <Button className='btn btn-success' onClick={clickBtnRegister}>Register</Button> 
                        </FormGroup>
                    </Row>
                </div>
            </Container>
            <Notification show={show} content={content} handleClose={handleClose}/>
        </>
    )
}
 
export default Login;