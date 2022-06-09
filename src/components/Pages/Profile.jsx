import Header from "../Share/Header";
import { Card, Button } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import userAPI from "../../api/userAPI";
import USerInfo from "../Share/UserInfo";

const Profile = () => {

    const navigate = useNavigate()
    const userID = localStorage.getItem("userID")
    const admin = localStorage.getItem("admin")
    const [info, setInfo] = useState({})

    // get info user
    useEffect(()=>{
        userAPI.getInfo(userID)
        .then(res=>{
            if(res.code===200){
                setInfo(res.data)
            }else{
                console.log(res);
            }
        })
        .catch(err=>{
            console.log(err);
        })
    })

    //check login
    const token = localStorage.getItem('token')
    if(!token) return <Navigate to='/login'/>

    //BTN handler
    const clickBtnLogout=()=>{
        localStorage.clear()
        navigate('/login')
    }
    const clickBtnAddPost=()=>{
        navigate('/add-post')
    }
    const clickBtnManage=()=>{
        navigate('/manage')
    }

    return (  
        <>
            <Header active={"profile"} />
            <USerInfo info={info}/>
            <Card className="lg-form">
                <Card.Body className="d-flex justify-content-between">
                    <Button onClick={clickBtnAddPost}>Add Post</Button>
                    <Button variant="warning" onClick={clickBtnLogout}>Logout</Button>
                </Card.Body>
            </Card>
        </>
    )
}
 
export default Profile;