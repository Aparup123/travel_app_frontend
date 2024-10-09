/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { userContext } from "../contexts/userContext"
function TripPage() {
    const {userData, setUserData}=useContext(userContext)
    const navigate=useNavigate()
    const tripId=useParams().id
    const [trip, setTrip]=useState({_id:"", booked_by:[]})
    const [owner,setOwner]=useState(false)
    useEffect(()=>{
      axios.get(`http://localhost:3001/api/trips/${tripId}`)
      .then((tripData)=>{
        setTrip(tripData.data)
      })
      .catch((err)=>{
        console.log(err)
        navigate('/trips')
      })

    },[])

    useEffect(()=>{
      if(userData.created_trips.map(trip=>trip._id).includes(trip._id)) setOwner(true)
    })


    function bookTrip(){
      if(!userData.username) return navigate('/login')
      if(trip.booked_by.includes(userData._id)) return alert('Already booked!')
      const confirmedBooking=confirm("Book Trip?")
      if(!confirmedBooking){
        return 
      }
      axios.post(`http://localhost:3001/api/trips/book/${trip._id}`, null, {withCredentials:true})
      .then((res)=>{
        console.log(res.data)
        setUserData({...userData, booked_trips: userData.booked_trips.concat(res.data)})
        setTrip({...trip, booked_by:trip.booked_by.concat(userData._id)})
      })
      .catch((err)=>{
        console.log(err)
        console.log("something went wrong")
      })
    }

    function cancelTrip(){
      if(!confirm('Do you want to cancel the trip?'))
        return
      axios.delete(`http://localhost:3001/api/users/trips/${trip._id}`, {withCredentials:true})
      .then((res)=>{
        console.log(res.data)
        setUserData({...userData, booked_trips:userData.booked_trips.filter((t)=>t._id!=res.data._id)})
        setTrip({...trip, booked_by:trip.booked_by.filter((id)=>id!=userData._id)})
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  return (
    <>
       <div className="bg-zinc-300 m-3 p-3 rounded">
            <h3>{trip.name}</h3>
            <p>Description: {trip.description}</p>
            <p>Duration: {trip.duration}</p>
            <p>Date: {trip.start_date}-{trip.end_date}</p>
            <p>Location: {trip.location}</p>
            <p>Total capacity:{trip.total_capacity}, Total booked:{trip.total_booked}, Available tickets:{trip.available_tickets}</p>
            <p>Price:{trip.price}</p>
            {trip?.booked_by.includes(userData._id)?<button onClick={cancelTrip}>cancel</button>:userData.role=="seller"?<></>:<button onClick={bookTrip}>Book</button>}
            
        </div>
        {owner?
          <div className="border p-4 m-4">
            <h1>Booked by</h1>
            {trip.booked_by<=0?<>Not yet booked</>:
            <div>
              {trip.booked_by.map((user,index)=>{return <p key={user._id}>{index+1}. <span className="font-bold">{user.username}</span> {user.email}</p>
              })
              }
            </div>
            }
          </div>:
          <></>
        }
    </>)
}

export default TripPage