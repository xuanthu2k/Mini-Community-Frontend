import axios from "axios";
import { useEffect, useState } from "react";
import Post from "./Post";

const PostsOfUser = (props) => {
    const {posts} = props
    
    const [postArray, setpostArray] = useState([])

    useEffect(()=>{
        const URL = `https://mini-community.herokuapp.com/api/post`
        axios.get(URL)
            .then(res=>{
                setpostArray(res.data.data)
            })
            .catch(err=>{
                console.log("failed",err);
            })
    },[])

    if(!postArray){
        return(
            <>Empty</>
        )
    }
    if(postArray.length==0){
        return(
            <>Waiting...</>
        )
    }
    const postsOfUser = postArray.filter((post)=>{
        return posts.includes(post._id)
    })
    return ( 
        <>
            {postsOfUser.map((post,index)=>(   
                    <div key={index}><Post post={post} /></div>
            ))}
        </>
    )
}
 
export default PostsOfUser;