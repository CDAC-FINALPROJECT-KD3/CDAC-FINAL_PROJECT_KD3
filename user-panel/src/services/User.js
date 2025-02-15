import axios from 'axios';

export async function signup(firstName, lastName, email,mobileNo,password,role) {
    try {
      const body = {
        // id,
        firstName,
        lastName,
        email,
        mobileNo,
        password,
        role
      }
      
    //   const url = createUrl('admin/signup')
    // const url='http://localhost:4000/user/signup'
    const url='https://localhost:7275/Users'
    console.log(body)
      const response = await axios.post(url, body)
      console.log(response.data)
      return response.data
    } catch (ex) {
      return { status: 'error', error: ex }
    }
  }

export async function signin(email,password) {
  try{
    const body={email,password}
    const url='https://localhost:7275/Login'
    const response=await axios.post(url,body)
    return response.data
  }catch(ex){
    return{status:'error',error:ex}
  }
  
}

export async function getUserList() {
  try {
    const url='https://localhost:7275/Users'
    const response=await axios.get(url)
    return response.data
  } catch (ex) {
    return{status:'error',error:ex}
  }
  
}