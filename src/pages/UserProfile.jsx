import {useState } from 'react'
import {useLoaderData} from 'react-router-dom'
import profilePlaceholder from '../assets/images/profilePlaceHolder.png'
function UserProfile() {
  
  const u=useLoaderData()
  const [user] = useState(u)

  return (

    <>
      <div className='flex flex-col items-center pt-2'>
        <div className='border rounded-md p-4 mt-2'>
          <div className='flex flex-col gap-2'>

            <div className="avatar flex justify-center text-center">
              <div className="w-24 text-center block rounded-full">
                <img src={user.profile_picture?user.profile_picture.url:profilePlaceholder} />
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