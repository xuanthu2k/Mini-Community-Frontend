import { Card, Button } from "react-bootstrap";
import { useLocation, Link, useNavigate } from "react-router-dom";
import PostsOfUser from "./PostsOfUser";

const ProfilePage = (props) => {

    const navigate = useNavigate()
    const checkUSer = localStorage.getItem("userID")
    console.log(checkUSer);
    let location = useLocation()
    if(Object.keys(props).length === 0){    
        let author = location.state.author
        const {username,admin, posts} = author
        let role = ''
        if(admin){
            role = "Admin"
        }else{
            role = "User"
        }
        return (  
            <>
                <Card className="col-md-5 mx-auto my-5" style={{ width: '38rem' }}>
                    <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256__340.png" />
                    <Card.Body>
                        <Card.Title>Name: {username}</Card.Title>
                        <Card.Text>Role: {role}</Card.Text>
                    </Card.Body>
                </Card>
                <Card className="col-md-5 mx-auto  my-2" style={{ width: '38rem' }}><h2 className="mx-auto">Posts of {username}</h2></Card>
                <PostsOfUser posts={posts}/>
                
                <Card.Body className="col-md-5 mx-auto my-5" style={{ width: '38rem' }}>
                    <Link to='/' style={{ textDecoration: 'none' }}>Go Home</Link>
                </Card.Body>
            </>
        );
    }
    else{
        let {author} = props
        const {username,admin, posts} = author
        let role = ''
        if(admin){
            role = "Admin"
        }else{
            role = "User"
        }
        return (  
            <>
                <Card className="col-md-5 mx-auto my-5" style={{ width: '38rem' }}>
                    <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256__340.png" />
                    <Card.Body>
                        <Card.Title>Name: {username}</Card.Title>
                        <Card.Text>Role: {role}</Card.Text>
                    </Card.Body>
                </Card>
                <Card className="col-md-5 mx-auto  my-2" style={{ width: '38rem' }}><h2 className="mx-auto">Posts of {username}</h2></Card>
                <PostsOfUser posts={posts}/>
                
                <Card.Body className="col-md-5 mx-auto my-5" style={{ width: '38rem' }}>
                    <Link to='/' style={{ textDecoration: 'none' }}>Go Home</Link>
                </Card.Body>
            </>
        );
    }
    
}
 
export default ProfilePage;