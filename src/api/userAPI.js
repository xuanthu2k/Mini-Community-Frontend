import axios from 'axios'

const baseURL = `https://mini-community.herokuapp.com/api`

const userAPI = {
    getInfo: async(userID)=>{ 
        try {
            const URL =  `${baseURL}/user/${userID}`
            const response = await axios.get(URL)
            return response.data
        } catch (error) {
            console.log("failed to call api get info user:",error)
        }
    }
}

export default userAPI