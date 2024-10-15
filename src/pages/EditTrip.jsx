import { useState, useContext, useEffect } from "react"
import { userContext } from "../contexts/userContext"
import { useLoaderData, useNavigate } from "react-router-dom"
import { Label, FileInput, } from "flowbite-react"

import axios from "axios"
import { tripContext } from "../contexts/tripContext"
import getCurrentDate from "../utils/getCurrentDate"
import getDashedDate from "../utils/getDashedDate"
import getBookedTicketNumber from "../utils/getBookedTicketNumber"



export default function EditTrip() {
  const [tripImage, setTripImage]=useState()
  const t=useLoaderData()
  console.log(t)
  const [trip, setTrip] = useState(t)
  const { userData, setUserData } = useContext(userContext)
  const {setTrips } = useContext(tripContext)
  const navigate = useNavigate()
  console.log(tripImage)
  useEffect(() => {
    if (userData.role == 'user') {
      navigate('/profile')
    }
  })
  console.log(trip)

  function editTrip(e){
    e.preventDefault()
    console.log(trip)
    axios.put(`http://localhost:3001/api/trips/${trip._id}`, trip, {withCredentials:true})
    .then((res)=>{
      console.log(res)
      setUserData({...userData, created_trips:userData.created_trips.filter((t)=>t._id!=trip._id).concat(res.data)})
      setTrips((prevTrips)=>{
        return prevTrips.filter((t)=>t._id!=trip._id).concat(res.data)
        })
      navigate(`/trips/${trip._id}`)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return (
    <div className="flex justify-center">
      <div className="border p-4 mt-5 inline-block mb-6">
        <h1 className="text-2xl mb-2">Edit trip</h1>
        <form className="md:grid grid-cols-2 gap-y-3" onSubmit={editTrip}>
          <label htmlFor="trip_title" className="block">Trip Title</label>
          <input type="text" id="trip_title" value={trip.title} onChange={(e)=>{setTrip({...trip, title:e.target.value})}} />
          <label htmlFor="location" className="block">location</label>
          <input id="location" type="text" value={trip.location} onChange={(e)=>{setTrip({...trip, location:e.target.value})}}/>
          <label htmlFor="description" className="block">Trip description</label>
          <textarea id="description" value={trip.description} onChange={(e)=>{setTrip({...trip, description:e.target.value})}}></textarea>
          <label htmlFor="start_date" className="block">Start date</label>
          <input id="start_date" value={getDashedDate(trip.start_date)} type="date" min={getCurrentDate()} onChange={(e)=>{setTrip({...trip, start_date:e.target.value})}}/>
          <label htmlFor="end_date" className="block">End date</label>
          <input id="end_date" type="date" value={getDashedDate(trip.end_date)} disabled={trip.start_date?false:true} min={trip.start_date} onChange={(e)=>{setTrip({...trip, end_date:e.target.value})}}/>
          <label htmlFor="capacity" className="block">Total capacity</label>
          <input id="capacity" type="number" min={getBookedTicketNumber(trip)} value={trip.total_capacity} onChange={(e)=>{setTrip({...trip, total_capacity:e.target.value})}}/>
          <label htmlFor="price" className="block">Ticket price</label>
          <input id="price" type="number" value={trip.price} onChange={(e)=>{setTrip({...trip, price:e.target.value})}}/>
          <label htmlFor="uploadImage" className="block">Upload trip cover image</label>
          <div id="uploadImage" className="flex w-full items-center justify-center">
            <Label
                htmlFor="dropzone-file"
                className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                {!tripImage?<div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <svg
                    className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">upload trip cover image</p>
                </div>:<img src={URL.createObjectURL(tripImage)} className="h-[5rem] w-auto"/>}
                <FileInput id="dropzone-file" className="hidden" onChange={(e)=>{setTripImage(e.target.files[0])}}/>
            </Label>  
          </div>
          <div></div>
          <button type="submit" className="btn btn-outline ">Update</button>
        </form>
      </div>
    </div>
  )
}
