import { Button, Card,Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import postAPI from "../../api/postAPI";
const PostItem = (props) => {
    const admin = localStorage.getItem("admin")
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const handleText=(text)=>{
        return text.slice(0, 25)+"......";
    }
    const {image, title, content, _id} = props.post

    // handler function
    const clickBtnDelete=()=>{
        postAPI.deletePost(token,_id)
        .then(res=>{
            console.log(res);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    return (  
        <>
            <Col xs={12} md={6} lg={4} className="p-2">
                <Link to='/detail' state={{postID: _id}} style={{textDecoration: "none", color:"#000000"}}>
                <Card style={{ width: '90%' }} className='m-auto'>
                    <Card.Img height={300} variant="top" src={image} />
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>
                        {handleText(content)}
                        </Card.Text>
                    </Card.Body>
                </Card>
                </Link>
                {admin==="true"?<Button className="mx-3" variant="danger" onClick={clickBtnDelete}>Delete</Button>:<></>}
            </Col>
        </>
    )
}
 
export default PostItem;