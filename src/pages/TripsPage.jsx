import { useContext, useEffect, useState } from "react";
import Trip from "../components/Trip";
import { useNavigate } from "react-router-dom";
import { tripContext } from "../contexts/tripContext";
import { CiSearch } from "react-icons/ci";
import { TextInput } from "flowbite-react";

function TripsPage() {
  const navigate = useNavigate();
  // const [searchTerm, setSearchTerm]=useState("")
  const { trips } = useContext(tripContext);
  const [displayTrips, setDisplayTrips]=useState(trips)

  useEffect(()=>{
    setDisplayTrips(trips)
  },[trips])
  // const [trips, setTrips]= useState([])
  // useEffect(()=>{
  //     axios.get(`${import.meta.env.VITE_SITE_URL}/api/trips`)
  //     .then((res)=>{
  //         console.log(res)
  //         setTrips(res.data)
  //     })
  //     .catch((err)=>{
  //         console.log(err)
  //     })
  // },[])
  console.log('displayTrips:', displayTrips)
  function search(e){
    const searchTerm=e.target.value
    if(searchTerm=="") return setDisplayTrips(trips)
    setDisplayTrips(trips.filter((trip)=>trip.title.toLowerCase().trim().includes(searchTerm.toLowerCase().trim( ))))
  }
  function goToTrip(tripId) {
    console.log("clicked");
    console.log(tripId);
    navigate(`/trips/${tripId}`);
  }
  return (
    <>
      <div className="p-2 top-[3rem] z-10">
        <span className="sm:block md:inline-block"><TextInput placeholder="Search" icon={CiSearch} onChange={search}></TextInput></span>
      </div>
      <div className="md:grid lg:grid-cols-4 md:grid-cols-3">
        {displayTrips.map((trip) => (
          <div key={trip._id} onClick={() => goToTrip(trip._id)}>
            <Trip key={trip.id} trip={trip} />
          </div>
        ))}
      </div>
    </>
  );
}

export default TripsPage;
