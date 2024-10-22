
import { useContext} from "react";
import { userContext } from "../contexts/userContext";
import { Link, useNavigate } from "react-router-dom";

export default function SellerDashboard() {
    const {userData}=useContext(userContext)
    const navigate=useNavigate()
   
  
  return (
    <div className="overflow-x-auto pt-2">
    {userData.created_trips.length<=0?<span>You have not created any trips</span>:
      <table className="table table-zebra">
        <thead>
        <tr>
          <th>Trips</th>
          <th>booked</th>
          <th>Price</th>
          <th>location</th>
          {/* <th>modify</th> */}
          {/* <th>  
            <span className="sr-only">Edit</span>
          </th> */}
          </tr>
        </thead>
        <tbody className="">
            {
                userData.created_trips.map((trip)=>{return <tr className="hover" key={trip._id} onClick={()=>{navigate(`/trips/${trip._id}`)}} >
                    <td className="whitespace-nowrap font-medium">
                    {trip.title}
                    </td>
                    <td>{trip.booked_by.length}/{trip.total_capacity}</td>
                    <td>Rs. {trip.price}</td>
                    <td>{trip.location}</td>
                    {/* <td>
                    <Link to={`/edit/trips/${trip._id}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                        Edit
                    </Link>
                    </td> */}
                </tr>})
                
            }
        </tbody>
      </table>
    }
    </div>
  );
}
