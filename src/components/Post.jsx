import axios from "axios";
import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import SuccessModal from "./SuccessModal";
const Post = (props) => {
    const {post} = props

    const [showSuccess, setShowSuccess] = useState(false)

    const navigate = useNavigate()
    const admin = localStorage.getItem("admin")
    const token = localStorage.getItem("token")
    
    const handleDelete=()=>{
        setShowSuccess(!showSuccess)
        const postID = post._id
        const URL = `https://mini-community.herokuapp.com/api/post/${postID}`
        axios.delete(URL,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
            .then(res=>{
                if(res.data.code==200){
                    console.log(res.data)
                }else{
                    console.log(res.data);
                }
            })
            .catch(err=>{
                console.log(err);
            })
    }

    return (  
        <Card className="col-md-5 mx-auto my-5" style={{ width: '38rem' }}>
            <Card.Img variant="top" src={post.image} />
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content}</Card.Text>
                <Link to='/detail' state={{postID:post._id}}><Button variant="primary">Comment</Button></Link>
                {admin=="true"?<Button className="mx-5 col-md-2" variant="danger" onClick={handleDelete}>Delete</Button>:<></>}
                <SuccessModal showSuccess={showSuccess}/>
            </Card.Body>
        </Card>
    )
}
 
export default Post;