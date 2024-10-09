/* eslint-disable react/prop-types */

import tripImage from '../assets/images/tripImage.jpg'

function Trip({trip}) {
  function formatDate(isoDate){
    let date=new Date(isoDate)
    let res=date.getDate()+" "+date.toLocaleString('default', { month: 'long' })+", "+date.getFullYear()
    return res
  }

  function getDuration(start_date, end_date){
    return ((new Date(end_date)- new Date(start_date))/(24*3600*1000))
  }
  return (
    <>
       <div className="border m-3 rounded cursor-pointer">
            <img src={tripImage} className='rounded-t'/>
            <div className='p-3'>
            <h2 className='text-2xl'>{trip.title}</h2>
            <p>{trip.description.length>80?trip.description.substring(0,80)+" ...":trip.description}</p>
            <p><span className='font-bold'>Duration:</span> {getDuration(trip.start_date,trip.end_date)} days</p>
            <p><span className='font-bold'>Date:</span> {formatDate(trip.start_date)} - {formatDate(trip.end_date)} </p>
            <p><span className='font-bold'>Location:</span> {trip.location}</p>
            <p><span className='font-bold'>Available tickets:</span> {trip.total_capacity-trip.booked_by.length}</p>
            <p className='border-2 border-dashed inline-block px-2'>Rs. {trip.price}</p>
            </div>
        </div>
    </>
  )
}

export default Trip