import {useState } from 'react'
import {useLoaderData} from 'react-router-dom'

function UserProfile() {
  
  const u=useLoaderData()
  const [user] = useState(u)

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