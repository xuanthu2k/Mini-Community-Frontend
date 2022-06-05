import Post from "./Post";

const NewsFeed = (props) => {
    const {posts} = props
    if(posts.length==0){
        return (
            <p>waiting...</p>
        )
    }else{
        return (  
            <>
                {posts.map((post,index)=>(   
                    <div key={index}><Post post={post} /></div>
                ))}
            </>
        );
    }
}
 
export default NewsFeed;