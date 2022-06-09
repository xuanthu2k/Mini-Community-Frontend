import { useEffect, useState } from 'react'
import {Navigate} from 'react-router-dom'
import postAPI from '../../api/postAPI'
import Post from '../Post'
import Header from '../Share/Header'

const Home = () => {

    const [posts,setPosts] = useState([])

    useEffect(()=>{
        postAPI.getAllPost()
        .then(res=>{
            if(res.code===200){
                setPosts(res.data)
            }else{
                console.log(res);
            }
        })
        .catch(err=>{
            console.log(err);
        })
    },[posts])

    const token = localStorage.getItem('token')
    if(!token) return <Navigate to='/login'/>
    return (
        <>
            <Header/>
            <Post posts={posts}/>
        </>
    )
}
 
export default Home;