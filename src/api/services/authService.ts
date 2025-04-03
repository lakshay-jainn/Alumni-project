import axios from 'axios'

export async function SigninAPI(data:any){

    const response = await axios.post('http://localhost:8080/api/v1/user/signin',data)
    
    return response.data
}

export async function SignupAPI(data:any){

    const response = await axios.post('http://localhost:8080/api/v1/user/signup',data)
    
    return response.data
}