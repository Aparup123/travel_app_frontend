import { useContext, useEffect, useState } from 'react'
import { userContext } from '../contexts/userContext'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { enqueueSnackbar } from 'notistack'
import Button from '../components/Button'
function MyProfile() {
  const [loading, setLoading]=useState(false)
  const {userData, setUserData}= useContext(userContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!userData.username) {
      navigate('/login')
    }
    
  },[userData])

  function logout() {
    setLoading(true)
    axios.post(`${import.meta.env.VITE_SITE_URL}/api/users/logout`, null , { withCredentials: true })
      .then((res) => {
        console.log(res.data)
        var userClearObject = {name:"", username:"", email:"", booked_trips:[]}
        

        console.log(userClearObject)
        setUserData(userClearObject)
        enqueueSnackbar('Logged out.', {variant:'success'})
        navigate('/login')
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(()=>{
        setLoading(false)
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
        {/* <button className="btn btn-neutral btn-sm my-2 " onClick={logout}>Log out</button> */}
        <Button onClick={logout} loading={loading}>Logout</Button>
        </div>
      </div>

      {(userData.role=="user")&&
      <div className=''>
        <h2 className=''>Links</h2>
          <Link to="/my_trips" className='btn btn-outline btn-sm'>My trips</Link>
          {/* {userData.booked_trips.map((trip) => <div key={trip._id} onClick={()=>navigate(`/trips/${trip._id}`)}><Trip key={trip._id} trip={trip} /></div>)} */}
      </div>
      }
      </div>
    </div>
    </>
  )
}

export default MyProfile