/* eslint-disable react/prop-types */

import getAvailableTickets from '../utils/getAvailableTickets'
import getDuration from '../utils/getDuration'
import getFormattedDate from '../utils/getFormattedDate'
import tripImagePlaceholder from '../assets/images/tripImagePlaceholder.png'

function Trip({trip}) {

  return (
    <>
       <div className="cursor-pointer card glass m-3">
            <figure className='max-h-[15rem]'>
              <img src={trip.cover_image?.url||tripImagePlaceholder} className='rounded-t w-full h-auto object-cover'/>
            </figure>
            <div className='card-body'>
            <h2 className='card-title'>{trip.title}</h2>
            <p>{trip.description.length>50?trip.description.substring(0,50)+" ...":trip.description}</p>
            <p><span className='font-bold'>Duration:</span> {getDuration(trip)} days</p>
            <p><span className='font-bold'>Date:</span> {getFormattedDate(trip.start_date)} - {getFormattedDate(trip.end_date)} </p>
            <p><span className='font-bold'>Location:</span> {trip.location}</p>
            <p><span className='font-bold'>Available tickets:</span> {getAvailableTickets(trip)}</p>
            <div className='card-actions justify-end'>
             <button className='btn btn-sm btn-neutral'>Rs. {trip.price}</button>
             </div>
            </div>
        </div>
          
    </>
  )
}

export default Trip