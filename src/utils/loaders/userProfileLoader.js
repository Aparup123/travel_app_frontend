import axios from "axios"
import {json} from 'react-router-dom'
export default async function userProfileLoader({params}){
    const userName=params.name
    try{
        const res=await axios.get(`http://localhost:3001/api/users/profile/${userName}`)
      
        console.log(res)
        return res.data
    }catch(err){
        console.log(err)
        
        // navigate('/error')
        throw json(
          {
            message:err.response.data
          },
          {
            status:err.status,
          }
        )
      }
}