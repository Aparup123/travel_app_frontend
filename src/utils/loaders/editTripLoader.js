import axios from "axios";
import { json } from "react-router-dom";

export default async function editTripLoader({params}){
    try{
        const tripId=params.id
        console.log(params)
        const res=await axios.get(`${import.meta.env.VITE_SITE_URL}/api/trips/${tripId}`)
        return res.data
    }catch(err){
        throw json({message:err.data},{status:404})
    }
}