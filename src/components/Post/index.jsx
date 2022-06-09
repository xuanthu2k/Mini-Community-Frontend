import { Button, Col, Container, Form, Row } from "react-bootstrap"
import Image from 'react-bootstrap/Image'
import { Card, ListGroup, ListGroupItem } from "react-bootstrap"
import { Link } from "react-router-dom"
import PostItem from "./PostItem"

const Post = (props) => {
    if(props.posts.length===0){
        return <>Waiting</>
    }
    const postArr = props.posts
    return (  
        <>
            <Container>
                <Row>
                    {postArr.map((post)=>{
                        return <PostItem post={post} key={post._id}/>
                    })}
                </Row>
            </Container>
        </>
    )
}
 
export default Post;