import { json } from "react-router-dom"
import axios from "axios"

export default async function({params}){
   try{ 
    const tripId=params.id
    const res=await axios.get(`http://localhost:3001/api/trips/${tripId}`)
    const trip=res.data
    if(!trip) throw json({message:"Trip not found"},{status:404})
    return trip
    }catch(err){
        console.log(err)
        throw json({message:"Trip not found"},{status:404})
    }
}