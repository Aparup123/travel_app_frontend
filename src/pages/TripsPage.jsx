import { useContext,} from "react"
import Trip from "../components/Trip"
import { useNavigate } from "react-router-dom"
import { tripContext } from "../contexts/tripContext"
function TripsPage() {
    const navigate=useNavigate()
    const {trips}=useContext(tripContext)
    // const [trips, setTrips]= useState([])
    // useEffect(()=>{
    //     axios.get('http://localhost:3001/api/trips')
    //     .then((res)=>{
    //         console.log(res)
    //         setTrips(res.data)
    //     })
    //     .catch((err)=>{
    //         console.log(err)
    //     })
    // },[])

    function goToTrip(tripId){
        console.log('clicked')
        console.log(tripId)
        navigate(`/trips/${tripId}`)
    }
  return (
    <>
    <div className="md:grid lg:grid-cols-3 md:grid-cols-2">
        {trips.map((trip)=><div key={trip._id} onClick={()=>goToTrip(trip._id)}><Trip key={trip.id} trip={trip}/></div>)}
    </div>
    </>
  )
}

export default TripsPage