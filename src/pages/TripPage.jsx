import { useContext,useState } from "react"
import {useLoaderData, useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { userContext } from "../contexts/userContext"
import { tripContext } from "../contexts/tripContext"

import { MdEdit, MdDelete } from "react-icons/md";
import { GoKebabHorizontal } from "react-icons/go"
import availableTickets from "../utils/getAvailableTickets"
import tripImage from '../assets/images/tripImage.jpg'
import getFormattedDate from "../utils/getFormattedDate"
import getAvailableTickets from "../utils/getAvailableTickets"
import getDuration from "../utils/getDuration"

function TripPage() {
  const { userData, setUserData } = useContext(userContext)
  const { trips, setTrips } = useContext(tripContext)
  const navigate = useNavigate()
  const tripId = useParams().id
  const t=useLoaderData()
  const [trip, setTrip] = useState(t)
  // type tripType={
  //   _id:"",
  //   title:"",
  //   description:"",
  //   start_date:"",
  //   end_date:"",
  //   total_capacity:0,
  //   booked_by:[],
  //   seller:""
  // }
  const [owner] = useState(t.seller._id==userData._id)
  

 
  // useEffect(() => {
  
  //     setLoading(true)
  //     const clickedTrip = trips.find(t=> t._id == tripId)
  //     setTrip(clickedTrip)
  //     console.log("trip",clickedTrip)
  //     setOwner(clickedTrip.seller._id==userData._id)
  //     setLoading(false)
    
  // }, [trips])


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

  function deleteTrip(){
    if(!confirm("Do You want to delete the trip?")) return
    axios.delete(`http://localhost:3001/api/trips/${trip._id}`,{withCredentials:true})
    .then((res)=>{
      console.log(res)
      setUserData((prevUserData)=>{
        prevUserData.created_trips=prevUserData.created_trips.filter((t)=>t._id!=trip._id)
        return prevUserData
      })
      setTrips((prevTrips)=>{
        return prevTrips.filter((t)=>t._id!=trip._id)
      })
      navigate('/seller_dashboard')
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  
    return (<div className="p-4">
      <div className="card lg:card-side border-2 ">
        <figure>
          <img src={tripImage}/>
        </figure>
        <div className="card-body"> 
        <h1 className="card-title">{trip.title}</h1>
        {owner && 
          <div className="dropdown dropdown-hover dropdown-bottom dropdown-end absolute top-2 right-2">
            <div tabIndex={0} role="button" className="btn btn-sm m-1"><GoKebabHorizontal /></div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              <li><button onClick={()=>navigate(`/edit/trips/${trip._id}`)}><i className="mr-1"><MdEdit /></i>Edit</button></li>
              <li><button onClick={deleteTrip}><i className="mr-1 text-red-500 inline-block"><MdDelete /></i><span className="inline-block text-red-500 underline">Delete</span></button></li>
            </ul>
          </div> }  
       
       
        <p> {trip.description}</p>
        <p>Duration: {getDuration(trip)} days</p>
        <p>Start date: {getFormattedDate(trip.start_date)}</p>
        <p>End date: {getFormattedDate(trip.end_date)}</p>
        <p>Location: {trip.location}</p>
        <p>Available tickets: {getAvailableTickets(trip)}</p>
        <p>Price: <span className="font-bold">Rs.{trip.price}</span></p>
        {/* <p>Seller: <Link to={`/profile/${trip.seller?.username}`} className="link">{trip.seller.name}</Link></p> */}
        <div className="card-action">
        {trip?.booked_by.map((user)=>user._id).includes(userData._id) ? <button onClick={cancelTrip} className="link link-error">Cancel</button> : userData.role == "seller" ? <></> :availableTickets(trip)? <button onClick={bookTrip} className="btn btn-success text-white">Book</button>:<span>Full</span>}
        </div>
        </div>
      </div>
      {owner ?
        <div className="border p-4 m-4">


          {trip.booked_by.length <= 0 ? <span className="text-red-400">Not yet booked</span> :
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


export default TripPage