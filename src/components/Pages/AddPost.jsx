import { useEffect, useState } from 'react';
import { Button, Container, Form, FormGroup, Row } from 'react-bootstrap'
import { Navigate, useNavigate } from 'react-router-dom';
import authAPI from '../../api/authAPI';
import postAPI from '../../api/postAPI';
import Notification from '../Modal/Notification';

const AddPost = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const [show,setShow] = useState(false)
    const [content,setContent] = useState("")
    const [title,setTitle] = useState("")
    const [postContent, setPostContent] = useState("")
    const [imgLink, setImgLink] = useState("")

    const handleClose=()=>{
        setShow(!show)
    }

    const handleTitle=(e)=>{
        setTitle(e.target.value)
    }

    const handleContent=(e)=>{
        setPostContent(e.target.value)
    }

    const handleLinkImg=(e)=>{
        setImgLink(e.target.value)
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        const postData = {
            title:title,
            content:postContent,
            image:imgLink
        }
        postAPI.addPost(token,postData)
        .then(res=>{
            if(res.code===200){
                navigate('/')
            }else{
                setShow(true)
                setContent(res.message)
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }

    const clickBtnCancel=()=>{
        navigate('/')
    }

    return (  
        <>
            <Container >
                <div className='lg-form'>
                    <Row className='justify-content-center'>
                        Create Post
                    </Row>
                    <Row>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup className='py-2'>
                                <Form.Label>Title</Form.Label>
                                <Form.Control type='text' onChange={handleTitle}></Form.Control>
                            </FormGroup>
                            <FormGroup className='py-2'>
                                <Form.Label>Content</Form.Label>   
                                <Form.Control autoComplete="on" type='text' onChange={handleContent}></Form.Control>
                            </FormGroup>
                            <FormGroup className='py-2'>
                                <Form.Label>Link Image</Form.Label>   
                                <Form.Control autoComplete="on" placeholder='Enter image address' type='text' onChange={handleLinkImg}></Form.Control>
                            </FormGroup>
                            <FormGroup className='py-2 d-flex justify-content-between'>
                                <Button className='px-5' type='submit' variant='success'>Create</Button> 
                                <Button className='px-5' variant='danger' onClick={clickBtnCancel}>Cancel</Button>  
                            </FormGroup>
                        </Form>
                    </Row>
                </div>
            </Container>
            <Notification show={show} content={content} handleClose={handleClose}/>
        </>
    )
}
 
export default AddPost;