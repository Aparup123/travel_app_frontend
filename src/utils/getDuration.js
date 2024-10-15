export default function getDuration(trip){
    return ((new Date(trip.end_date)-new Date(trip.start_date))/(24*3600*1000))+1
}