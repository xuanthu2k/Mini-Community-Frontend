import axios from 'axios';
import {Button, Tab, Tabs} from 'react-bootstrap'
import {Stack, Card} from 'react-bootstrap'
import {useEffect, useState} from 'react'
import NewsFeed from './NewsFeed';
import {useNavigate} from "react-router-dom"
import ProfilePage from './ProfilePage';
import { Link } from 'react-router-dom';

const HomPage = (props) => {

    const navigate = useNavigate()
    const [news, setNews] = useState([])
    const [user, setUser] = useState({})

    const checkUSer = localStorage.getItem("userID")

    useEffect(()=>{
      async function fetchNews(){
        try {
          const requestUrl = `https://mini-community.herokuapp.com/api/post`
          const response = await axios.get(requestUrl)
          setNews(response.data.data)
        } catch (error) {
          console.log("failed:",error.message);
        }
      }
      fetchNews()
    },[])

    useEffect(()=>{
      async function fetchUser(){
        try {
          const userID = localStorage.getItem("userID")
          const requestUrl = `https://mini-community.herokuapp.com/api/user/${userID}`
          const response = await axios.get(requestUrl)
          setUser(response.data.data)
        } catch (error) {
          console.log("failed:",error.message);
        }
      }
      fetchUser()
    },[])

    if(!checkUSer){
      navigate('/login')
    }

    if(Object.keys(user).length === 0){
      return (
        <></>
      )
    }

    const handleClick = ()=>{
      localStorage.clear()
      navigate('/login')
    }

    const handleCreatePost =()=>{
      navigate('/create-post')
    }

    return ( 
        <>
            <Stack className="col-md-5 mx-auto my-5" >
                <h2 className='mx-auto'>Mini Community</h2>
            </Stack>
            <Tabs defaultActiveKey="news" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="news" title="News">
                    <NewsFeed posts={news} />
                </Tab>
                <Tab eventKey="profile" title="Profile" to="/info" >
                  <Card className="col-md-5 mx-auto my-5" style={{ width: '38rem' }}>
                      <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256__340.png" />
                      <Card.Body>
                          <Card.Title>Name: {user.username}</Card.Title>
                          <Card.Text>Role: {user.role ? "Admin" : "User"}</Card.Text>
                      </Card.Body>
                      <Card.Body className="col-md-5 mx-auto my-5" >
                          <Button className='col-md-12 my-2' onClick={handleCreatePost} variant="success">Create Post</Button>
                          <Button className='col-md-12 my-2' onClick={handleClick}>Logout</Button>
                      </Card.Body>
                  </Card>
                </Tab>
            </Tabs>
        </>
    );
}
 
export default HomPage;