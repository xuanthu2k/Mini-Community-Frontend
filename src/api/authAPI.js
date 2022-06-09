import axios from 'axios'

const baseURL = `https://mini-community.herokuapp.com/api`

const authAPI = {
    login: async(loginData)=>{ 
        try {
            const URL =  `${baseURL}/auth/login`
            const response = await axios.post(URL,loginData)
            return response.data
        } catch (error) {
            console.log("failed to call api login:",error)
        }
    },
    register: async(registerData)=>{ 
        try {
            const URL =  `${baseURL}/user`
            const response = await axios.post(URL,registerData)
            return response.data
        } catch (error) {
            console.log("failed to call api register:",error)
        }
    }
}

export default authAPI