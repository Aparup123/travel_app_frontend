import { useContext,useState } from "react"
import {Link, useLoaderData, useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { userContext } from "../contexts/userContext"
import { tripContext } from "../contexts/tripContext"

import { MdEdit, MdDelete } from "react-icons/md";
import { GoKebabHorizontal } from "react-icons/go"
import availableTickets from "../utils/getAvailableTickets"
import tripImagePlaceholder from '../assets/images/tripImagePlaceholder.png'
import getFormattedDate from "../utils/getFormattedDate"
import getAvailableTickets from "../utils/getAvailableTickets"
import getDuration from "../utils/getDuration"
import { enqueueSnackbar } from "notistack"
import Button from "../components/Button"
import LoadingLink from "../components/LoadingLink"

function TripPage() {
  const [loading, setLoading]=useState(false)
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
    setLoading(true)
    axios.post(`${import.meta.env.VITE_SITE_URL}/api/trips/book/${trip._id}`, null, { withCredentials: true })
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

        enqueueSnackbar('Trip booked successfully', {variant:'success'})
      })
      .catch((err) => {
        console.log(err)
        enqueueSnackbar('Trip booking failed!', {variant:'error'})
      })
      .finally(()=>{
        setLoading(false)
      })
  }
  // console.log("trip.booked_by:", trip.booked_by)
  function cancelTrip() {
    if (!confirm('Do you want to cancel the trip?'))
      return
    setLoading(true)
    axios.delete(`${import.meta.env.VITE_SITE_URL}/api/users/trips/${trip._id}`, { withCredentials: true })
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
        enqueueSnackbar('Booking cancelled.',{variant:'success'})
      })
      .catch((err) => {
        console.log(err)
        enqueueSnackbar('Failed!',{variant:'error'})
      })
      .finally(()=>setLoading(false))
  }

  function deleteTrip(){
    if(!confirm("Do You want to delete the trip?")) return
    setLoading(true)
    axios.delete(`${import.meta.env.VITE_SITE_URL}/api/trips/${trip._id}`,{withCredentials:true})
    .then((res)=>{
      console.log(res)
      setUserData((prevUserData)=>{
        prevUserData.created_trips=prevUserData.created_trips.filter((t)=>t._id!=trip._id)
        return prevUserData
      })
      setTrips((prevTrips)=>{
        return prevTrips.filter((t)=>t._id!=trip._id)
      })
      enqueueSnackbar('Trip deleted.',{variant:'success'})
      navigate('/seller_dashboard')
    })
    .catch((err)=>{
      console.log(err)
      enqueueSnackbar('Trip deletion failed!',{variant:'error'})
    })
    .finally(()=>{
      setLoading(false)
    })
  }

  
    return (<div className="p-4">
      <div className="card md:card-side border-2 md:max-h-[30rem] lg">
        <figure className="md:w-2/5 h-auto">
          <img src={trip.cover_image?.url||tripImagePlaceholder} className="w-full h-auto object-cover"/>
        </figure>
        <div className="card-body"> 
        <h1 className="card-title">{trip.title}</h1>
        {owner && 
          <div className="dropdown dropdown-hover dropdown-bottom dropdown-end absolute top-2 right-2">
            <div tabIndex={0} role="button" className="btn btn-sm m-1"><GoKebabHorizontal /></div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              <li><Link to={`/edit/trips/${trip._id}`}><i className="mr-1"><MdEdit /></i>Edit</Link></li>
              <li><LoadingLink loading={loading} onClick={deleteTrip}><i className="mr-1 text-red-500 inline-block"><MdDelete /></i><span className="inline-block text-red-500 underline">Delete</span></LoadingLink></li>
            </ul>
          </div> }  
          {/* onClick={()=>navigate(`/edit/trips/${trip._id}`)} */}
       
        <p> {trip.description}</p>
        <p>Duration: {getDuration(trip)} days</p>
        <p>Start date: {getFormattedDate(trip.start_date)}</p>
        <p>End date: {getFormattedDate(trip.end_date)}</p>
        <p>Location: {trip.location}</p>
        <p>Available tickets: {getAvailableTickets(trip)}</p>
        <p>Price: <span className="font-bold">Rs.{trip.price}</span></p>
        {/* <p>Seller: <Link to={`/profile/${trip.seller?.username}`} className="link">{trip.seller.name}</Link></p> */}
        <div className="card-action">
        {trip?.booked_by.map((user)=>user._id).includes(userData._id) ? <LoadingLink onClick={cancelTrip} loading={loading} className="link-error">Cancel</LoadingLink> : userData.role == "seller" ? <></> :availableTickets(trip)? <Button onClick={bookTrip} className="btn btn-success text-white" loading={loading}>Book</Button>:<span>Full</span>}
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
                  return <p key={user._id}>{index + 1}. <Link to={`/profile/${user.username}`} className="font-bold link link-primary">{user.username}</Link> {user.email}</p>
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