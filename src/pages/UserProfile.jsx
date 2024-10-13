import { useContext, useEffect, useState } from 'react'
import { userContext } from '../contexts/userContext'
import { useNavigate, useParams, json, useLoaderData} from 'react-router-dom'
import axios from 'axios'
function UserProfile() {
  // const { userData } = useContext(userContext)
  // const userName = useParams().name
  // const navigate = useNavigate()
  const u=useLoaderData()
  const [user, setUser] = useState(u)
  // const [loading, setLoading] = useState(false)
  // useEffect(() => {

  //   // if (!userData.username) {
  //   //   navigate('/login')
  //   // }

  //   // if (userData.username == userName)
  //   //   navigate('/profile')

  //   setLoading(true)
  //   axios.get(`http://localhost:3001/api/users/profile/${userName}`)
  //     .then((res) => {
  //       console.log(res)
  //       setUser(res.data)
  //       setLoading(false)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       setLoading(false)
  //       // navigate('/error')
  //       throw new Error("not found")
  //       // throw json(
  //       //   {
  //       //     status:404,
  //       //     message:"No User Found"
  //       //   }
  //       // )
  //     })

  // }, [userData])

  // if(loading)
  //   return <>loading...</>

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
            <h2 className='text-xl text-center'>{user.name}</h2>
            <p><span className='font-bold'>Username: </span>{user.username}</p>
            <p><span className='font-bold'>email: </span>{user.email}</p>
          </div>


        </div>
      </div>
    </>
  )
}

export default UserProfile