import axios from 'axios'

const baseURL = `https://mini-community.herokuapp.com/api`

const postAPI = {
    getAllPost: async()=>{ 
        try {
            const URL =  `${baseURL}/post`
            const response = await axios.get(URL)
            return response.data
        } catch (error) {
            console.log("failed to call api get all post:",error)
        }
    },
    getPost: async(postID)=>{ 
        try {
            const URL =  `${baseURL}/post/${postID}`
            const response = await axios.get(URL)
            return response.data
        } catch (error) {
            console.log("failed to call api get all post:",error)
        }
    },
    addPost: async(token,postData)=>{ 
        try {
            const URL =  `${baseURL}/post`
            const response = await axios.post(URL,postData,{
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            })
            return response.data
        } catch (error) {
            console.log("failed to call api add post:",error)
        }
    },
    deletePost: async(token,postID)=>{ 
        try {
            const URL =  `${baseURL}/post/${postID}`
            const response = await axios.delete(URL,{
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            })
            return response.data
        } catch (error) {
            console.log("failed to call api delete post:",error)
        }
    },
}

export default postAPI