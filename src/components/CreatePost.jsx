import {useNavigate} from "react-router-dom"
import {Form, Button, Stack, Alert} from 'react-bootstrap'
import { useState } from "react"
import axios from 'axios'
import SuccessModal from "./SuccessModal"

const CreatePost = () => {

    const navigate = useNavigate()
    const [showSuccess, setShowSuccess] = useState(false)
    const [image, setImage] = useState("")
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [wrongAlert, setWrongAlert] = useState(false)
    const token = localStorage.getItem("token")

    const handleSubmit = async(e)=>{
        e.preventDefault()
        setShowSuccess(!showSuccess)
        axios.post(`https://mini-community.herokuapp.com/api/post`,{
            title,
            content,
            image
        },{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(res=>{
            if(res.data.code==200){
                setWrongAlert(false)
                navigate('/')      
            }else{
                setWrongAlert(true)
            }
        })
        .catch(err=>{
            setWrongAlert(true)
            console.log(err)
        })
    }

    const handleImage = (e)=>{
        setImage(e.target.value)
    }
    
    const handleTitle = (e)=>{
        setTitle(e.target.value);
    }

    const handleContent = (e)=>{
        setContent(e.target.value)
    }

    return (  
        <>
            <Stack className="col-md-5 mx-auto my-5" >
            <h2 className='mx-auto'>Create Post</h2>
            </Stack>
            <Form onSubmit={handleSubmit}>
                <Form.Group  className="col-md-5 mx-auto my-5" controlId="formBasicText">
                    <Form.Label><h4>Image link</h4></Form.Label>
                    <Form.Control size="lg" type="text" onChange={handleImage} />
                </Form.Group>
                <Form.Group  className="col-md-5 mx-auto my-5" controlId="formBasicText">
                    <Form.Label><h4>Title</h4></Form.Label>
                    <Form.Control size="lg" type="text" onChange={handleTitle} />
                </Form.Group>
                <Form.Group className="col-md-5 mx-auto my-5" controlId="formBasicPassword">
                    <Form.Label><h4>Content</h4></Form.Label>
                    <Form.Control size="lg" type="text" onChange={handleContent} />
                </Form.Group>
                <Stack className="col-md-5 mx-auto " >
                        <Button className='py-3' variant="primary" type="submit"><h5
                        >Create</h5
                        ></Button>
                </Stack>
                
                <Alert className="col-md-5 mx-auto my-2" variant="danger" show={wrongAlert} >
                    <Alert.Heading className='mx-auto'>Invalid post !!!</Alert.Heading>
                </Alert>
                <SuccessModal showSuccess={showSuccess}/>
            </Form>
        </>
    )
}
 
export default CreatePost;