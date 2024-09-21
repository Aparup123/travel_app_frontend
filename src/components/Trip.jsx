/* eslint-disable react/prop-types */
function Trip({trip}) {
  return (
    <>
       <div className="bg-zinc-300 m-3 p-3 rounded">
            <h3>{trip.name}</h3>
            <p>Description: {trip.description}</p>
            <p>Duration: {trip.duration}</p>
            <p>Date: {trip.start_date}-{trip.end_date}</p>
            <p>Locatin: {trip.location}</p>
            <p>Total capacity:{trip.total_capacity}, Total booked:{trip.total_booked}, Available tickets:{trip.available_tickets}</p>
            <p>Price:{trip.price}</p>
        </div>
    </>
  )
}

export default Trip