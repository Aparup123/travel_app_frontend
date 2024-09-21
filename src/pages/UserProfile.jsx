import { useContext, useEffect } from 'react'
import { userContext } from '../contexts/userContext'
import { useNavigate } from 'react-router-dom'
import Trip from '../components/Trip'
import axios from 'axios'
function UserProfile() {
  const {userData, setUserData}= useContext(userContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!userData.username) {
      navigate('/login')
    }
    
  },[userData])

  function logout() {
    axios.post('http://localhost:3001/api/users/logout', null , { withCredentials: true })
      .then((res) => {
        console.log(res.data)
        var userClearObject = {name:"", username:"", email:"", booked_trips:[]}
        

        console.log(userClearObject)
        setUserData(userClearObject)
        navigate('/login')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <>
      <div className='p-2'>
        <h1>User Profile</h1>
        <h2>Welcome {userData.name}</h2>
        <div>Username:{userData.username}</div>
        <div>email:{userData.email}</div>
        <button className="border-2 px-0.5 border-zinc-900 rounded bg-zinc-300" onClick={logout}>Log out</button>
      </div>

      <div>
        <h2 className='pl-3 text-3xl'>Booked Trips</h2>
        {userData.booked_trips.map((trip) => <div key={trip._id} onClick={()=>navigate(`/trips/${trip._id}`)}><Trip key={trip._id} trip={trip} /></div>)}
      </div>
    </>
  )
}

export default UserProfile