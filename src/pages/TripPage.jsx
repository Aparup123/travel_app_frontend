/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { userContext } from "../contexts/userContext"
import { tripContext } from "../contexts/tripContext"
import { Dropdown } from "flowbite-react"
import { MdEdit, MdDelete } from "react-icons/md";
import { GoKebabHorizontal } from "react-icons/go"
import availableTickets from "../utils/availableTickets"
function TripPage() {
  const { userData, setUserData } = useContext(userContext)
  const { trips, setTrips } = useContext(tripContext)
  const navigate = useNavigate()
  const tripId = useParams().id
  // const trip=trips.filter((trip)=>trip._id==tripId)
  const [trip, setTrip] = useState(null)
  const [owner, setOwner] = useState(false)
  const [loading, setLoading] = useState(true)
  // useEffect(()=>{
  //   axios.get(`http://localhost:3001/api/trips/${tripId}`)
  //   .then((tripData)=>{
  //     setTrip(tripData.data)
  //   })
  //   .catch((err)=>{
  //     console.log(err)
  //     navigate('/trips')
  //   })

  // },[])

  useEffect(() => {
    if (trips.length == 0)
      setLoading(true)
    else {
      setLoading(true)
      const clickedTrip = trips.filter((trip) => trip._id == tripId)[0]
      console.log("clicked trip:", clickedTrip)
      setTrip(clickedTrip)
      console.log(trips)

      if (userData.created_trips.map(t => t._id).includes(clickedTrip._id)) setOwner(true)
      setLoading(false)
    }
  }, [trips])


  function bookTrip() {
    if (!userData.username) return navigate('/login')
    if (trip.booked_by.includes(userData._id)) return alert('Already booked!')
    const confirmedBooking = confirm("Book Trip?")
    if (!confirmedBooking) {
      return
    }
    axios.post(`http://localhost:3001/api/trips/book/${trip._id}`, null, { withCredentials: true })
      .then((res) => {
        console.log(res.data)
        setUserData({ ...userData, booked_trips: userData.booked_trips.concat(res.data) })
        setTrip({ ...trip, booked_by: trip.booked_by.concat(userData._id) })
        setTrips(trips.map((t) => {
          if (t._id == tripId) {
            t.booked_by = t.booked_by.concat(userData._id)
          }
          return t
        }))

      })
      .catch((err) => {
        console.log(err)
      })
  }
  // console.log("trip.booked_by:", trip.booked_by)
  function cancelTrip() {
    if (!confirm('Do you want to cancel the trip?'))
      return
    axios.delete(`http://localhost:3001/api/users/trips/${trip._id}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data)
        setUserData({ ...userData, booked_trips: userData.booked_trips.filter((t) => t._id != res.data._id) })
        setTrip({ ...trip, booked_by: trip.booked_by.filter((id) => id != userData._id) })
        setTrips(trips.map((t) => {
          if (t._id == tripId) {
            t.booked_by = t.booked_by.filter((id) => id != userData._id)
          }
          return t
        }))
      })
      .catch((err) => {
        console.log(err)
      })
  }
  console.log(trip)
  if (loading) {
    return "loading..."
  } else {
    return (<>
      <div className="border m-3 p-3 rounded relative">
        <h3>{trip.title}</h3>
        {owner && <div className="absolute top-2 right-2">
          <Dropdown size="" label="" inline renderTrigger={() => <button className="border-gray-500 border-2 rounded px-2"><GoKebabHorizontal /></button>}>
            <Dropdown.Item>
              <icon className="mr-1"><MdEdit /></icon>Edit
            </Dropdown.Item>
            <Dropdown.Item>
              <icon className="mr-1 text-red-500"><MdDelete /></icon><span className="text-red-500 underline">Delete</span>
            </Dropdown.Item>
          </Dropdown>
        </div>}
        <p>Description: {trip.description}</p>
        <p>Duration: {trip.duration}</p>
        <p>Date: {trip.start_date}-{trip.end_date}</p>
        <p>Location: {trip.location}</p>
        <p>Total capacity:{trip.total_capacity}, Total booked:{trip.total_booked}, Available tickets:{trip.available_tickets}</p>
        <p>Price:{trip.price}</p>
        {

        }
        {trip?.booked_by.includes(userData._id) ? <button onClick={cancelTrip} className="border px-2">cancel</button> : userData.role == "seller" ? <></> :availableTickets(trip)? <button onClick={bookTrip} className="border px-2">Book</button>:<span>Full</span>}

      </div>
      {owner ?
        <div className="border p-4 m-4">


          {trip.booked_by.length <= 0 ? <spam className="text-red-400">Not yet booked</spam> :
            <>
              <h1>Booked by</h1>
              <div>
                {trip.booked_by.map((user, index) => {
                  return <p key={user._id}>{index + 1}. <span className="font-bold">{user.username}</span> {user.email}</p>
                })
                }
              </div>
            </>
          }
        </div> :
        <></>
      }
    </>)
  }
}

export default TripPage