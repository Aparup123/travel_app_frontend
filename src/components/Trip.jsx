/* eslint-disable react/prop-types */

import tripImage from '../assets/images/tripImage.jpg'
import getDuration from '../utils/getDuration'
import getFormattedDate from '../utils/getFormattedDate'

function Trip({trip}) {

  return (
    <>
       <div className="border m-3 rounded cursor-pointer">
            <img src={tripImage} className='rounded-t'/>
            <div className='p-3'>
            <h2 className='text-2xl'>{trip.title}</h2>
            <p>{trip.description.length>80?trip.description.substring(0,80)+" ...":trip.description}</p>
            <p><span className='font-bold'>Duration:</span> {getDuration(trip.start_date,trip.end_date)} days</p>
            <p><span className='font-bold'>Date:</span> {getFormattedDate(trip.start_date)} - {getFormattedDate(trip.end_date)} </p>
            <p><span className='font-bold'>Location:</span> {trip.location}</p>
            <p><span className='font-bold'>Available tickets:</span> {trip.total_capacity-trip.booked_by.length}</p>
            <p className='border-2 border-dashed inline-block px-2'>Rs. {trip.price}</p>
            </div>
        </div>
    </>
  )
}

export default Trip