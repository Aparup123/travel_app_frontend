import { useContext, useEffect } from "react"
import { userContext } from "../contexts/userContext"
import { useNavigate } from "react-router-dom";
import getFormattedDate from "../utils/getFormattedDate";

export default function MyTrips() {
  const {userData}=useContext(userContext);
  const navigate=useNavigate()
  useEffect(()=>{
    if(userData.role=="seller")
      navigate('/trips')
    
  },[])
  return (
    <div className="overflow-x-auto">
    {userData.booked_trips.length?
      <table className="table table-zebra ">
        <thead>
          <tr>
            <th>Trip</th>
            <th>Location</th>
            <th>Date</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {userData.booked_trips.map((trip)=>{
            return <tr key={trip._id} className="hover" onClick={()=>navigate(`/trips/${trip._id}`)}>
              <td>{trip.title}</td>
              <td>{trip.location}</td>
              <td>{getFormattedDate(trip.start_date)}</td>
              <td>{trip.price}</td>
            </tr>
          })}
        </tbody>
      </table>:
      <div className="flex flex-col items-center gap-4 mt-4 ">
        <h1 className="text-5xl block" >You dont' have any booked trips!</h1>
        <h3 className="text-xl block">book a trip and come back to see.</h3>
      </div>
    }
    </div>
  )
}
