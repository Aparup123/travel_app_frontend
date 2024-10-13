/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { userContext } from "../contexts/userContext"
import { tripContext } from "../contexts/tripContext"
import { Dropdown } from "flowbite-react"
import { MdEdit, MdDelete } from "react-icons/md";
import { GoKebabHorizontal } from "react-icons/go"
import availableTickets from "../utils/availableTickets"
import tripImage from '../assets/images/tripImage.jpg'
import getFormattedDate from "../utils/getFormattedDate"
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
  console.log("trip",trip)
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
        console.log(res.data);
        // Update userData to include the newly booked trip
        setUserData(prevUserData => ({
            ...prevUserData,
            booked_trips: [...prevUserData.booked_trips, res.data]
        }));

        // Update the specific trip's booked_by list to include the current user
        setTrip(prevTrip => ({
            ...prevTrip,
            booked_by: [...prevTrip.booked_by, userData]
        }));

        // Update the trips context to include the updated trip
        setTrips(prevTrips => prevTrips.map(t => {
            if (t._id === tripId) {
                return {
                    ...t,
                    booked_by: [...t.booked_by, userData]
                };
            }
            return t;
        }));
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
        setTrip(
          (prevTrip)=>{return { ...prevTrip, booked_by: prevTrip.booked_by.filter((user) => {return user._id != userData._id} ) }})
        setTrips(trips.map((t) => {
          if (t._id == tripId) {
            t.booked_by = t.booked_by.filter((user) => user._id != userData._id)
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
    return (<div className="p-4">
      <div className="card card-side border-2">
        <figure>
          <img src={tripImage}/>
        </figure>
        <div className="card-body"> 
        <h1 className="card-title">{trip.title}</h1>
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
        <p> {trip.description}</p>
        <p>Duration: {trip.duration}</p>
        <p>Start date: {getFormattedDate(trip.start_date)}</p>
        <p>End date: {getFormattedDate(trip.end_date)}</p>
        <p>Location: {trip.location}</p>
        <p>Available tickets: {trip.available_tickets}</p>
        <p>Price: <span className="font-bold">Rs.{trip.price}</span></p>
        <p>Seller: <Link to={`/profile/${trip.seller?.username}`} className="link">{trip.seller.name}</Link></p>
        <div className="card-action">
        {trip?.booked_by.map((user)=>user._id).includes(userData._id) ? <button onClick={cancelTrip} className="link link-error">Cancel</button> : userData.role == "seller" ? <></> :availableTickets(trip)? <button onClick={bookTrip} className="btn btn-success text-white">Book</button>:<span>Full</span>}
        </div>
        </div>
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
    </div>)
  }
}

export default TripPage