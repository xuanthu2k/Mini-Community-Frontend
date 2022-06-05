import axios from 'axios';
import { useEffect, useState } from 'react';
import {Button, Card, Container, FormControl, InputGroup, ListGroup, ListGroupItem} from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AddComment from './AddComment';
import Comment from './Comment';
import SuccessModal from './SuccessModal';

const PostDetail = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const {postID} = location.state
    const [postDetail, setPostDetail] = useState({})
    const [showSuccess,setShowSuccess] = useState(false)
    const [cmtContent, setCmtContent] = useState('')

    const handleChange = (e)=>{
        setCmtContent(e.target.value)
    }

    const handleClick=()=>{
        setShowSuccess(!showSuccess)
        const token = localStorage.getItem("token")
        if(!token){
            console.log("you can login");
        }else{
            const URL = `https://mini-community.herokuapp.com/api/comment`
            axios.post(URL,{
                post:postID,
                content:cmtContent
            },{
                headers: {
                  'Authorization': `Bearer ${token}` 
                }
              }
            )
              .then(res=>{
                  console.log(res.data.data)
                  window.location.reload()
              })
              .catch(err=>{
                  console.log("failed:",err);
              })
        }
    }

    useEffect(()=>{
        const requestURL = `https://mini-community.herokuapp.com/api/post/${postID}`
        axios.get(requestURL)
            .then(res=>{
                setPostDetail(res.data.data)
            })
            .catch(err=>{
                console.log("failed:",err.message);
            })
    },[])
    if(postDetail.length == 0){
        return (
            <>waiting ...</>
        )
    }else{
        const {title, content, image, comments, author} = postDetail
        return (  
        <>
            <Card className="col-md-5 mx-auto my-5" style={{ width: '38rem' }}>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{content}</Card.Text>
                    <Button className='mb-4'>Like</Button>
                    <AddComment handleClick={handleClick} handleChange={handleChange} />
                </Card.Body> 
                <Comment comments={comments} />
                <Card.Body className='mx-auto'>
                    <Link className='m-5' to='/' style={{ textDecoration: 'none' }}>Go Home</Link>
                    <Link className='m-5' to='/info' style={{ textDecoration: 'none' }} state={{author:author}}>About Author</Link>
                </Card.Body>
                <SuccessModal showSuccess={showSuccess}/>
            </Card> 
        </>
    )
    }
}
 
export default PostDetail;