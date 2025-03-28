import axios from 'axios'

export async function SigninAPI(data:any){

    const response = await axios.post('/user/signin',data)
    
    return response.data
}

export async function SignupAPI(data:any){

    const response = await axios.post('/user/signup',data)
    
    return response.data
}