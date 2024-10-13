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
            <th>Price</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {userData.booked_trips.map((trip)=>{
            return <tr key={trip._id} className="hover" onClick={()=>navigate(`/trips/${trip._id}`)}>
              <td>{trip.title}</td>
              <td>{trip.location}</td>
              <td>{trip.price}</td>
              <td>{getFormattedDate(trip.start_date)}</td>
            </tr>
          })}
        </tbody>
      </table>:
      <div>You have not booked any trips</div>
    }
    </div>
  )
}
