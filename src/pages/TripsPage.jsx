import { useEffect, useState } from "react"
import Trip from "../components/Trip"
import axios from "axios"
import { useNavigate } from "react-router-dom"
function TripsPage() {
    const navigate=useNavigate()
    const [trips, setTrips]= useState([])
    useEffect(()=>{
        axios.get('http://localhost:3001/api/trips')
        .then((res)=>{
            console.log(res)
            setTrips(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    function goToTrip(tripId){
        console.log('clicked')
        console.log(tripId)
        navigate(`/trips/${tripId}`)
    }
  return (
    <>
        {trips.map((trip)=><div key={trip._id} onClick={()=>goToTrip(trip._id)}><Trip key={trip.id} trip={trip}/></div>)}
    </>
  )
}

export default TripsPage