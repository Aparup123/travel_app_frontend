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
    <div className='flex flex-col items-center'>
    <div className='border p-4 mt-2'>
      <div className=''>
        
        <div className="avatar flex justify-center text-center">
          <div className="w-24 text-center block rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <h2 className='text-xl text-center'>{userData.name}</h2>
        <p><span className='font-bold'>Username:</span>{userData.username}</p>
        <p><span className='font-bold'>email:</span>{userData.email}</p>
        <div className='text-center'>
        <button className="btn btn-neutral btn-sm my-2 " onClick={logout}>Log out</button>
        </div>
      </div>

      {!userData.role=="seller"&&
      <div className=''>
        <h2 className='pl-3 text-3xl'>Booked Trips</h2>
        {userData.booked_trips.map((trip) => <div key={trip._id} onClick={()=>navigate(`/trips/${trip._id}`)}><Trip key={trip._id} trip={trip} /></div>)}
      </div>
      }
      </div>
    </div>
    </>
  )
}

export default UserProfile