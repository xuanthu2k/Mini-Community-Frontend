import axios from 'axios'

const baseURL = `https://mini-community.herokuapp.com/api`

const commentAPI = {
    addComment: async(token,commentData)=>{ 
        try {
            const URL =  `${baseURL}/comment`
            const response = await axios.post(URL,commentData,{
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            })
            return response.data
        } catch (error) {
            console.log("failed to call api get all post:",error)
        }
    },
    deleteComment: async(token,commentID)=>{ 
        try {
            const URL =  `${baseURL}/comment/${commentID}`
            const response = await axios.delete(URL,{
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            })
            return response.data
        } catch (error) {
            console.log("failed to call api delete comment:",error)
        }
    }
}

export default commentAPI