import { useState } from 'react'
import { Button, Container, Form, FormGroup, Row } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import authAPI from '../../api/authAPI'
import Notification from '../Modal/Notification'

const Register = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [show,setShow] = useState(false)
    const [content,setContent] = useState("")

    const handleClose=()=>{
        setShow(!show)
    }

    const handleUsername=(e)=>{
        setUsername(e.target.value)
    }
    const handlePassword=(e)=>{
        setPassword(e.target.value)
    }
    const handleConfirm=(e)=>{
        setConfirm(e.target.value)
    }

    const clickBtnLogin=()=>{
        navigate('/login')
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(password!==confirm){
            setShow(true)
            setContent("Password not match")
        }else{
            const registerData = {
                username,
                password
            }
            authAPI.register(registerData)
            .then(res=>{
                if(res.code===200){
                    navigate('/login')
                }
                if(res.code===500){
                    setShow(true)
                    setContent("Username already exists")
                }
                else{
                    setShow(true)
                    setContent(res.message)
                }
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }
    return (  
        <>
            <Container>
                <div className='lg-form'>
                    <Row className='justify-content-center'>
                        LoginForm
                    </Row>
                    <Row>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup className='py-2'>
                                <Form.Label>username</Form.Label>
                                <Form.Control type='text' onChange={handleUsername}></Form.Control>
                            </FormGroup>
                            <FormGroup className='py-2'>
                                <Form.Label>password</Form.Label>   
                                <Form.Control autoComplete="on" type='password' onChange={handlePassword}></Form.Control>
                            </FormGroup>
                            <FormGroup className='py-2'>
                                <Form.Label>confirm password</Form.Label>   
                                <Form.Control autoComplete="on" type='password' onChange={handleConfirm}></Form.Control>
                            </FormGroup>
                            <FormGroup className='py-2 text-center'>
                                <Button className='px-5' type='submit'>Register</Button> 
                            </FormGroup>
                        </Form>
                    </Row>
                    <Row>
                        <FormGroup className='py-2 text-center'>
                            <Form.Text className='mx-2'>Do you already have an account?</Form.Text>
                            <Button className='btn btn-success' onClick={clickBtnLogin}>Login</Button> 
                        </FormGroup>
                    </Row>
                </div>
            </Container>
            <Notification show={show} content={content} handleClose={handleClose}/>
        </>
    )
}
 
export default Register;