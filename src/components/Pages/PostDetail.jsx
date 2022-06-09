import { useEffect, useState } from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import postAPI from '../../api/postAPI'
import { Card,Button, InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap'
import commentAPI from '../../api/commentAPI'
import Notification from '../Modal/Notification'

const PostDetail = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { postID } = location.state
    const token = localStorage.getItem("token")
    const admin = localStorage.getItem("admin")

    // useState
    const [comment, setComment] = useState("")
    const [post,setPost] = useState({})
    const [commentArr, setCommentArr] = useState([])

    // handle notifitation
    const [show,setShow] = useState(false)
    const [content,setContent] = useState("")
    const handleClose=()=>{
        setShow(!show)
    }


    // Get A Post
    useEffect(()=>{
        postAPI.getPost(postID)
        .then(res=>{
            if(res.code===200){
                setPost(res.data)
                setCommentArr(res.data.comments)
            }else{
                console.log(res);
            }
        })
        .catch(err=>{
            console.log(err);
        })
    },[commentArr])

    // Post Comment


    // functions handle
    const getCommentValue=(e)=>{
        setComment(e.target.value)
    }
    const clickBtnComment=()=>{
        const commentData = {
            post: postID,
            content: comment
        }
        commentAPI.addComment(token,commentData)
        .then(res=>{
            if(res.code===200){
                console.log(res);
            }else{
                if(res.message==="invalid token"){
                    navigate('/login')
                }else{
                    setShow(true)
                    setContent(res.message)
                }
            }
        })
        .catch(err=>{
            console.log(err);
        })
        setComment("")
    }

    const clickBtnHome=()=>{
        navigate('/')
    }
    const clickBtnDelete=(commentID)=>{
        commentAPI.deleteComment(token,commentID)
        .then(res=>{
            if(res.code!==200){
                console.log(res);
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return (  
        <>
            <Card className='lg-form'>
                <Container>
                    <Row className='m-auto justify-content-between'>
                        <Col className='mt-2'><Button onClick={clickBtnHome}>Home</Button></Col>
                    </Row>
                </Container>
                <Card.Img variant="top" src={post.image || " "}/>
                <Card.Body>
                    <Card.Title>{post.title || ""}</Card.Title>
                    <Card.Text>
                    {post.content || ""}
                    </Card.Text>
                    <InputGroup>
                        <FormControl placeholder='Enter your comment...' value={comment} onChange={getCommentValue}></FormControl>
                        <Button variant="primary" onClick={clickBtnComment}>Comment</Button>
                    </InputGroup>
                </Card.Body>
                {/* Comment */}
                {commentArr.map(comment=>{
                    return(
                        <Card.Body key={comment._id}>
                            <Card.Subtitle>{comment.author || ""}</Card.Subtitle>
                            <Card.Text>{comment.content || ""}</Card.Text>
                            {admin==="true"?<Button variant='danger' onClick={()=>clickBtnDelete(comment._id)}>Delete</Button>
                            :<></>
                            }
                        </Card.Body>
                    )
                })}
                
            </Card>
            <Notification  show={show} content={content} handleClose={handleClose} />
        </>
    )
}
 
export default PostDetail;