export default function getAvailableTickets(trip){
    return trip.total_capacity-trip.booked_by.length
}