
import { Table } from "flowbite-react";
import { useContext} from "react";
import { userContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";

export default function SellerDashboard() {
    const {userData}=useContext(userContext)
    const navigate=useNavigate()
   
  
  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Trips</Table.HeadCell>
          <Table.HeadCell>booked</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>location</Table.HeadCell>
          <Table.HeadCell>  
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
            {userData.created_trips.length<=0?<>You haven't created any trips</>:
                userData.created_trips.map((trip)=>{return <Table.Row key={trip._id} onClick={()=>{navigate(`/trips/${trip._id}`)}} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {trip.title}
                    </Table.Cell>
                    <Table.Cell>{trip.booked_by.length}/{trip.total_capacity}</Table.Cell>
                    <Table.Cell>Rs. {trip.price}</Table.Cell>
                    <Table.Cell>{trip.location}</Table.Cell>
                    <Table.Cell>
                    <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                        Edit
                    </a>
                    </Table.Cell>
                </Table.Row>})
                
            }
        </Table.Body>
      </Table>
    </div>
  );
}
