import axios from 'axios'
import {ListGroup, ListGroupItem, Card, Button, Container, Row, Col} from 'react-bootstrap'
import { useEffect, useState } from 'react'

const Comment = (props) => {
    const {comments} = props
    const [allComment, setAllComment] = useState([])

    const admin = localStorage.getItem("admin")

    // get all comment
    useEffect(()=>{
        const URL = `https://mini-community.herokuapp.com/api/comment`
        axios.get(URL)
            .then(res=>{
                setAllComment(res.data.data)
            })
            .catch(err=>{
                console.log("err",err);
            })
    },[])


    if(!comments || allComment.length==0){
        return(
            <>Waiting ...</>
        )
    }
    if(comments.length==0){
        return (
            <Card.Text className=" mx-auto my-5">There are no comments yet !</Card.Text>
        )
    }

    // take id of comments of post

    const commentID = comments.map(comment=>{
        return comment._id
    })
    
    const commentsOfPost = allComment.filter((comment)=>{
        return commentID.includes(comment._id)
    })
    return (  
        <ListGroup className="list-group-flush">
            {commentsOfPost.map((comment,index)=>{
                return (
                        <Container key={index} >
                            <Row className="justify-content-md-center">
                                <Col>
                                    <ListGroupItem >
                                        <Card.Subtitle>{comment.author.username}</Card.Subtitle>
                                        <Card.Text>{comment.content}</Card.Text>
                                    </ListGroupItem>
                                </Col>
                                <Col  xs lg="2">
                                    {
                                        admin=="true"
                                        ?<Button className=' my-2' variant='danger' >Delete</Button>
                                        :<Button className=' my-2' variant='primary'>Like</Button>
                                    }
                                </Col>
                            </Row>
                        </Container>
                )
            })}
        </ListGroup>
    )
}
 
export default Comment;